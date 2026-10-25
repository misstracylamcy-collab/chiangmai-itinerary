# 清邁五日行程網站

互動式清邁 5 日 4 夜行程網站，含地圖、每日行程表與導航連結。

## 本地執行

```bash
npm install
npm run dev
```

開啟 http://localhost:5173

## 部署到 GitHub Pages（推薦）

### 步驟 1：建立 GitHub Repository

1. 到 https://github.com/new
2. Repository name 填 `chiangmai-itinerary`（或你喜歡的名稱）
3. 選 **Public**
4. **不要**勾選 Add a README
5. 點 Create repository

### 步驟 2：修改 base 路徑（重要）

打開 `vite.config.ts`，確認這一行：

```ts
base: '/chiangmai-itinerary/',
```

- 如果 repo 名稱是 `chiangmai-itinerary` → 保持 `/chiangmai-itinerary/`
- 如果 repo 名稱不同 → 改成 `/你的repo名稱/`
- 如果是用 `你的帳號.github.io` 這個特殊 repo → 改成 `/`

### 步驟 3：推上 GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/你的帳號/chiangmai-itinerary.git
git push -u origin main
```

### 步驟 4：開啟 GitHub Pages

1. 到你的 repository → **Settings** → **Pages**
2. Source 選 **GitHub Actions**
3. 到 **Actions** 頁籤，等 workflow 跑完（約 1～2 分鐘）
4. 完成後網址會是：

```
https://你的帳號.github.io/chiangmai-itinerary/
```

之後每次 `git push` 到 main 都會自動重新部署。

## 主要檔案說明

| 檔案 | 用途 |
|------|------|
| `src/data/itinerary.ts` | 所有行程資料（改這裡就能改內容） |
| `src/components/itinerary-app.tsx` | 主介面 |
| `src/components/trip-map.tsx` | 地圖 |
| `src/styles.css` | 樣式 |
| `.github/workflows/deploy.yml` | 自動部署設定 |

## 技術棧

- React 19 + TypeScript
- TanStack Router
- Leaflet
- Lucide Icons
- Vite
