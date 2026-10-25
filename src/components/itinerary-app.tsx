import { useEffect, useMemo, useState } from "react";
import {
  BedDouble,
  CalendarRange,
  Car,
  Check,
  Coffee,
  Flower2,
  Footprints,
  Landmark,
  MapPinned,
  Moon,
  Navigation,
  Plane,
  ShoppingBasket,
  Store,
  Users,
  UtensilsCrossed,
  Waves,
} from "lucide-react";
import {
  TRIP,
  TIPS,
  allStops,
  days,
  dirUrl,
  formatDistance,
  kmBetween,
  type Day,
  type Kind,
  type Stop,
} from "../data/itinerary";
import { TripMap, type MapLeg, type MapPin } from "./trip-map";

const ICONS: Record<Kind, typeof Plane> = {
  flight: Plane,
  food: UtensilsCrossed,
  cafe: Coffee,
  wander: Store,
  stay: BedDouble,
  sight: Landmark,
  spa: Flower2,
  river: Waves,
  market: ShoppingBasket,
  night: Moon,
};

const STORAGE_KEY = "chiangmai-5-checks";

type Focus = "route" | "pin";

type Row = {
  stop: Stop;
  day: Day;
  index: number;
  distance: number | null;
};

function rowsFor(day: Day): Row[] {
  let prev: { lat: number; lng: number } | null = null;
  return day.stops.map((stop, index) => {
    const first = stop.pins[0];
    const distance =
      prev && first ? kmBetween(prev, first) : null;
    const last = stop.pins[stop.pins.length - 1];
    if (last) prev = last;
    return { stop, day, index, distance };
  });
}

