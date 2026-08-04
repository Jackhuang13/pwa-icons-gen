import { CropSettings, IconDimensionSpec, ExportItem } from '../types';

/**
 * Loads an image from a Data URL, File Blob, or SVG string
 */
export async function loadImageSource(source: string | File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';

    let objectUrlToRevoke: string | null = null;
    const cleanup = () => {
      if (objectUrlToRevoke) {
        URL.revokeObjectURL(objectUrlToRevoke);
        objectUrlToRevoke = null;
      }
    };

    img.onload = () => {
      cleanup();
      resolve(img);
    };

    img.onerror = () => {
      cleanup();
      reject(new Error('無法載入圖像來源，請確認檔案格式是否正確。'));
    };

    if (source instanceof File) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          img.src = e.target.result as string;
        }
      };
      reader.onerror = (err) => {
        cleanup();
        reject(err);
      };
      reader.readAsDataURL(source);
    } else if (typeof source === 'string') {
      const trimmed = source.trim();
      if (trimmed.startsWith('<svg') || trimmed.startsWith('<?xml') || trimmed.includes('<svg')) {
        const blob = new Blob([trimmed], { type: 'image/svg+xml;charset=utf-8' });
        objectUrlToRevoke = URL.createObjectURL(blob);
        img.src = objectUrlToRevoke;
      } else if (trimmed) {
        img.src = trimmed;
      } else {
        reject(new Error('圖像來源為空'));
      }
    } else {
      reject(new Error('無效的圖像來源'));
    }
  });
}

/**
 * Render the image source onto a target canvas according to crop settings and output dimension
 */
export function renderImageToCanvas(
  img: HTMLImageElement,
  targetWidth: number,
  targetHeight: number,
  settings: CropSettings,
  isMaskable: boolean = false
): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = targetWidth;
  canvas.height = targetHeight;
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('Canvas 2D rendering context 不可用');
  }

  // Clear canvas
  ctx.clearRect(0, 0, targetWidth, targetHeight);

  // Handle background color fill
  if (!settings.transparentBg || isMaskable) {
    ctx.fillStyle = settings.backgroundColor || '#0f172a';
    ctx.fillRect(0, 0, targetWidth, targetHeight);
  }

  // Save state for transform calculations
  ctx.save();

  // Move origin to canvas center
  const centerX = targetWidth / 2;
  const centerY = targetHeight / 2;
  ctx.translate(centerX + settings.offsetX, centerY + settings.offsetY);

  // Apply rotation
  if (settings.rotation !== 0) {
    ctx.rotate((settings.rotation * Math.PI) / 180);
  }

  // Calculate base scale to fit image into target box
  const imgWidth = img.naturalWidth || img.width;
  const imgHeight = img.naturalHeight || img.height;

  // Base fit ratio
  const fitScale = Math.min(targetWidth / imgWidth, targetHeight / imgHeight);

  // Apply padding percentage (Safe zone padding)
  // For maskable icons, W3C spec recommends a 40% safe area radius (20% margin around edges)
  const paddingFactor = 1 - (settings.paddingPercent / 100);
  const totalScale = fitScale * settings.zoom * paddingFactor;

  const drawWidth = imgWidth * totalScale;
  const drawHeight = imgHeight * totalScale;

  // Apply pixel filters if enabled
  if (settings.activeFilter === 'contrast') {
    ctx.filter = 'contrast(125%) saturate(120%)';
  } else if (settings.activeFilter === 'grayscale') {
    ctx.filter = 'grayscale(100%)';
  } else if (settings.activeFilter === 'vibrant') {
    ctx.filter = 'saturate(160%) brightness(105%)';
  }

  // Draw image centered
  ctx.drawImage(img, -drawWidth / 2, -drawHeight / 2, drawWidth, drawHeight);

  ctx.restore();

  return canvas;
}

/**
 * Generate export data item (DataURL, Blob, File Size) for a single specification
 */
export async function generateExportItem(
  img: HTMLImageElement,
  spec: IconDimensionSpec,
  settings: CropSettings
): Promise<ExportItem> {
  const isMaskable = spec.purpose === 'maskable';
  const canvas = renderImageToCanvas(img, spec.width, spec.height, settings, isMaskable);

  return new Promise((resolve) => {
    canvas.toBlob(
      (blob) => {
        const dataUrl = canvas.toDataURL('image/png');
        const fileSizeBytes = blob ? blob.size : 0;
        const dimensionsText = `${spec.width}×${spec.height} px`;

        resolve({
          spec,
          selected: true,
          dataUrl,
          blob,
          fileSizeBytes,
          dimensionsText,
        });
      },
      'image/png',
      1.0
    );
  });
}

/**
 * Formats byte size into human readable string (KB / MB)
 */
export function formatBytes(bytes: number, decimals = 1): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}
