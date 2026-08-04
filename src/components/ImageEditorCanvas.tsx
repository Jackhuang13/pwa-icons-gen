import React, { useRef, useEffect, useState, useCallback } from 'react';
import { CropSettings } from '../types';
import { renderImageToCanvas } from '../utils/imageProcess';
import {
  ZoomIn,
  ZoomOut,
  RotateCw,
  Eye,
  EyeOff,
  Move,
  Palette,
  Sliders,
  Sparkles,
  Maximize2,
  RefreshCw,
  Check,
} from 'lucide-react';

interface ImageEditorCanvasProps {
  imageElement: HTMLImageElement | null;
  settings: CropSettings;
  onSettingsChange: (newSettings: CropSettings) => void;
}

const PRESET_BG_COLORS = [
  '#0f172a', // Slate Dark
  '#4f46e5', // Indigo
  '#2563eb', // Blue
  '#059669', // Emerald
  '#d97706', // Amber
  '#dc2626', // Red
  '#7c3aed', // Purple
  '#000000', // Pure Black
  '#ffffff', // Pure White
];

export const ImageEditorCanvas: React.FC<ImageEditorCanvasProps> = ({
  imageElement,
  settings,
  onSettingsChange,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDraggingCanvas, setIsDraggingCanvas] = useState(false);
  const [dragStartPos, setDragStartPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [activeTab, setActiveTab] = useState<'transform' | 'background' | 'maskable'>('transform');

  // Draw preview canvas whenever settings or imageElement changes
  const updateCanvasPreview = useCallback(() => {
    if (!canvasRef.current || !imageElement) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = 512; // High resolution editor preview
    canvas.width = size;
    canvas.height = size;

    // Render processed image
    const renderedCanvas = renderImageToCanvas(imageElement, size, size, settings, false);
    ctx.clearRect(0, 0, size, size);
    ctx.drawImage(renderedCanvas, 0, 0);

    // Render W3C Safe Zone Circle Overlay if enabled
    if (settings.safeZoneVisible) {
      ctx.save();
      const centerX = size / 2;
      const centerY = size / 2;

      // Safe zone is 40% radius (80% diameter circle according to W3C specification)
      const safeRadius = size * 0.4;

      // Contrast outer outline shadow
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(centerX, centerY, safeRadius, 0, Math.PI * 2);
      ctx.stroke();

      // Safe zone dashed cyan stroke
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2;
      ctx.setLineDash([8, 6]);
      ctx.beginPath();
      ctx.arc(centerX, centerY, safeRadius, 0, Math.PI * 2);
      ctx.stroke();

      // Label text with text shadow for readability on light/dark backgrounds
      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 13px sans-serif';
      ctx.textAlign = 'center';
      ctx.shadowColor = 'rgba(0, 0, 0, 0.9)';
      ctx.shadowBlur = 4;
      ctx.fillText('80% Safe Zone (Maskable)', centerX, centerY - safeRadius - 10);

      ctx.restore();
    }
  }, [imageElement, settings]);

  useEffect(() => {
    updateCanvasPreview();
  }, [updateCanvasPreview]);

  // Handle canvas mouse drag for quick pan
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDraggingCanvas(true);
    setDragStartPos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingCanvas) return;
    const dx = e.clientX - dragStartPos.x;
    const dy = e.clientY - dragStartPos.y;

    setDragStartPos({ x: e.clientX, y: e.clientY });
    onSettingsChange({
      ...settings,
      offsetX: settings.offsetX + dx,
      offsetY: settings.offsetY + dy,
    });
  };

  const handleMouseUp = () => {
    setIsDraggingCanvas(false);
  };

  const resetTransform = () => {
    onSettingsChange({
      ...settings,
      zoom: 1,
      rotation: 0,
      offsetX: 0,
      offsetY: 0,
      paddingPercent: 20,
    });
  };

  const rotate90 = () => {
    onSettingsChange({
      ...settings,
      rotation: (settings.rotation + 90) % 360,
    });
  };

  return (
    <div className="flex flex-col gap-6 rounded-2xl border border-white/10 bg-[#141415] p-5 shadow-2xl lg:flex-row min-w-0 w-full overflow-hidden">
      {/* Canvas Viewport Section */}
      <div className="flex flex-1 flex-col items-center justify-center min-w-0">
        <div
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className={`relative flex h-72 w-72 items-center justify-center overflow-hidden rounded-2xl border-2 sm:h-80 sm:w-80 ${
            settings.transparentBg
              ? 'bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px] bg-[#0A0A0B]'
              : 'bg-[#0A0A0B]'
          } border-white/10 shadow-2xl cursor-grab active:cursor-grabbing`}
        >
          <canvas ref={canvasRef} className="h-full w-full object-contain" />

          {/* Quick Floating Controls on Canvas */}
          <div className="absolute top-3 right-3 flex items-center gap-1.5 rounded-xl bg-[#141415]/80 p-1.5 backdrop-blur-md border border-white/10 shadow-lg">
            <button
              onClick={() => onSettingsChange({ ...settings, safeZoneVisible: !settings.safeZoneVisible })}
              className={`rounded-lg p-1.5 text-xs font-semibold transition-colors ${
                settings.safeZoneVisible
                  ? 'bg-blue-600 text-white shadow'
                  : 'text-slate-300 hover:bg-white/10 hover:text-white'
              }`}
              title="切換 Maskable 40% 安全區遮罩"
            >
              {settings.safeZoneVisible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
            </button>
            <button
              onClick={rotate90}
              className="rounded-lg p-1.5 text-slate-300 hover:bg-white/10 hover:text-white transition-colors"
              title="順時針旋轉 90°"
            >
              <RotateCw className="h-4 w-4" />
            </button>
          </div>

          <div className="absolute bottom-3 left-3 rounded-lg bg-[#0A0A0B]/80 px-2.5 py-1 text-[11px] font-mono text-slate-300 backdrop-blur-md border border-white/10">
            {Math.round(settings.zoom * 100)}% | Rot: {settings.rotation}°
          </div>
        </div>

        <p className="mt-2 text-[11px] text-slate-400 flex items-center gap-1">
          <Move className="h-3 w-3 text-blue-400" />
          可在預覽畫面上按住滑鼠拖曳調整位置 (Pan)
        </p>
      </div>

      {/* Control Tools Panel */}
      <div className="w-full lg:w-80 space-y-4 min-w-0">
        {/* Category Tabs */}
        <div className="flex max-w-full overflow-x-auto no-scrollbar rounded-xl bg-[#0A0A0B] p-1 border border-white/10 text-xs font-semibold shrink-0 min-w-0">
          <button
            onClick={() => setActiveTab('transform')}
            className={`flex-1 rounded-lg py-2 transition-all flex items-center justify-center gap-1 shrink-0 whitespace-nowrap px-3 ${
              activeTab === 'transform' ? 'bg-blue-600 text-white shadow font-semibold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sliders className="h-3.5 w-3.5" />
            縮放 / 位移
          </button>
          <button
            onClick={() => setActiveTab('background')}
            className={`flex-1 rounded-lg py-2 transition-all flex items-center justify-center gap-1 shrink-0 whitespace-nowrap px-3 ${
              activeTab === 'background' ? 'bg-blue-600 text-white shadow font-semibold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Palette className="h-3.5 w-3.5" />
            背景顏色
          </button>
        </div>

        {/* Tab 1: Transform Controls */}
        {activeTab === 'transform' && (
          <div className="space-y-4 rounded-xl border border-white/10 bg-[#0A0A0B] p-4">
            {/* Zoom Slider */}
            <div>
              <div className="flex items-center justify-between text-xs font-medium text-slate-300 mb-1.5">
                <span className="flex items-center gap-1">
                  <ZoomIn className="h-3.5 w-3.5 text-blue-400" /> 縮放倍率 (Zoom)
                </span>
                <span className="font-mono text-blue-400">{settings.zoom.toFixed(2)}x</span>
              </div>
              <input
                type="range"
                min="0.2"
                max="3.0"
                step="0.05"
                value={settings.zoom}
                onChange={(e) => onSettingsChange({ ...settings, zoom: parseFloat(e.target.value) })}
                className="h-2 w-full accent-blue-500 bg-[#141415] rounded-lg cursor-pointer"
              />
            </div>

            {/* Inner Padding Percentage Slider */}
            <div>
              <div className="flex items-center justify-between text-xs font-medium text-slate-300 mb-1.5">
                <span>邊界留白 (Safe Padding)</span>
                <span className="font-mono text-amber-400">{settings.paddingPercent}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="40"
                step="2"
                value={settings.paddingPercent}
                onChange={(e) => onSettingsChange({ ...settings, paddingPercent: parseInt(e.target.value) })}
                className="h-2 w-full accent-amber-500 bg-[#141415] rounded-lg cursor-pointer"
              />
            </div>

            {/* Quick Action Buttons */}
            <div className="flex gap-2 pt-2 border-t border-white/10">
              <button
                onClick={resetTransform}
                className="flex-1 rounded-lg border border-white/10 bg-[#141415] py-1.5 text-xs font-medium text-slate-200 hover:bg-white/10 transition-colors"
              >
                重置變形
              </button>
              <button
                onClick={() => onSettingsChange({ ...settings, paddingPercent: 20 })}
                className="flex-1 rounded-lg border border-blue-500/30 bg-blue-950/40 py-1.5 text-xs font-medium text-blue-300 hover:bg-blue-900/60 transition-colors"
              >
                設定 20% Safe Zone
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: Background Controls */}
        {activeTab === 'background' && (
          <div className="space-y-4 rounded-xl border border-white/10 bg-[#0A0A0B] p-4">
            {/* Transparent Background Toggle */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-300">透明背景 (Transparent Alpha)</span>
              <button
                onClick={() => onSettingsChange({ ...settings, transparentBg: !settings.transparentBg })}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.transparentBg ? 'bg-blue-600' : 'bg-slate-800'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.transparentBg ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Color Swatches */}
            <div>
              <span className="block text-xs font-medium text-slate-300 mb-2">背景預設色彩</span>
              <div className="grid grid-cols-5 gap-2">
                {PRESET_BG_COLORS.map((color) => (
                  <button
                    key={color}
                    onClick={() =>
                      onSettingsChange({ ...settings, backgroundColor: color, transparentBg: false })
                    }
                    style={{ backgroundColor: color }}
                    className={`h-8 w-full rounded-lg border transition-transform hover:scale-110 flex items-center justify-center ${
                      settings.backgroundColor === color && !settings.transparentBg
                        ? 'border-blue-400 ring-2 ring-blue-400 ring-offset-2 ring-offset-black'
                        : 'border-white/10'
                    }`}
                  >
                    {settings.backgroundColor === color && !settings.transparentBg && (
                      <Check className={`h-4 w-4 ${color === '#ffffff' ? 'text-black' : 'text-white'}`} />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Hex Color Input */}
            <div>
              <span className="block text-xs font-medium text-slate-300 mb-1">自訂 Hex 色號</span>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={settings.backgroundColor}
                  onChange={(e) =>
                    onSettingsChange({ ...settings, backgroundColor: e.target.value, transparentBg: false })
                  }
                  className="h-9 w-12 cursor-pointer rounded-lg border border-white/10 bg-[#141415] p-0.5"
                />
                <input
                  type="text"
                  value={settings.backgroundColor}
                  onChange={(e) =>
                    onSettingsChange({ ...settings, backgroundColor: e.target.value, transparentBg: false })
                  }
                  className="flex-1 rounded-lg border border-white/10 bg-[#141415] px-3 py-1.5 font-mono text-xs text-white focus:border-blue-500 focus:outline-none"
                  placeholder="#0f172a"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
