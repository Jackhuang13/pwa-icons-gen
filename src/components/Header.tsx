import React, { useState } from 'react';
import { Layers, Sparkles, HelpCircle, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  onOpenPresets: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenPresets }) => {
  const [showInfoModal, setShowInfoModal] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-[#0A0A0B]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8 min-w-0 gap-3">
          {/* Brand Logo & Name */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-white shadow-lg shadow-blue-600/20">
              <Layers className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-base sm:text-lg font-bold tracking-tight text-white uppercase truncate">
                  PWA Icons Gen
                </h1>
                <span className="inline-flex items-center rounded bg-blue-500/10 px-2 py-0.5 text-[10px] font-mono text-blue-400 border border-blue-500/20 shrink-0">
                  v{__APP_VERSION__}
                </span>
              </div>
              <p className="hidden text-xs text-slate-400 sm:block truncate">
                全套 PWA 圖像裁切、Safe-zone 預覽與 Manifest 生成器
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              onClick={onOpenPresets}
              className="flex items-center gap-1.5 rounded-lg border border-blue-500/30 bg-blue-950/40 px-3 py-1.5 text-xs font-semibold text-blue-300 hover:bg-blue-900/60 hover:text-white transition-all shadow-sm shrink-0 whitespace-nowrap"
            >
              <Sparkles className="h-3.5 w-3.5 text-blue-400" />
              <span className="hidden sm:inline">圖示範本</span>
              <span className="sm:hidden">範本</span>
            </button>

            <button
              onClick={() => setShowInfoModal(true)}
              className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-[#141415] px-3 py-1.5 text-xs font-medium text-slate-300 hover:bg-white/10 hover:text-white transition-all shrink-0 whitespace-nowrap"
              title="檢視 PWA 圖示規範"
            >
              <HelpCircle className="h-4 w-4 text-blue-400" />
              <span className="hidden md:inline">規範說明</span>
            </button>
          </div>
        </div>
      </header>

      {/* Info Modal */}
      <AnimatePresence>
        {showInfoModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-xl rounded-2xl border border-white/10 bg-[#141415] p-6 shadow-2xl text-slate-200"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-blue-400" />
                  <h3 className="text-base font-bold text-white uppercase tracking-tight">W3C PWA 圖示最佳化規範</h3>
                </div>
                <button
                  onClick={() => setShowInfoModal(false)}
                  className="rounded-lg p-1 text-slate-400 hover:bg-white/10 hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>

              <div className="mt-4 space-y-3 text-xs text-slate-300">
                <div className="rounded-xl border border-blue-500/20 bg-blue-950/20 p-3.5">
                  <h4 className="font-semibold text-blue-300 flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-blue-400" />
                    標準圖示 (purpose: "any")
                  </h4>
                  <p className="mt-1 text-[11px] text-slate-300 leading-relaxed">
                    必須包含 <strong>192x192</strong> 與 <strong>512x512</strong> PNG 格式，用於 Chrome/Android 應用程式清單、啟動圖示與 Splash Screen。支援 alpha 透明背景。
                  </p>
                </div>

                <div className="rounded-xl border border-amber-500/20 bg-amber-950/20 p-3.5">
                  <h4 className="font-semibold text-amber-300 flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-amber-400" />
                    遮罩圖示 (purpose: "maskable")
                  </h4>
                  <p className="mt-1 text-[11px] text-slate-300 leading-relaxed">
                    Android 8.0+ 自適應形狀圖示。核心主體必須保持在中間 <strong>40% 安全圓形區域 (Safe Zone)</strong> 內，避免被不同手機品牌系統外框切到。
                  </p>
                </div>

                <div className="rounded-xl border border-white/10 bg-[#0A0A0B] p-3.5">
                  <h4 className="font-semibold text-white flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-sky-400" />
                    Apple Touch Icon & Favicons
                  </h4>
                  <p className="mt-1 text-[11px] text-slate-400 leading-relaxed">
                    iOS 要求 <strong>180x180</strong> apple-touch-icon.png (不建議透明度)，以及 16x16 / 32x32 Favicon 供桌面瀏覽器頁籤使用。
                  </p>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setShowInfoModal(false)}
                  className="rounded-lg bg-blue-600 px-5 py-2 text-xs font-semibold text-white hover:bg-blue-500 transition-colors shadow-md shadow-blue-600/30"
                >
                  我知道了
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
