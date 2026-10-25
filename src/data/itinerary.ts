
export type Kind =
  | "flight"
  | "food"
  | "cafe"
  | "wander"
  | "stay"
  | "sight"
  | "spa"
  | "river"
  | "shop"
  | "night";

export type Pin = {
  name: string;
  lat: number;
  lng: number;
  query?: string;
};

export type Stop = {
  id: string;
  time: string;
  title: string;
  place: string;
  note: string;
  transport: string;
  kind: Kind;
  query: string;
  pins: Pin[];
};

export type Day = {
  id: string;
  dateLabel: string;
  weekday: string;
  short: string;
  title: string;
  colorToken: string;
  stops: Stop[];
};

export const TRIP = {
	name: "清邁五日",
	range: "11/12（四）– 11/16（一）",
	party: "2 男 2 女 · 共 4 人",
	stay: "住宿區域 Pa Daet",
	spa: "Makkha Ancient House · Relax Express"
};
export const TIPS = [{
	title: "Makkha 要先訂位",
	body: "百年蘭納木宅的高階 Spa，4 人同行建議至少提前 1–2 週在官網或 Klook／KKday 訂好。行程排在 11/13 下午，約 2–2.5 小時，結束有芒果糯米飯。"
}, {
	title: "Relax Express 可晚到",
	body: "平價快捷，營業至午夜 12 點。排在 11/14 週六夜市之後做 1 小時腳底按摩，走路就能到清邁門附近，時間最順。"
}];
export const days = [
	{
		id: "d1",
		dateLabel: "11/12",
		weekday: "星期四",
		short: "抵達",
		title: "抵達、泰北咖喱麵、寧曼路、森林晚餐",
		colorToken: "--color-teak",
		stops: [
			{
				id: "d1-1",
				time: "09:50",
				title: "抵達清邁國際機場（CNX）",
				place: "清邁國際機場",
				note: "機場離 Pa Daet 非常近，車程約 10 分鐘即可抵達住宿寄放行李。",
				transport: "Grab / Bolt（大車）",
				kind: "flight",
				query: "Chiang Mai International Airport",
				pins: [{
					name: "清邁國際機場",
					lat: 18.766843,
					lng: 98.964878,
					query: "Chiang Mai International Airport"
				}]
			},
			{
				id: "d1-2",
				time: "11:30",
				title: "午餐：Khao Soi Mae Sai",
				place: "Khao Soi Mae Sai",
				note: "享用招牌泰北咖喱雞腿麵，椰香湯底配上脆麵，極具特色。店在 Chang Phueak 的 Ratchaphuek。",
				transport: "Grab / Bolt（4 人 SUV）",
				kind: "food",
				query: "Khao Soi Mae Sai Chiang Mai",
				pins: [{
					name: "Khao Soi Mae Sai",
					lat: 18.79982,
					lng: 98.97522,
					query: "Khao Soi Mae Sai Chiang Mai"
				}]
			},
			{
				id: "d1-3",
				time: "13:30",
				title: "寧曼路與 One Nimman 漫遊",
				place: "One Nimman／寧曼路",
				note: "4 人慢行特色文青小店、選品店，並到 Ristr8to 或 GRAPH 飲杯手沖咖啡放鬆。",
				transport: "Grab / Bolt（4 人 SUV）",
				kind: "wander",
				query: "One Nimman Chiang Mai",
				pins: [{
					name: "One Nimman",
					lat: 18.800126,
					lng: 98.968073,
					query: "One Nimman Chiang Mai"
				}]
			},
			{
				id: "d1-4",
				time: "17:30",
				title: "晚餐：Chom Cafe and Restaurant",
				place: "Chom Cafe and Restaurant",
				note: "離 Pa Daet 不遠的人氣「仙氣森林」景觀餐廳，造景瀑布配煙霧，非常適合拍照打卡。",
				transport: "Grab / Bolt（4 人 SUV）",
				kind: "food",
				query: "Chom Cafe and Restaurant Chiang Mai",
				pins: [{
					name: "Chom Cafe",
					lat: 18.748257,
					lng: 98.945427,
					query: "Chom Cafe and Restaurant Chiang Mai"
				}]
			},
			{
				id: "d1-5",
				time: "20:30",
				title: "返住宿休息放空",
				place: "Pa Daet 住宿",
				note: "享受第一晚的愜意時光。試算表只寫了 Pa Daet 區，沒有酒店名，地圖釘在機場以南約 10 分鐘車程的一帶。",
				transport: "Grab / Bolt（4 人 SUV）",
				kind: "stay",
				query: "Pa Daet Chiang Mai",
				pins: [{
					name: "Pa Daet 住宿一帶",
					lat: 18.7515,
					lng: 98.981,
					query: "Pa Daet Chiang Mai",
					approx: true
				}]
			}
		]
	},
	{
		id: "d2",
		dateLabel: "11/13",
		weekday: "星期五",
		short: "古城",
		title: "古城巡禮、Makkha Spa、泰式烤肉火鍋",
		colorToken: "--color-saffron",
		stops: [
			{
				id: "d2-1",
				time: "10:00",
				title: "睡到自然醒，前往古城",
				place: "清邁古城",
				note: "乘車前往清邁古城，開啟古城漫遊日。",
				transport: "Grab / Bolt（4 人 SUV）",
				kind: "sight",
				query: "Chiang Mai Old City",
				pins: [{
					name: "清邁古城",
					lat: 18.7886,
					lng: 98.9873,
					query: "Chiang Mai Old City"
				}]
			},
			{
				id: "d2-2",
				time: "10:30",
				title: "古城地標打卡",
				place: "柴迪隆寺／塔佩門",
				note: "參觀柴迪隆寺（Wat Chedi Luang）宏偉古塔，再到塔佩門（Tha Phae Gate）拍經典紅磚牆與鴿子合照。",
				transport: "Grab / Bolt（4 人 SUV）",
				kind: "sight",
				query: "Wat Chedi Luang Chiang Mai",
				pins: [{
					name: "柴迪隆寺",
					lat: 18.787143,
					lng: 98.986784,
					query: "Wat Chedi Luang Chiang Mai"
				}, {
					name: "塔佩門",
					lat: 18.787763,
					lng: 98.99327,
					query: "Tha Phae Gate Chiang Mai"
				}]
			},
			{
				id: "d2-3",
				time: "12:30",
				title: "午餐：The House by Ginger",
				place: "The House by Ginger",
				note: "米芝蓮推薦的復古南洋風餐廳，餐點精緻且環境質感極佳。在護城河東側 Mun Mueang 路。",
				transport: "Grab / Bolt（4 人 SUV）",
				kind: "food",
				query: "The House by Ginger Chiang Mai",
				pins: [{
					name: "The House by Ginger",
					lat: 18.792788,
					lng: 98.993221,
					query: "The House by Ginger Chiang Mai"
				}]
			},
			{
				id: "d2-4",
				time: "14:30",
				title: "Spa：Makkha Health & Spa",
				place: "Makkha Ancient House",
				note: "在 60 年蘭納木宅內享受 2–2.5 小時高級 Spa（精油按摩／草球熱敷，附芒果糯米飯）。地址在古城 Ratchamanka Soi 8。",
				transport: "徒步／Grab",
				kind: "spa",
				query: "Makkha Health & Spa Ancient House Chiang Mai",
				pins: [{
					name: "Makkha Ancient House",
					lat: 18.786315,
					lng: 98.981016,
					query: "Makkha Health & Spa Ancient House Chiang Mai"
				}]
			},
			{
				id: "d2-5",
				time: "18:00",
				title: "美平河畔散步",
				place: "Ping Riverfront",
				note: "在河畔吹涼風、看河景，感受清邁傍晚的涼意。",
				transport: "Grab / Bolt（4 人 SUV）",
				kind: "river",
				query: "Ping River Chiang Mai Tha Phae",
				pins: [{
					name: "美平河畔",
					lat: 18.7894,
					lng: 99.0012,
					query: "Ping River promenade Chiang Mai",
					approx: true
				}]
			},
			{
				id: "d2-6",
				time: "19:30",
				title: "晚餐：泰式烤肉火鍋",
				place: "Chang Phueak 一帶",
				note: "4 人圍坐炭爐烤肉與清湯涮菜，配冰涼 Singha。試算表寫的是 Chang Phueak 的在地 Mu Kratha，不是單一店名，地圖釘在這個區域。",
				transport: "Grab / Bolt（4 人 SUV）",
				kind: "food",
				query: "Mu Kratha Chang Phueak Chiang Mai",
				pins: [{
					name: "Chang Phueak",
					lat: 18.8048,
					lng: 98.9842,
					query: "Mu Kratha Chang Phueak Chiang Mai",
					approx: true
				}]
			}
		]
	},
	{
		id: "d3",
		dateLabel: "11/14",
		weekday: "星期六",
		short: "山腳",
		title: "山腳文青村、河畔晚餐、週六夜市",
		colorToken: "--color-fern",
		stops: [
			{
				id: "d3-1",
				time: "10:30",
				title: "Baan Kang Wat 藝術村",
				place: "Baan Kang Wat",
				note: "位於素帖山腳下，由多棟木造建築組成，有手作成品、陶藝與風格小店，環境安靜舒適。",
				transport: "Grab / Bolt（4 人 SUV）",
				kind: "wander",
				query: "Baan Kang Wat Chiang Mai",
				pins: [{
					name: "Baan Kang Wat",
					lat: 18.77675,
					lng: 98.948264,
					query: "Baan Kang Wat Chiang Mai"
				}]
			},
			{
				id: "d3-2",
				time: "13:00",
				title: "午餐：No.39 Cafe",
				place: "No.39 Cafe",
				note: "湖畔小木屋 Cafe，可以在湖邊散步，享用 Brunch 與特調飲料。就在藝術村附近。",
				transport: "Grab / Bolt（4 人 SUV）",
				kind: "cafe",
				query: "No.39 Cafe Chiang Mai Baan Kang Wat",
				pins: [{
					name: "No.39 Cafe",
					lat: 18.780126,
					lng: 98.951568,
					query: "No.39 Cafe Chiang Mai"
				}]
			},
			{
				id: "d3-3",
				time: "16:30",
				title: "湄卡運河散步",
				place: "Mae Kha Canal",
				note: "清邁的「小日式運河步道」，兩旁有木造房屋與特色小店，適合傍晚漫步。運河很長，釘選在古城南側常被散步的一段。",
				transport: "Grab / Bolt（4 人 SUV）",
				kind: "river",
				query: "Mae Kha Canal Chiang Mai",
				pins: [{
					name: "湄卡運河",
					lat: 18.7758,
					lng: 98.9886,
					query: "Mae Kha Canal Chiang Mai",
					approx: true
				}]
			},
			{
				id: "d3-4",
				time: "18:30",
				title: "晚餐：The Riverside Bar",
				place: "The Riverside Bar & Restaurant",
				note: "美平河畔老字號餐廳，伴隨 Live Band 與河岸夜景享用泰菜。",
				transport: "Grab / Bolt（4 人 SUV）",
				kind: "food",
				query: "The Riverside Bar & Restaurant Chiang Mai",
				pins: [{
					name: "The Riverside",
					lat: 18.7928,
					lng: 99.00195,
					query: "The Riverside Bar & Restaurant Chiang Mai"
				}]
			},
			{
				id: "d3-5",
				time: "20:30",
				title: "週六夜市 Wua Lai",
				place: "Wua Lai Road",
				note: "4 人逛清邁著名的銀器街夜市，體驗熱鬧氛圍並品嚐各式泰式小吃。",
				transport: "Grab / Bolt（4 人 SUV）",
				kind: "night",
				query: "Wua Lai Walking Street Chiang Mai",
				pins: [{
					name: "週六夜市",
					lat: 18.7782,
					lng: 98.9852,
					query: "Wua Lai Walking Street Chiang Mai"
				}]
			},
			{
				id: "d3-6",
				time: "22:00",
				title: "按摩：Relax Express",
				place: "Relax Express＠Chiangmai Gate",
				note: "夜市結束後到清邁門附近做 1 小時腳底按摩，舒緩雙腳，再回 Pa Daet。營業到午夜。",
				transport: "徒步／Grab",
				kind: "spa",
				query: "Relax Express Chiangmai Gate",
				pins: [{
					name: "Relax Express",
					lat: 18.78045,
					lng: 98.9887,
					query: "Relax Express Chiangmai Gate",
					approx: true
				}]
			}
		]
	},
	{
		id: "d4",
		dateLabel: "11/15",
		weekday: "星期日",
		short: "夜市",
		title: "蕨類花園、瓦洛洛市場、週日大夜市",
		colorToken: "--color-river",
		stops: [
			{
				id: "d4-1",
				time: "10:30",
				title: "Fern Forest Cafe",
				place: "Fern Forest Cafe",
				note: "在古城內被蕨類植物包圍的花園 Villa，享用遲來的 Brunch 與西式甜品。",
				transport: "Grab / Bolt（4 人 SUV）",
				kind: "cafe",
				query: "Fern Forest Cafe Chiang Mai",
				pins: [{
					name: "Fern Forest Cafe",
					lat: 18.793387,
					lng: 98.98203,
					query: "Fern Forest Cafe Chiang Mai"
				}]
			},
			{
				id: "d4-2",
				time: "13:30",
				title: "瓦洛洛市場",
				place: "Warorot Market",
				note: "最在地的人氣市場。可以買泰北辣香腸、手標泰茶葉、皇家蜂蜜與芒果乾。",
				transport: "Grab / Bolt（4 人 SUV）",
				kind: "market",
				query: "Warorot Market Chiang Mai",
				pins: [{
					name: "瓦洛洛市場",
					lat: 18.790236,
					lng: 99.000535,
					query: "Warorot Market Chiang Mai"
				}]
			},
			{
				id: "d4-3",
				time: "15:30",
				title: "Woo Cafe & Art Gallery",
				place: "Woo Cafe & Art Gallery",
				note: "瓦洛洛市場附近、充滿花藝與藝術品的熱帶風 Cafe，享用下午茶與蛋糕。",
				transport: "Grab / Bolt（4 人 SUV）",
				kind: "cafe",
				query: "Woo Cafe & Art Gallery Chiang Mai",
				pins: [{
					name: "Woo Cafe",
					lat: 18.791736,
					lng: 99.00272,
					query: "Woo Cafe & Art Gallery Chiang Mai"
				}]
			},
			{
				id: "d4-4",
				time: "18:00",
				title: "週日大夜市",
				place: "Rachadamnoen Road",
				note: "全清邁規模最大的夜市，從塔佩門延伸進古城。順便採購手作紀念品。",
				transport: "徒步／Grab",
				kind: "night",
				query: "Sunday Walking Street Chiang Mai",
				pins: [{
					name: "塔佩門（夜市起點）",
					lat: 18.787763,
					lng: 98.99327,
					query: "Tha Phae Gate Chiang Mai"
				}, {
					name: "週日夜市",
					lat: 18.7879,
					lng: 98.9902,
					query: "Sunday Walking Street Ratchadamnoen Chiang Mai"
				}]
			}
		]
	},
	{
		id: "d5",
		dateLabel: "11/16",
		weekday: "星期一",
		short: "返港",
		title: "退房、手信、下午茶、19:40 起飛",
		colorToken: "--color-clay",
		stops: [
			{
				id: "d5-1",
				time: "10:30",
				title: "睡到自然醒並退房",
				place: "Pa Daet 住宿",
				note: "在住宿慢慢收拾行李並退房。行李可寄放或隨車。位置與第一晚同一帶。",
				transport: "Grab / Bolt（4 人 SUV）",
				kind: "stay",
				query: "Pa Daet Chiang Mai",
				pins: [{
					name: "Pa Daet 住宿一帶",
					lat: 18.7515,
					lng: 98.981,
					query: "Pa Daet Chiang Mai",
					approx: true
				}]
			},
			{
				id: "d5-2",
				time: "12:00",
				title: "尚泰清邁機場購物中心",
				place: "Central Chiang Mai Airport",
				note: "距離住宿與機場都很近，適合最後補手信和吃午餐。",
				transport: "Grab / Bolt（大車）",
				kind: "market",
				query: "Central Chiang Mai Airport",
				pins: [{
					name: "Central Chiang Mai Airport",
					lat: 18.769236,
					lng: 98.975721,
					query: "Central Chiang Mai Airport Plaza"
				}]
			},
			{
				id: "d5-3",
				time: "14:30",
				title: "The Service 1921 放空",
				place: "Anantara Chiang Mai",
				note: "在美平河畔的 Anantara（The Service 1921）或古城特色 Cafe 坐坐。地圖釘在 Anantara 河畔酒店。",
				transport: "Grab / Bolt（4 人 SUV）",
				kind: "cafe",
				query: "Anantara Chiang Mai Resort The Service 1921",
				pins: [{
					name: "Anantara Chiang Mai",
					lat: 18.7819,
					lng: 98.9955,
					query: "Anantara Chiang Mai Resort"
				}]
			},
			{
				id: "d5-4",
				time: "16:40",
				title: "前往清邁國際機場",
				place: "清邁國際機場",
				note: "提前約 3 小時抵達，辦理登機與退稅。",
				transport: "Grab / Bolt（大車）",
				kind: "flight",
				query: "Chiang Mai International Airport",
				pins: [{
					name: "清邁國際機場",
					lat: 18.766843,
					lng: 98.964878,
					query: "Chiang Mai International Airport"
				}]
			},
			{
				id: "d5-5",
				time: "19:40",
				title: "起飛返港",
				place: "香港國際機場",
				note: "搭乘航班返回香港，結束 5 日 4 夜。這一站在香港，不會畫進清邁地圖。",
				transport: "航班",
				kind: "flight",
				query: "Hong Kong International Airport",
				pins: []
			}
		]
	}
];
export function allStops() {
	return days.flatMap((day) => day.stops);
}
export function dirUrl(query, transport) {
	const walking = transport.startsWith("徒步") || transport === "步行";
	const params = new URLSearchParams({
		api: "1",
		destination: query,
		travelmode: walking ? "walking" : "driving"
	});
	return `https://www.google.com/maps/dir/?${params.toString()}`;
}
export function kmBetween(a, b) {
	const r = 6371;
	const dLat = (b.lat - a.lat) * Math.PI / 180;
	const dLng = (b.lng - a.lng) * Math.PI / 180;
	const la1 = a.lat * Math.PI / 180;
	const la2 = b.lat * Math.PI / 180;
	const h = Math.sin(dLat / 2) ** 2 + Math.cos(la1) * Math.cos(la2) * Math.sin(dLng / 2) ** 2;
	return 2 * r * Math.asin(Math.min(1, Math.sqrt(h)));
}
export function formatDistance(km) {
	if (km < 1) return `${Math.round(km * 1e3)} 公尺`;
	return `${km.toFixed(km < 10 ? 1 : 0)} 公里`;
}
