# 🚀 PWA 圖示產生器 (PWA Icons Generator)

[English README](README.md)

一個功能強大、現代化且直觀的 **Progressive Web App (PWA) 圖示與標誌產生器**。專為開發者、設計師與專案建立者設計，協助您輕鬆產生所有符合 W3C 標準、Android / iOS Maskable 與標準尺寸的 PWA 圖示、動態 Manifest 設定檔，並支援一鍵打包下載與預覽。

---

## ✨ 主要功能特色

1. **強大圖像編輯與裁切工具**：
   - 支援上傳自訂圖片或使用精美預設向量圖示。
   - 即時縮放、平移、旋轉與背景顏色調整。
   - 支援透明背景或自訂漸層/純色背景。
2. **Safe-Zone (安全區域) 預覽**：
   - 即時檢視 80% 安全圓形遮罩範圍（Maskable Icon 標準），確保在 Android 及各大瀏覽器圓角裁切時核心圖示不被切到。
3. **多維度行動裝置真實預覽**：
   - 提供手機桌面主畫面（支援圓形、圓角矩形、水滴形等遮罩切換）即時預覽效果。
   - 模擬實際安裝後的應用程式圖示呈現。
4. **全尺寸圖示自動產生**：
   - 自動生成所有常見的 PWA 標準與 Maskable 尺寸（如 192x192、512x512 等）。
5. **一鍵 ZIP 打包與 Manifest 產生**：
   - 一鍵將所有尺寸圖示及設定檔打包下載。
   - 自動生成對應的 `manifest.json` 片段與 HTML `<link>` 宣告，方便直接貼入專案。

---

## 🛠️ 技術堆疊

- **前端框架**：React 19, TypeScript
- **建置工具**：Vite 6, Vite PWA Plugin
- **樣式設計**：Tailwind CSS v4
- **動畫與互動**：Motion (Framer Motion)
- **圖標庫**：Lucide React
- **壓縮打包**：JSZip

---

## 📂 專案架構

```text
pwa-icons-gen/
├── public/                 # 靜態資源與預設 PWA 輸出圖示
├── src/
│   ├── components/         # UI 元件 (裁切畫布、預覽器、上傳元件等)
│   ├── utils/              # 影像處理與圖示產生工具函數
│   ├── App.tsx             # 主應用程式邏輯
│   ├── main.tsx            # React 進入點
│   └── index.css           # 全域 Tailwind CSS 樣式
├── index.html              # HTML 進入點與 PWA meta 標籤
├── vite.config.ts          # Vite 與 PWA 插件設定
└── package.json            # 專案相依性與指令
```

---

## 🚀 快速開始與安裝

確保您的環境已安裝 Node.js (建議 v18+)。

1. **複製專案**
   ```bash
   git clone https://github.com/your-username/pwa-icons-gen.git
   cd pwa-icons-gen
   ```

2. **安裝相依套件**
   ```bash
   npm install
   ```

3. **啟動開發伺服器**
   ```bash
   npm run dev
   ```
   伺服器將運行於 `http://localhost:3000`。

---

## 📦 建置與部署

### 生產環境建置
```bash
npm run build
```
建置完成後的靜態檔案會輸出至 `dist/` 目錄。

### GitHub Pages 部署說明
若部署至 GitHub Pages (例如倉庫名稱為 `pwa-icons-gen`)，`vite.config.ts` 已自動設定適當的 `base` 路徑與相對路徑。

---

## 📄 授權條款

本專案採用 [MIT License](LICENSE) 授權條款。
