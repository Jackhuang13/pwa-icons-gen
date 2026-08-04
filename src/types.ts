/**
 * Global declaration for Vite define variable __APP_VERSION__
 */
declare const __APP_VERSION__: string;

/**
 * Categorization for icon output targets
 */
export type IconCategory = 'pwa-standard' | 'pwa-maskable' | 'apple' | 'favicon' | 'android' | 'ms';

/**
 * PWA Icon Purpose attribute according to W3C Web App Manifest spec
 */
export type IconPurpose = 'any' | 'maskable' | 'any maskable';

/**
 * Defines a single target icon size specification to generate
 */
export interface IconDimensionSpec {
  id: string;
  width: number;
  height: number;
  filename: string;
  label: string;
  purpose: IconPurpose;
  category: IconCategory;
  isRequiredForPWA: boolean;
  recommendedFormat: 'png' | 'ico' | 'svg';
  description: string;
}

/**
 * Controls for cropping, rotating, scaling, and padding the uploaded image canvas
 */
export interface CropSettings {
  zoom: number; // 0.1 to 3.0
  rotation: number; // 0, 90, 180, 270 degrees
  offsetX: number; // Pixel translation along X
  offsetY: number; // Pixel translation along Y
  backgroundColor: string; // Hex or RGBA string
  transparentBg: boolean; // Whether background should be transparent (where applicable)
  paddingPercent: number; // 0 to 40% safe-zone padding
  safeZoneVisible: boolean; // Show W3C Maskable 40% safe circle overlay
  activeFilter: 'none' | 'sharpen' | 'grayscale' | 'contrast' | 'vibrant';
}

/**
 * Presets for built-in vector icons users can immediately try
 */
export interface PresetSample {
  id: string;
  name: string;
  category: string;
  bgColor?: string;
  colorGrad: [string, string];
  svgString: string;
}

/**
 * Web App Manifest attributes for generator snippet export
 */
export interface ManifestConfig {
  name: string;
  shortName: string;
  description: string;
  themeColor: string;
  backgroundColor: string;
  display: 'standalone' | 'fullscreen' | 'minimal-ui' | 'browser';
  orientation: 'any' | 'natural' | 'portrait' | 'landscape';
  startUrl: string;
  scope: string;
  dir: 'auto' | 'ltr' | 'rtl';
  lang: string;
}

/**
 * Generated icon item ready for preview and zip bundling
 */
export interface ExportItem {
  spec: IconDimensionSpec;
  selected: boolean;
  dataUrl: string;
  blob: Blob | null;
  fileSizeBytes: number;
  dimensionsText: string;
}

/**
 * Device preview simulator tab target
 */
export type DeviceSimulatorType = 'android' | 'ios' | 'browser' | 'taskbar';
