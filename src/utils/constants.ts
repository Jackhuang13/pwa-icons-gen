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
    svgString: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%">
  <defs>
    <linearGradient id="grad-tech-bolt" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#4f46e5" />
      <stop offset="100%" stop-color="#9333ea" />
    </linearGradient>
  </defs>
  <rect width="512" height="512" rx="96" fill="url(#grad-tech-bolt)"/>
  <path d="M290 96 L160 272 H256 L222 416 L352 240 H256 Z" fill="#ffffff" filter="drop-shadow(0 4px 12px rgba(0,0,0,0.25))"/>
</svg>`,
  },
  {
    id: 'cyber-rocket',
    name: '賽博火箭 (Cyber Rocket)',
    category: '創新 / 新創',
    bgColor: '#0f172a',
    colorGrad: ['#0f172a', '#0284c7'],
    svgString: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%">
  <defs>
    <linearGradient id="grad-cyber-rocket" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#0f172a" />
      <stop offset="100%" stop-color="#1e293b" />
    </linearGradient>
  </defs>
  <rect width="512" height="512" rx="96" fill="url(#grad-cyber-rocket)"/>
  <circle cx="256" cy="256" r="170" fill="none" stroke="#38bdf8" stroke-width="8" stroke-dasharray="16 12" opacity="0.6"/>
  <path d="M256 120 C300 180 320 250 310 320 L256 290 L202 320 C192 250 212 180 256 120 Z" fill="#38bdf8"/>
  <circle cx="256" cy="220" r="28" fill="#0f172a" stroke="#38bdf8" stroke-width="4"/>
  <path d="M256 315 L276 375 L256 360 L236 375 Z" fill="#f43f5e"/>
</svg>`,
  },
  {
    id: 'zen-lotus',
    name: '禪意蓮花 (Zen Lotus)',
    category: '生活 / 健康',
    bgColor: '#0d9488',
    colorGrad: ['#0d9488', '#059669'],
    svgString: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%">
  <defs>
    <linearGradient id="grad-zen-lotus" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0d9488" />
      <stop offset="100%" stop-color="#059669" />
    </linearGradient>
  </defs>
  <rect width="512" height="512" rx="96" fill="url(#grad-zen-lotus)"/>
  <path d="M256 130 C200 220 200 310 256 350 C312 310 312 220 256 130 Z" fill="#ffffff" opacity="0.95"/>
  <path d="M256 350 C180 340 130 260 140 200 C180 240 220 290 256 350 Z" fill="#ccfbf1" opacity="0.85"/>
  <path d="M256 350 C332 340 382 260 372 200 C332 240 292 290 256 350 Z" fill="#ccfbf1" opacity="0.85"/>
  <circle cx="256" cy="300" r="16" fill="#fef08a"/>
</svg>`,
  },
  {
    id: 'quantum-atom',
    name: '量子原子 (Quantum Atom)',
    category: '科學 / AI',
    bgColor: '#8b5cf6',
    colorGrad: ['#8b5cf6', '#ec4899'],
    svgString: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%">
  <defs>
    <linearGradient id="grad-quantum-atom" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#7c3aed" />
      <stop offset="100%" stop-color="#db2777" />
    </linearGradient>
  </defs>
  <rect width="512" height="512" rx="96" fill="url(#grad-quantum-atom)"/>
  <ellipse cx="256" cy="256" rx="160" ry="60" fill="none" stroke="#ffffff" stroke-width="10" transform="rotate(30 256 256)" opacity="0.85"/>
  <ellipse cx="256" cy="256" rx="160" ry="60" fill="none" stroke="#ffffff" stroke-width="10" transform="rotate(-30 256 256)" opacity="0.85"/>
  <ellipse cx="256" cy="256" rx="160" ry="60" fill="none" stroke="#ffffff" stroke-width="10" transform="rotate(90 256 256)" opacity="0.85"/>
  <circle cx="256" cy="256" r="32" fill="#fef08a"/>
</svg>`,
  },
  {
    id: 'cyber-gaming',
    name: '極限電競 (Cyber Gaming)',
    category: '娛樂 / 遊戲',
    bgColor: '#0f172a',
    colorGrad: ['#dc2626', '#7c3aed'],
    svgString: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%">
  <defs>
    <linearGradient id="grad-cyber-gaming" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#dc2626" />
      <stop offset="100%" stop-color="#7c3aed" />
    </linearGradient>
  </defs>
  <rect width="512" height="512" rx="96" fill="url(#grad-cyber-gaming)"/>
  <path d="M150 180 C180 170 332 170 362 180 C390 190 410 260 390 330 C380 360 340 360 320 320 L290 270 H222 L192 320 C172 360 132 360 122 330 C102 260 122 190 150 180 Z" fill="#ffffff" opacity="0.95"/>
  <path d="M170 230 H190 V210 H210 V230 H230 V250 H210 V270 H190 V250 H170 Z" fill="#0f172a"/>
  <circle cx="330" cy="225" r="12" fill="#ef4444"/>
  <circle cx="355" cy="245" r="12" fill="#3b82f6"/>
  <circle cx="305" cy="245" r="12" fill="#10b981"/>
  <circle cx="330" cy="265" r="12" fill="#eab308"/>
</svg>`,
  },
  {
    id: 'shield-protect',
    name: '安全防護 (Shield Protect)',
    category: '資安 / 工具',
    bgColor: '#065f46',
    colorGrad: ['#10b981', '#065f46'],
    svgString: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%">
  <defs>
    <linearGradient id="grad-shield-protect" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#059669" />
      <stop offset="100%" stop-color="#064e3b" />
    </linearGradient>
  </defs>
  <rect width="512" height="512" rx="96" fill="url(#grad-shield-protect)"/>
  <path d="M256 110 L380 160 V260 C380 345 320 405 256 430 C192 405 132 345 132 260 V160 Z" fill="#10b981" stroke="#ffffff" stroke-width="12"/>
  <path d="M220 260 L245 285 L295 225" fill="none" stroke="#ffffff" stroke-width="24" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,
  },
];
