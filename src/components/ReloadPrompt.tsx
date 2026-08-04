import React from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';
import { motion, AnimatePresence } from 'motion/react';
import { RefreshCw, X, Sparkles, ShieldCheck } from 'lucide-react';

/**
 * Version update notification prompt component for PWA Service Worker.
 * Listens for new Service Worker registration and prompts user to reload.
 */
export const ReloadPrompt: React.FC = () => {
  // Safe version fallback if __APP_VERSION__ is evaluated
  const appVersion = typeof __APP_VERSION__ !== 'undefined' ? __APP_VERSION__ : '1.0.0';

  const {
    needRefresh: [needRefresh, setNeedRefresh],
    offlineReady: [offlineReady, setOfflineReady],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(r) {
      // Log SW registration in development console
      if (import.meta.env.DEV) {
        console.log('SW Registered:', r);
      }
    },
    onRegisterError(error) {
      console.error('SW Registration error:', error);
    },
  });

  const closeToast = () => {
    setOfflineReady(false);
    setNeedRefresh(false);
  };

  const handleUpdate = () => {
    updateServiceWorker(true);
  };

  return (
    <AnimatePresence>
      {(needRefresh || offlineReady) && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="fixed bottom-6 right-6 z-50 max-w-md rounded-2xl border border-indigo-500/30 bg-slate-900/95 p-5 shadow-2xl backdrop-blur-md text-slate-100 ring-1 ring-white/10"
          role="alert"
          aria-live="polite"
        >
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/30">
              {needRefresh ? <RefreshCw className="h-6 w-6 animate-spin-slow" /> : <ShieldCheck className="h-6 w-6" />}
            </div>

            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-2">
                <h4 className="font-semibold text-slate-100">
                  {needRefresh ? '發現應用程式更新' : '已可離線存取'}
                </h4>
                <span className="inline-flex items-center gap-1 rounded-full bg-indigo-500/20 px-2 py-0.5 text-xs font-mono font-medium text-indigo-300 border border-indigo-500/30">
                  <Sparkles className="h-3 w-3" />
                  v{appVersion}
                </span>
              </div>

              <p className="text-sm text-slate-300">
                {needRefresh
                  ? `發現新版本 v${appVersion}，是否立即更新取得最新 PWA 功能與修正？`
                  : 'PWA 已成功快取相關資源，現在支援全功能離線操作！'}
              </p>
            </div>

            <button
              onClick={closeToast}
              className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-slate-200 transition-colors"
              title="關閉提示"
              aria-label="關閉提示"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="mt-4 flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
            <button
              onClick={closeToast}
              className="rounded-lg px-3.5 py-1.5 text-xs font-medium text-slate-300 hover:bg-slate-800 transition-colors"
            >
              暫時關閉
            </button>
            {needRefresh && (
              <button
                onClick={handleUpdate}
                className="flex items-center gap-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 px-4 py-1.5 text-xs font-semibold text-white shadow-md shadow-indigo-600/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                立即更新
              </button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