export function ItineraryApp() {
  const [dayId, setDayId] = useState("d1");
  const [selectedId, setSelectedId] = useState("d1-1");
  const [focus, setFocus] = useState<Focus>("route");
  const [done, setDone] = useState<Record<string, boolean>>({});
  const [hydrated, setHydrated] = useState(false);
  const [tipsOpen, setTipsOpen] = useState(false);
  const [fitTick, setFitTick] = useState(0);
  const [mapOn, setMapOn] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Record<string, boolean>;
        if (parsed && typeof parsed === "object") setDone(parsed);
      }
    } catch {
      /* ignore broken local data */
    }
    setHydrated(true);
    setMapOn(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(done));
  }, [done, hydrated]);

  const activeDays = useMemo(
    () => (dayId === "all" ? days : days.filter((day) => day.id === dayId)),
    [dayId],
  );

  const rows = useMemo(
    () => activeDays.flatMap((day) => rowsFor(day)),
    [activeDays],
  );

  const mapModel = useMemo(() => {
    const pins: MapPin[] = [];
    const legs: MapLeg[] = [];
    const seen = new Map<string, number>();

    const place = (lat: number, lng: number) => {
      const key = `${lat.toFixed(4)},${lng.toFixed(4)}`;
      const n = seen.get(key) ?? 0;
      seen.set(key, n + 1);
      const angle = n * 1.4;
      return {
        lat: lat + Math.sin(angle) * 0.00028 * n,
        lng: lng + Math.cos(angle) * 0.00028 * n,
      };
    };

    for (const day of activeDays) {
      const ordered: { lat: number; lng: number; walkInto: boolean }[] = [];
      day.stops.forEach((stop, index) => {
        stop.pins.forEach((pin, pinIndex) => {
          const at = place(pin.lat, pin.lng);
          const walkInto = pinIndex > 0 || stop.transport.startsWith("å¾æ­¥");
          ordered.push({ ...at, walkInto });
          pins.push({
            stopId: stop.id,
            lat: at.lat,
            lng: at.lng,
            label: String(index + 1),
            title: pin.name,
            time: stop.time,
            colorToken: day.colorToken,
          });
        });
      });
      for (let i = 1; i < ordered.length; i++) {
        const prev = ordered[i - 1];
        const next = ordered[i];
        if (!prev || !next) continue;
        legs.push({
          colorToken: day.colorToken,
          walk: next.walkInto,
          positions: [
            [prev.lat, prev.lng],
            [next.lat, next.lng],
          ],
        });
      }
    }

    return { pins, legs };
  }, [activeDays]);

  const total = allStops().length;
  const finished = allStops().filter((stop) => done[stop.id]).length;
  const dayKm = rows.reduce((sum, row) => sum + (row.distance ?? 0), 0);

  function pickDay(id: string) {
    setDayId(id);
    setFocus("route");
    const first =
      id === "all" ? days[0]?.stops[0]?.id : days.find((day) => day.id === id)?.stops[0]?.id;
    if (first) setSelectedId(first);
  }

  function selectFromMap(id: string) {
    setSelectedId(id);
    setFocus("pin");
    if (dayId !== "all") {
      const owner = days.find((day) => day.stops.some((stop) => stop.id === id));
      if (owner && owner.id !== dayId) setDayId(owner.id);
    }
    window.setTimeout(() => {
      document.getElementById(`stop-${id}`)?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }, 40);
  }

  function selectFromList(id: string) {
    setSelectedId(id);
    setFocus("pin");
  }

  function toggleDone(id: string) {
    setDone((current) => ({ ...current, [id]: !current[id] }));
  }

  const heading =
    dayId === "all"
      ? "äºæ¥ç¸½è¦½"
      : activeDays[0]
        ? `${activeDays[0].dateLabel} ${activeDays[0].weekday}`
        : "";

  const subhead = dayId === "all" ? "äºå¤©è·¯ç·çå¨åä¸å¼µåä¸" : activeDays[0]?.title;

  return (
    <main className="board">
      <header className="board-head px-4 pt-5 pb-3 lg:px-8">
        <p className="font-serif text-sm tracking-wide text-teak">æ¸é Â· 5 æ¥ 4 å¤</p>
        <div className="mt-1 flex items-end justify-between gap-3">
          <h1 className="font-serif text-3xl leading-none text-ink">{TRIP.name}</h1>
          <p className="text-right text-sm leading-5 text-muted">
            {finished}/{total} å®æ
          </p>
        </div>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-line">
          <div
            className="h-full rounded-full bg-fern transition-[width] duration-300"
            style={{ width: `${total === 0 ? 0 : (finished / total) * 100}%` }}
          />
        </div>
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted">
          <span className="inline-flex items-center gap-1.5">
            <CalendarRange className="size-4 text-teak" aria-hidden="true" />
            {TRIP.range}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Users className="size-4 text-teak" aria-hidden="true" />
            {TRIP.party}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <BedDouble className="size-4 text-teak" aria-hidden="true" />
            {TRIP.stay}
          </span>
        </div>
      </header>

      <nav className="board-days" aria-label="é¸ææ¥å­">
        <div className="day-scroll">
          <button
            type="button"
            className={dayId === "all" ? "day-chip is-on" : "day-chip"}
            onClick={() => pickDay("all")}
          >
            <span className="day-chip-date">å¨å</span>
            <span className="day-chip-short">ç¸½è¦½</span>
          </button>
          {days.map((day) => {
            const count = day.stops.filter((stop) => done[stop.id]).length;
            return (
              <button
                key={day.id}
                type="button"
                className={dayId === day.id ? "day-chip is-on" : "day-chip"}
                onClick={() => pickDay(day.id)}
                style={
                  dayId === day.id
                    ? undefined
                    : { boxShadow: `inset 0 -3px 0 var(${day.colorToken})` }
                }
              >
                <span className="day-chip-date">{day.dateLabel}</span>
                <span className="day-chip-short">
                  {day.short}
                  <span className="day-chip-count">
                    {count}/{day.stops.length}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </nav>

      <section className="board-map" aria-label="è¡ç¨å°å">
        <div className="map-frame">
          {mapOn ? (
            <TripMap
              pins={mapModel.pins}
              legs={mapModel.legs}
              selectedId={selectedId}
              focus={focus}
              fitTick={fitTick}
              onSelect={selectFromMap}
            />
          ) : (
            <div className="grid h-full place-items-center text-sm text-muted">å°åæºåä¸­</div>
          )}
          <div className="map-tools">
            <button
            type="button"
            className="map-tool"
            onClick={() => {
              setFocus("route");
              setFitTick((tick) => tick + 1);
            }}
          >
              <MapPinned className="size-4" aria-hidden="true" />
              çå®æ´è·¯ç·
            </button>
          </div>
        </div>
        <p className="mt-2 px-1 text-xs leading-5 text-muted">
          å¯¦ç·æ¯ä¹è»ï¼èç·æ¯å¾æ­¥ãé»å°åä¸çæ¸å­ï¼æé»ä¸é¢çè¡ç¨ï¼å©éæå°ä¸ã
          ä½å®¿èé¨åå¸éæ¯å¤§ç´ä½ç½®ã
        </p>
      </section>

      <section className="board-list" aria-label="è¡ç¨åè¡¨">
        <div className="mb-3 flex items-end justify-between gap-3 px-1">
          <div>
            <h2 className="font-serif text-2xl text-ink">{heading}</h2>
            <p className="mt-1 text-sm text-muted">{subhead}</p>
          </div>
          {dayKm > 0.4 ? (
            <p className="shrink-0 text-right text-sm text-muted">
              ç«èç«ç´
              <span className="mt-0.5 block font-serif text-lg text-ink">
                {formatDistance(dayKm)}
              </span>
            </p>
          ) : null}
        </div>

        <div className="mb-4">
          <button
            type="button"
            className="tip-toggle"
            aria-expanded={tipsOpen}
            onClick={() => setTipsOpen((open) => !open)}
          >
            è¡åæé
            <span className="text-muted">{TIPS.length} å</span>
          </button>
          {tipsOpen ? (
            <ul className="mt-2 grid gap-2">
              {TIPS.map((tip) => (
                <li key={tip.title} className="rounded-2xl bg-blush px-4 py-3">
                  <p className="font-medium text-ink">{tip.title}</p>
                  <p className="mt-1 text-sm leading-6 text-muted">{tip.body}</p>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <ol className="grid gap-3">
          {rows.map((row, rowIndex) => {
            const showDay =
              dayId === "all" &&
              (rowIndex === 0 || rows[rowIndex - 1]?.day.id !== row.day.id);
            return (
              <li key={row.stop.id}>
                {showDay ? (
                  <p className="mb-2 mt-2 px-1 font-serif text-lg text-ink">
                    {row.day.dateLabel} {row.day.weekday}
                    <span className="ml-2 text-sm font-sans text-muted">{row.day.short}</span>
                  </p>
                ) : null}
                <StopCard
                  row={row}
                  selected={selectedId === row.stop.id}
                  checked={Boolean(done[row.stop.id])}
                  onSelect={() => selectFromList(row.stop.id)}
                  onToggle={() => toggleDone(row.stop.id)}
                />
              </li>
            );
          })}
        </ol>

        <p className="mt-8 px-1 pb-10 text-xs leading-5 text-muted">
          ä¾ä½ çè¡ç¨è¡¨æ´çãå°èªæç¨å°é»åç¨±é Google å°åï¼æ¯å®ä¸åº§æ¨æºãå¾é¸åªå­å¨éå°è£ç½®ã
        </p>
      </section>
    </main>
  );
}

function StopCard({
  row,
  selected,
  checked,
  onSelect,
  onToggle,
}: {
  row: Row;
  selected: boolean;
  checked: boolean;
  onSelect: () => void;
  onToggle: () => void;
}) {
  const { stop, index, distance } = row;
  const Icon = ICONS[stop.kind];
  const walking = stop.transport.startsWith("å¾æ­¥");
  const MoveIcon = walking ? Footprints : stop.transport === "èªç­" ? Plane : Car;
  const approx = stop.pins.some((pin) => pin.approx);
  const offMap = stop.pins.length === 0;

  return (
    <article id={`stop-${stop.id}`} className={selected ? "stop is-on" : "stop"}>
      <div className="flex gap-3">
        <button
          type="button"
          className={checked ? "check is-on" : "check"}
          aria-pressed={checked}
          aria-label={checked ? `åæ¶å®æ ${stop.title}` : `æ¨è¨å®æ ${stop.title}`}
          onClick={onToggle}
        >
          {checked ? <Check className="size-4" aria-hidden="true" /> : index + 1}
        </button>
        <button type="button" className="min-w-0 flex-1 text-left" onClick={onSelect}>
          <div className="flex items-baseline justify-between gap-3">
            <p className="font-serif text-lg text-teak">{stop.time}</p>
            <Icon className="size-4 shrink-0 text-muted" aria-hidden="true" />
          </div>
          <h3 className={checked ? "mt-0.5 text-base text-muted line-through" : "mt-0.5 text-base font-medium text-ink"}>
            {stop.title}
          </h3>
          <p className="mt-0.5 text-sm text-muted">{stop.place}</p>
        </button>
      </div>
      <p className="mt-3 text-sm leading-6 text-ink">{stop.note}</p>
      {distance != null && distance > 0.08 ? (
        <p className="mt-2 text-xs text-muted">è·ä¸ä¸ç«ç´ {formatDistance(distance)}</p>
      ) : null}
      {approx ? (
        <p className="mt-1 text-xs text-teak">å°åæ¯å¤§ç´ä½ç½®ï¼å°èªè«ä»¥åºåçºæºã</p>
      ) : null}
      {offMap ? <p className="mt-1 text-xs text-teak">ç®çå°å¨é¦æ¸¯ï¼æ¸éå°åä¸ä¸æ¨éç«ã</p> : null}
      {stop.pins.length > 1 ? (
        <div className="mt-3 flex flex-wrap gap-2">
          {stop.pins.map((pin) => (
            <a
              key={pin.name}
              className="pin-link"
              href={dirUrl(pin.query, stop.transport)}
              target="_blank"
              rel="noreferrer"
            >
              {pin.name}
            </a>
          ))}
        </div>
      ) : null}
      <div className="mt-3 flex items-center justify-between gap-3">
        <p className="inline-flex items-center gap-1.5 text-sm text-muted">
          <MoveIcon className="size-4" aria-hidden="true" />
          {stop.transport}
        </p>
        <a
          className="nav-link"
          href={dirUrl(stop.query, stop.transport)}
          target="_blank"
          rel="noreferrer"
        >
          <Navigation className="size-4" aria-hidden="true" />
          å°èª
        </a>
      </div>
    </article>
  );
}
