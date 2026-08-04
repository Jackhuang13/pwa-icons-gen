import React, { useState } from 'react';
import { ManifestConfig } from '../types';
import { Copy, Check, Code, FileText, Sliders, Sparkles } from 'lucide-react';

interface ManifestPreviewProps {
  config: ManifestConfig;
  onChangeConfig: (newConfig: ManifestConfig) => void;
}


function escapeHtml(unsafe: string): string {
  if (!unsafe) return '';
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export const ManifestPreview: React.FC<ManifestPreviewProps> = ({
  config,
  onChangeConfig,
}) => {
  const [activeTab, setActiveTab] = useState<'manifest' | 'html' | 'settings'>('manifest');
  const [copiedSnippet, setCopiedSnippet] = useState<'manifest' | 'html' | null>(null);

  // Generate Manifest JSON text
  const manifestObject = {
    name: config.name || 'PWA App',
    short_name: config.shortName || 'PWA',
    description: config.description || 'Modern Progressive Web Application',
    theme_color: config.themeColor || '#4f46e5',
    background_color: config.backgroundColor || '#0f172a',
    display: config.display || 'standalone',
    orientation: config.orientation || 'any',
    start_url: config.startUrl || '/',
    scope: config.scope || '/',
    icons: [
      {
        src: 'pwa-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: 'pwa-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: 'pwa-maskable-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: 'pwa-maskable-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: 'apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
        purpose: 'any',
      },
    ],
    shortcuts: [
      {
        name: '開啟首頁',
        short_name: '首頁',
        description: '快速返回應用程式首頁',
        url: '/',
        icons: [{ src: 'pwa-192x192.png', sizes: '192x192' }],
      },
    ],
  };

  const manifestJsonString = JSON.stringify(manifestObject, null, 2);

  // Generate HTML Header Snippet
  const htmlSnippet = `<!-- PWA Meta & Favicon Tags -->
<link rel="manifest" href="/manifest.webmanifest" />
<meta name="theme-color" content="${escapeHtml(config.themeColor)}" />
<meta name="mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
<meta name="apple-mobile-web-app-title" content="${escapeHtml(config.shortName || config.name)}" />

<!-- Apple Touch Icon -->
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />

<!-- Desktop Favicons -->
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
<link rel="shortcut icon" href="/favicon.ico" />`;

  const copyToClipboard = (text: string, type: 'manifest' | 'html') => {
    navigator.clipboard.writeText(text);
    setCopiedSnippet(type);
    setTimeout(() => setCopiedSnippet(null), 2500);
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-[#141415] p-5 shadow-2xl space-y-4 min-w-0 w-full overflow-hidden">
      {/* Tab Switcher & Title */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-white/10 pb-3 min-w-0 w-full">
        <div>
          <h3 className="text-sm sm:text-base font-semibold text-white flex items-center gap-2 uppercase tracking-tight">
            <Code className="h-4 w-4 text-blue-500" />
            Manifest & HTML 引入程式碼生成器
          </h3>
          <p className="text-xs text-slate-400">
            產生可直接貼入 Web App 專案的 `manifest.json` 與 HTML &lt;head&gt; 標籤
          </p>
        </div>

        <div className="flex max-w-full overflow-x-auto no-scrollbar rounded-xl bg-[#0A0A0B] p-1 border border-white/10 text-xs font-semibold shrink-0 min-w-0">
          <button
            onClick={() => setActiveTab('manifest')}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 transition-all shrink-0 whitespace-nowrap ${
              activeTab === 'manifest' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileText className="h-3.5 w-3.5" />
            manifest.json
          </button>
          <button
            onClick={() => setActiveTab('html')}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 transition-all shrink-0 whitespace-nowrap ${
              activeTab === 'html' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Code className="h-3.5 w-3.5" />
            HTML &lt;head&gt;
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 transition-all shrink-0 whitespace-nowrap ${
              activeTab === 'settings' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sliders className="h-3.5 w-3.5" />
            設定 Manifest
          </button>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'manifest' && (
        <div className="relative">
          <div className="absolute top-3 right-3 z-10">
            <button
              onClick={() => copyToClipboard(manifestJsonString, 'manifest')}
              className="flex items-center gap-1.5 rounded-lg bg-[#141415] border border-white/10 px-3 py-1.5 text-xs font-medium text-slate-200 hover:bg-white/10 transition-colors shadow-md"
            >
              {copiedSnippet === 'manifest' ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                  <span className="text-emerald-400">已複製 JSON</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5 text-blue-400" />
                  <span>複製 manifest.json</span>
                </>
              )}
            </button>
          </div>

          <pre className="max-h-80 overflow-y-auto rounded-xl border border-white/10 bg-[#0A0A0B] p-4 font-mono text-xs text-blue-400/90 shadow-inner">
            <code>{manifestJsonString}</code>
          </pre>
        </div>
      )}

      {activeTab === 'html' && (
        <div className="relative">
          <div className="absolute top-3 right-3 z-10">
            <button
              onClick={() => copyToClipboard(htmlSnippet, 'html')}
              className="flex items-center gap-1.5 rounded-lg bg-[#141415] border border-white/10 px-3 py-1.5 text-xs font-medium text-slate-200 hover:bg-white/10 transition-colors shadow-md"
            >
              {copiedSnippet === 'html' ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                  <span className="text-emerald-400">已複製 HTML</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5 text-blue-400" />
                  <span>複製 HTML 標籤</span>
                </>
              )}
            </button>
          </div>

          <pre className="max-h-80 overflow-y-auto rounded-xl border border-white/10 bg-[#0A0A0B] p-4 font-mono text-xs text-emerald-400/90 shadow-inner">
            <code>{htmlSnippet}</code>
          </pre>
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 rounded-xl border border-white/10 bg-[#0A0A0B] p-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">App 完整名稱 (Name)</label>
            <input
              type="text"
              value={config.name}
              onChange={(e) => onChangeConfig({ ...config, name: e.target.value })}
              className="w-full rounded-lg border border-white/10 bg-[#141415] px-3 py-1.5 text-xs text-white focus:border-blue-500 focus:outline-none"
              placeholder="PWA 圖示產生器"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">App 簡稱 (Short Name)</label>
            <input
              type="text"
              value={config.shortName}
              onChange={(e) => onChangeConfig({ ...config, shortName: e.target.value })}
              className="w-full rounded-lg border border-white/10 bg-[#141415] px-3 py-1.5 text-xs text-white focus:border-blue-500 focus:outline-none"
              placeholder="PWA Icons"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">主題色彩 (Theme Color)</label>
            <div className="flex gap-2">
              <input
                type="color"
                value={config.themeColor}
                onChange={(e) => onChangeConfig({ ...config, themeColor: e.target.value })}
                className="h-8 w-10 cursor-pointer rounded-lg border border-white/10 bg-[#141415] p-0.5"
              />
              <input
                type="text"
                value={config.themeColor}
                onChange={(e) => onChangeConfig({ ...config, themeColor: e.target.value })}
                className="flex-1 rounded-lg border border-white/10 bg-[#141415] px-3 py-1.5 font-mono text-xs text-white focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">背景色彩 (Background Color)</label>
            <div className="flex gap-2">
              <input
                type="color"
                value={config.backgroundColor}
                onChange={(e) => onChangeConfig({ ...config, backgroundColor: e.target.value })}
                className="h-8 w-10 cursor-pointer rounded-lg border border-white/10 bg-[#141415] p-0.5"
              />
              <input
                type="text"
                value={config.backgroundColor}
                onChange={(e) => onChangeConfig({ ...config, backgroundColor: e.target.value })}
                className="flex-1 rounded-lg border border-white/10 bg-[#141415] px-3 py-1.5 font-mono text-xs text-white focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
