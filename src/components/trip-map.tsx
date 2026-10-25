import { useEffect, useRef, useState } from "react";
import type { LayerGroup, Map as LeafletMap } from "leaflet";
import "leaflet/dist/leaflet.css";

export type MapPin = {
  stopId: string;
  lat: number;
  lng: number;
  label: string;
  title: string;
  time: string;
  colorToken: string;
};

export type MapLeg = {
  colorToken: string;
  walk: boolean;
  positions: [number, number][];
};

type Props = {
  pins: MapPin[];
  legs: MapLeg[];
  selectedId: string | null;
  focus: "route" | "pin";
  fitTick: number;
  onSelect: (id: string) => void;
};

type LeafletNs = typeof import("leaflet");

function asLeaflet(mod: LeafletNs & { default?: LeafletNs }): LeafletNs {
  if (typeof mod.map === "function") return mod;
  if (mod.default && typeof mod.default.map === "function") return mod.default;
  return mod;
}

function token(name: string, fallback: string): string {
  if (typeof document === "undefined") return fallback;
  const value = getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
  return value || fallback;
}

export function TripMap({ pins, legs, selectedId, focus, fitTick, onSelect }: Props) {
  const host = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const layerRef = useRef<LayerGroup | null>(null);
  const onSelectRef = useRef(onSelect);
  onSelectRef.current = onSelect;
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let dead = false;
    const node = host.current;
    if (!node) return;

    void import("leaflet").then((mod) => {
      if (dead || mapRef.current) return;
      const leaflet = asLeaflet(mod);
      const map = leaflet.map(node, {
        zoomControl: false,
        attributionControl: true,
        scrollWheelZoom: true,
      });
      map.setView([18.788, 98.987], 13);
      leaflet
        .tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: "&copy; OpenStreetMap",
          maxZoom: 19,
        })
        .addTo(map);
      leaflet.control.zoom({ position: "bottomright" }).addTo(map);
      map.attributionControl.setPrefix("");
      mapRef.current = map;
      setReady(true);
      requestAnimationFrame(() => map.invalidateSize());
    });

    const observer = new ResizeObserver(() => {
      mapRef.current?.invalidateSize();
    });
    observer.observe(node);

    return () => {
      dead = true;
      observer.disconnect();
      layerRef.current = null;
      mapRef.current?.remove();
      mapRef.current = null;
      setReady(false);
    };
  }, []);

  useEffect(() => {
    if (!ready) return;
    const map = mapRef.current;
    if (!map) return;

    let cancelled = false;
    void import("leaflet").then((mod) => {
      if (cancelled || mapRef.current !== map) return;
      const leaflet = asLeaflet(mod);
      layerRef.current?.remove();
      const group = leaflet.layerGroup().addTo(map);
      layerRef.current = group;

      const ink = token("--color-ink", "#241910");
      const card = token("--color-card", "#fffaf3");

      for (const leg of legs) {
        if (leg.positions.length < 2) continue;
        leaflet
          .polyline(leg.positions, {
            color: token(leg.colorToken, ink),
            weight: 4,
            opacity: 0.88,
            dashArray: leg.walk ? "2 10" : undefined,
            lineCap: "round",
            lineJoin: "round",
          })
          .addTo(group);
      }

      pins.forEach((pin, index) => {
        const selected = pin.stopId === selectedId;
        const color = token(pin.colorToken, ink);
        const icon = leaflet.divIcon({
          className: "pin-wrap",
          iconSize: [44, 44],
          iconAnchor: [22, 22],
          html: `<span class="pin-hit"><span class="pin${selected ? " is-on" : ""}" style="background:${color};color:${card}">${pin.label}</span></span>`,
        });
        const marker = leaflet.marker([pin.lat, pin.lng], {
          icon,
          zIndexOffset: selected ? 800 : index,
          keyboard: true,
          title: `${pin.time} ${pin.title}`,
        });
        marker.bindTooltip(`${pin.time} ${pin.title}`, {
          direction: "top",
          offset: [0, -16],
          className: "pin-tip",
          opacity: 1,
        });
        marker.on("click", () => onSelectRef.current(pin.stopId));
        marker.addTo(group);
      });

      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const selectedPins = pins.filter((pin) => pin.stopId === selectedId);

      const frame = {
        animate: !reduce,
        maxZoom: 15,
        paddingTopLeft: [24, 52] as [number, number],
        paddingBottomRight: [24, 32] as [number, number],
      };
      if (focus === "pin" && selectedPins.length === 1) {
        const target = selectedPins[0];
        if (!target) return;
        if (reduce) map.setView([target.lat, target.lng], 16);
        else map.flyTo([target.lat, target.lng], 16, { duration: 0.55 });
      } else if (focus === "pin" && selectedPins.length > 1) {
        const bounds = leaflet.latLngBounds(
          selectedPins.map((pin) => [pin.lat, pin.lng]),
        );
        map.fitBounds(bounds, { ...frame, maxZoom: 16 });
      } else if (pins.length > 0) {
        const bounds = leaflet.latLngBounds(pins.map((pin) => [pin.lat, pin.lng]));
        map.fitBounds(bounds, frame);
      }

      requestAnimationFrame(() => map.invalidateSize());
    });

    return () => {
      cancelled = true;
    };
  }, [ready, pins, legs, selectedId, focus, fitTick]);

  return <div ref={host} className="map-canvas" />;
}
