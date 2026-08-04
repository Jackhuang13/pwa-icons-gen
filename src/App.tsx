import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { ReloadPrompt } from './components/ReloadPrompt';
import { ImageUploader } from './components/ImageUploader';
import { ImageEditorCanvas } from './components/ImageEditorCanvas';
import { DeviceSimulator } from './components/DeviceSimulator';
import { ManifestPreview } from './components/ManifestPreview';
import { ExportPanel } from './components/ExportPanel';

import { CropSettings, ManifestConfig, ExportItem } from './types';
import { STANDARD_ICON_SPECS, PRESET_TEMPLATES } from './utils/constants';
import { loadImageSource, generateExportItem } from './utils/imageProcess';

import { Sparkles, Sliders, Smartphone, Code, Package, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  // Current loaded image source (File or SVG string or DataURL)
  const [imageSource, setImageSource] = useState<string | File>(PRESET_TEMPLATES[0].svgString);
  const [imageElement, setImageElement] = useState<HTMLImageElement | null>(null);

  // Editor crop & filter settings
  const [cropSettings, setCropSettings] = useState<CropSettings>({
    zoom: 1,
    rotation: 0,
    offsetX: 0,
    offsetY: 0,
    backgroundColor: PRESET_TEMPLATES[0].bgColor || '#4f46e5',
    transparentBg: false,
    paddingPercent: 20,
    safeZoneVisible: true,
    activeFilter: 'none',
  });

  // Manifest options
  const [manifestConfig, setManifestConfig] = useState<ManifestConfig>({
    name: 'PWA 圖示產生器',
    shortName: 'PWA Icons',
    description: '強大專業的 PWA 圖像裁切與圖示生成工具',
    themeColor: '#4f46e5',
    backgroundColor: '#0f172a',
    display: 'standalone',
    orientation: 'any',
    startUrl: '/',
    scope: '/',
    dir: 'auto',
    lang: 'zh-TW',
  });

  // Export Items list
  const [exportItems, setExportItems] = useState<ExportItem[]>([]);
  const [isGeneratingIcons, setIsGeneratingIcons] = useState(false);
  const [showPresetModal, setShowPresetModal] = useState(false);

  // Load HTMLImageElement whenever imageSource changes
  useEffect(() => {
    let isMounted = true;
    setIsGeneratingIcons(true);

    loadImageSource(imageSource)
      .then((img) => {
        if (isMounted) {
          setImageElement(img);
        }
      })
      .catch((err) => {
        console.error('載入圖像失敗:', err);
      })
      .finally(() => {
        if (isMounted) setIsGeneratingIcons(false);
      });

    return () => {
      isMounted = false;
    };
  }, [imageSource]);

  // Re-generate all export icon items whenever imageElement or cropSettings change
  const rebuildExportItems = useCallback(async () => {
    if (!imageElement) return;

    setIsGeneratingIcons(true);
    try {
      const items: ExportItem[] = [];
      for (const spec of STANDARD_ICON_SPECS) {
        // Keep user's existing selection state if item exists
        const item = await generateExportItem(imageElement, spec, cropSettings);
        items.push(item);
      }
      setExportItems(items);
    } catch (err) {
      console.error('生成圖示失敗:', err);
    } finally {
      setIsGeneratingIcons(false);
    }
  }, [imageElement, cropSettings]);

  useEffect(() => {
    rebuildExportItems();
  }, [rebuildExportItems]);

  // Toggle selection state for an export item
  const handleToggleItem = (id: string) => {
    setExportItems((prev) =>
      prev.map((item) => (item.spec.id === id ? { ...item, selected: !item.selected } : item))
    );
  };

  const handleToggleSelectAll = (selectAll: boolean) => {
    setExportItems((prev) => prev.map((item) => ({ ...item, selected: selectAll })));
  };

  // Preview Data URLs for device simulator
  const previewDataUrl = exportItems.find((i) => i.spec.id === 'pwa-192')?.dataUrl || '';
  const maskableDataUrl = exportItems.find((i) => i.spec.id === 'pwa-maskable-192')?.dataUrl || '';

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-slate-100 font-sans selection:bg-blue-600 selection:text-white pb-12">
      {/* Header */}
      <Header onOpenPresets={() => setShowPresetModal(true)} />

      {/* Main Container */}
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 space-y-8 min-w-0">
        {/* Step 1: Image Upload & Preset Selector */}
        <section className="space-y-3 min-w-0">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white shadow-md">
              1
            </span>
            <h2 className="text-sm sm:text-base font-bold text-white uppercase tracking-tight">選擇或上傳來源圖像</h2>
          </div>

          <ImageUploader
            onImageSelected={(source, bgColor) => {
              setImageSource(source);
              if (bgColor) {
                setCropSettings((prev) => ({ ...prev, backgroundColor: bgColor }));
              }
            }}
            currentImageLoaded={!!imageElement}
          />
        </section>

        {/* Step 2: Editor Canvas & Safe-Zone Controls */}
        <section className="space-y-3 min-w-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white shadow-md">
                2
              </span>
              <h2 className="text-sm sm:text-base font-bold text-white uppercase tracking-tight">圖像裁切、Safe-zone 與背景設定</h2>
            </div>
            {isGeneratingIcons && (
              <span className="flex items-center gap-1.5 text-xs text-blue-400 animate-pulse font-mono">
                <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                更新圖示產物中...
              </span>
            )}
          </div>

          <ImageEditorCanvas
            imageElement={imageElement}
            settings={cropSettings}
            onSettingsChange={(newSettings) => setCropSettings(newSettings)}
          />
        </section>

        {/* Step 3: Cross Device Simulation Preview */}
        <section className="space-y-3 min-w-0">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white shadow-md">
              3
            </span>
            <h2 className="text-sm sm:text-base font-bold text-white uppercase tracking-tight font-sans">跨系統與裝置實時預覽</h2>
          </div>

          <DeviceSimulator
            previewDataUrl={previewDataUrl}
            maskableDataUrl={maskableDataUrl}
            appName={manifestConfig.name}
          />
        </section>

        {/* Step 4: Manifest & HTML Snippet Generator */}
        <section className="space-y-3 min-w-0">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white shadow-md">
              4
            </span>
            <h2 className="text-sm sm:text-base font-bold text-white uppercase tracking-tight font-sans">Web App Manifest 與 HTML Snippet</h2>
          </div>

          <ManifestPreview
            config={manifestConfig}
            onChangeConfig={(newConfig) => setManifestConfig(newConfig)}
          />
        </section>

        {/* Step 5: Export & Download Bundle Zip */}
        <section className="space-y-3 min-w-0">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white shadow-md">
              5
            </span>
            <h2 className="text-sm sm:text-base font-bold text-white uppercase tracking-tight font-sans">生成圖示清單與一鍵打包下載</h2>
          </div>

          <ExportPanel
            exportItems={exportItems}
            manifestConfig={manifestConfig}
            onToggleItem={handleToggleItem}
            onToggleSelectAll={handleToggleSelectAll}
          />
        </section>
      </main>

      {/* Preset Modal */}
      <AnimatePresence>
        {showPresetModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-2xl rounded-2xl border border-white/10 bg-[#141415] p-6 shadow-2xl text-slate-200"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-blue-400" />
                  <h3 className="text-base font-bold text-white uppercase tracking-tight">選用內建設計向量圖示</h3>
                </div>
                <button
                  onClick={() => setShowPresetModal(false)}
                  className="rounded-lg p-1 text-slate-400 hover:bg-white/10 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-4 max-w-lg mx-auto">
                {PRESET_TEMPLATES.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => {
                      setImageSource(preset.svgString);
                      if (preset.bgColor) {
                        setCropSettings((prev) => ({ ...prev, backgroundColor: preset.bgColor || prev.backgroundColor }));
                      }
                      setShowPresetModal(false);
                    }}
                    className="flex flex-col items-center gap-2 rounded-xl border border-white/10 bg-[#0A0A0B] p-4 hover:border-blue-500 hover:bg-[#1c1c1e] transition-all text-center group"
                  >
                    <div
                      className="h-16 w-16 overflow-hidden rounded-xl p-1 shadow-md group-hover:scale-110 transition-transform"
                      dangerouslySetInnerHTML={{ __html: preset.svgString }}
                    />
                    <div>
                      <h4 className="text-xs font-bold text-white">{preset.name}</h4>
                      <p className="text-[10px] text-slate-400 font-mono">{preset.category}</p>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* PWA Service Worker Reload Prompt Toast */}
      <ReloadPrompt />
    </div>
  );
}
