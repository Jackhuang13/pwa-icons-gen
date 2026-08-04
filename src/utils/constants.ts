import { IconDimensionSpec, PresetSample } from '../types';

/**
 * Complete set of standard PWA, iOS, Favicon, and Android launcher target sizes
 */
export const STANDARD_ICON_SPECS: IconDimensionSpec[] = [
  {
    id: 'pwa-192',
    width: 192,
    height: 192,
    filename: 'pwa-192x192.png',
    label: 'Standard PWA 192px',
    purpose: 'any',
    category: 'pwa-standard',
    isRequiredForPWA: true,
    recommendedFormat: 'png',
    description: 'Chrome / Android 主畫面與 Task Manager 標準圖示',
  },
  {
    id: 'pwa-512',
    width: 512,
    height: 512,
    filename: 'pwa-512x512.png',
    label: 'Standard PWA 512px',
    purpose: 'any',
    category: 'pwa-standard',
    isRequiredForPWA: true,
    recommendedFormat: 'png',
    description: 'PWA 安裝載入畫面 (Splash Screen) 與高解析度 App Icon',
  },
  {
    id: 'pwa-maskable-192',
    width: 192,
    height: 192,
    filename: 'pwa-maskable-192x192.png',
    label: 'Maskable PWA 192px',
    purpose: 'maskable',
    category: 'pwa-maskable',
    isRequiredForPWA: true,
    recommendedFormat: 'png',
    description: 'Android 自適應形狀圖示 (40% 安全區圓形/ squircle 裁切)',
  },
  {
    id: 'pwa-maskable-512',
    width: 512,
    height: 512,
    filename: 'pwa-maskable-512x512.png',
    label: 'Maskable PWA 512px',
    purpose: 'maskable',
    category: 'pwa-maskable',
    isRequiredForPWA: true,
    recommendedFormat: 'png',
    description: '高解析度自適應遮罩圖示，確保不同 OEM Android 裝置完全填滿',
  },
  {
    id: 'apple-touch-180',
    width: 180,
    height: 180,
    filename: 'apple-touch-icon.png',
    label: 'Apple Touch Icon 180px',
    purpose: 'any',
    category: 'apple',
    isRequiredForPWA: true,
    recommendedFormat: 'png',
    description: 'iOS Safari 「新增至主畫面」圖示 (預設無透明背景)',
  },
  {
    id: 'favicon-32',
    width: 32,
    height: 32,
    filename: 'favicon-32x32.png',
    label: 'Favicon 32px',
    purpose: 'any',
    category: 'favicon',
    isRequiredForPWA: true,
    recommendedFormat: 'png',
    description: '桌面瀏覽器分頁頁籤圖示 (Standard Desktop Tabs)',
  },
  {
    id: 'favicon-16',
    width: 16,
    height: 16,
    filename: 'favicon-16x16.png',
    label: 'Favicon 16px',
    purpose: 'any',
    category: 'favicon',
    isRequiredForPWA: true,
    recommendedFormat: 'png',
    description: '小尺寸分頁與書籤欄圖示',
  },
  {
    id: 'android-144',
    width: 144,
    height: 144,
    filename: 'android-chrome-144x144.png',
    label: 'Android xhdpi 144px',
    purpose: 'any',
    category: 'android',
    isRequiredForPWA: false,
    recommendedFormat: 'png',
    description: '舊版 Android xhdpi 裝置圖示相容',
  },
  {
    id: 'android-96',
    width: 96,
    height: 96,
    filename: 'android-chrome-96x96.png',
    label: 'Android hdpi 96px',
    purpose: 'any',
    category: 'android',
    isRequiredForPWA: false,
    recommendedFormat: 'png',
    description: '舊版 Android hdpi 裝置圖示相容',
  },
  {
    id: 'ms-tile-150',
    width: 150,
    height: 150,
    filename: 'mstile-150x150.png',
    label: 'Windows Tile 150px',
    purpose: 'any',
    category: 'ms',
    isRequiredForPWA: false,
    recommendedFormat: 'png',
    description: 'Windows 10/11 開始功能表動態磚圖示',
  },
  {
    id: 'pwa-384',
    width: 384,
    height: 384,
    filename: 'pwa-384x384.png',
    label: 'PWA Medium Splash 384px',
    purpose: 'any',
    category: 'pwa-standard',
    isRequiredForPWA: false,
    recommendedFormat: 'png',
    description: '中等尺寸裝置 PWA Launch Screen',
  },
];

/**
 * Built-in vector presets users can try instantly without uploading
 */
export const PRESET_TEMPLATES: PresetSample[] = [
  {
    id: 'tech-bolt',
    name: '極速閃電 (Lightning Tech)',
    category: '科技 / 效能',
    bgColor: '#4f46e5',
    colorGrad: ['#4f46e5', '#9333ea'],
    svgString: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <rect width="512" height="512" fill="url(#grad1)"/>
  <defs>
    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#4f46e5" />
      <stop offset="100%" stop-color="#9333ea" />
    </linearGradient>
  </defs>
  <path d="M290 96 L160 272 H256 L222 416 L352 240 H256 Z" fill="#ffffff" filter="drop-shadow(0 4px 12px rgba(0,0,0,0.25))"/>
</svg>`,
  },
  {
    id: 'cyber-rocket',
    name: '賽博火箭 (Cyber Rocket)',
    category: '創新 / 新創',
    bgColor: '#0f172a',
    colorGrad: ['#0f172a', '#0284c7'],
    svgString: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <rect width="512" height="512" fill="#0f172a"/>
  <circle cx="256" cy="256" r="180" fill="none" stroke="#38bdf8" stroke-width="8" stroke-dasharray="16 12"/>
  <path d="M256 120 C300 180 320 250 310 320 L256 290 L202 320 C192 250 212 180 256 120 Z" fill="#38bdf8"/>
  <circle cx="256" cy="220" r="28" fill="#0f172a"/>
  <path d="M256 320 L276 380 L256 365 L236 380 Z" fill="#f43f5e"/>
</svg>`,
  },
];
