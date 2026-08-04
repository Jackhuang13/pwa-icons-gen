import React, { useState } from 'react';
import { Smartphone, Sparkles } from 'lucide-react';

interface DeviceSimulatorProps {
  previewDataUrl: string;
  maskableDataUrl: string;
  appName: string;
}

export const DeviceSimulator: React.FC<DeviceSimulatorProps> = ({
  previewDataUrl,
  maskableDataUrl,
  appName,
}) => {
  const [deviceTab, setDeviceTab] = useState<'android' | 'ios'>('android');
  const [androidShape, setAndroidShape] = useState<'circle' | 'squircle' | 'teardrop' | 'rounded'>('squircle');

  const displayTitle = appName || 'My PWA App';
  const activeIconSrc = maskableDataUrl || previewDataUrl;

  return (
    <div className="rounded-2xl border border-white/10 bg-[#141415] p-5 shadow-2xl space-y-5 min-w-0 w-full overflow-hidden">
      {/* Header & Device Filter Tabs */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-white/10 pb-4 min-w-0 w-full">
        <div>
          <h3 className="text-sm sm:text-base font-semibold text-white flex items-center gap-2 uppercase tracking-tight">
            <Sparkles className="h-4 w-4 text-blue-500" />
            跨裝置與系統圖示實時模擬器
          </h3>
          <p className="text-xs text-slate-400">
            預覽您的 PWA 圖示在 Android 與 iOS 手機系統的呈現效果
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex max-w-full overflow-x-auto no-scrollbar rounded-xl bg-[#0A0A0B] p-1 border border-white/10 text-xs font-medium shrink-0 min-w-0">
          <button
            onClick={() => setDeviceTab('android')}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 transition-all shrink-0 whitespace-nowrap ${
              deviceTab === 'android' ? 'bg-blue-600 text-white shadow font-semibold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Smartphone className="h-3.5 w-3.5" />
            Android
          </button>
          <button
            onClick={() => setDeviceTab('ios')}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 transition-all shrink-0 whitespace-nowrap ${
              deviceTab === 'ios' ? 'bg-blue-600 text-white shadow font-semibold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Smartphone className="h-3.5 w-3.5" />
            iOS
          </button>
        </div>
      </div>

      {/* Device Viewport Stage (CSS Selector 3 target) */}
      <div className="min-h-[280px] w-full flex items-center justify-center rounded-xl bg-[#0A0A0B] p-6 border border-white/10 min-w-0 overflow-hidden">
        {/* Android Launcher Simulator */}
        {deviceTab === 'android' && (
          <div className="flex flex-col items-center gap-5 w-full max-w-sm min-w-0">
            {/* Shape Chooser (CSS Selector 2 target) */}
            <div className="flex max-w-full overflow-x-auto no-scrollbar items-center gap-1.5 rounded-lg bg-[#141415] p-1 border border-white/10 text-xs text-slate-300 shrink-0 min-w-0">
              <span className="px-2 text-slate-500 font-mono text-[10px] uppercase shrink-0">OEM 遮罩:</span>
              {(['circle', 'squircle', 'teardrop', 'rounded'] as const).map((shape) => (
                <button
                  key={shape}
                  onClick={() => setAndroidShape(shape)}
                  className={`rounded-md px-2.5 py-1 text-[11px] capitalize transition-all shrink-0 whitespace-nowrap ${
                    androidShape === shape ? 'bg-blue-600 text-white font-semibold' : 'hover:bg-white/10'
                  }`}
                >
                  {shape}
                </button>
              ))}
            </div>

            {/* Android Launcher Home Screen Grid */}
            <div className="relative w-full rounded-3xl border-4 border-slate-800 bg-gradient-to-b from-blue-950/40 via-[#141415] to-[#0A0A0B] p-6 shadow-2xl">
              <div className="flex justify-between text-[10px] text-slate-400 font-mono mb-4 px-1">
                <span>10:42 AM</span>
                <span>5G 98%</span>
              </div>

              <div className="grid grid-cols-4 gap-4 text-center">
                {/* Mock Apps */}
                <div className="flex flex-col items-center gap-1 opacity-40">
                  <div className="h-14 w-14 rounded-full bg-slate-700" />
                  <span className="text-[10px] text-slate-300">Phone</span>
                </div>
                <div className="flex flex-col items-center gap-1 opacity-40">
                  <div className="h-14 w-14 rounded-2xl bg-blue-600" />
                  <span className="text-[10px] text-slate-300">Chrome</span>
                </div>

                {/* Target PWA App Icon */}
                <div className="flex flex-col items-center gap-1.5 group">
                  <div
                    className={`h-14 w-14 overflow-hidden shadow-xl transition-all duration-300 ring-2 ring-blue-500/50 ${
                      androidShape === 'circle'
                        ? 'rounded-full'
                        : androidShape === 'squircle'
                        ? 'rounded-[1.4rem]'
                        : androidShape === 'teardrop'
                        ? 'rounded-[1.4rem] rounded-tl-none'
                        : 'rounded-xl'
                    }`}
                  >
                    {activeIconSrc ? (
                      <img src={activeIconSrc} alt="PWA Icon Preview" className="h-full w-full object-cover" />
                    ) : (
                      <div className="h-full w-full bg-slate-800 animate-pulse" />
                    )}
                  </div>
                  <span className="truncate max-w-[64px] text-[11px] font-medium text-white group-hover:text-blue-400">
                    {displayTitle}
                  </span>
                </div>

                <div className="flex flex-col items-center gap-1 opacity-40">
                  <div className="h-14 w-14 rounded-full bg-emerald-600" />
                  <span className="text-[10px] text-slate-300">Photos</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* iOS Home Screen Simulator */}
        {deviceTab === 'ios' && (
          <div className="relative w-full max-w-sm rounded-3xl border-4 border-slate-800 bg-[#141415] p-6 shadow-2xl min-w-0">
            <div className="flex justify-between text-[10px] text-slate-300 font-sans mb-5 font-semibold">
              <span>9:41</span>
              <span>📶 🔋</span>
            </div>

            <div className="grid grid-cols-4 gap-4 text-center">
              <div className="flex flex-col items-center gap-1 opacity-30">
                <div className="h-14 w-14 rounded-[1.2rem] bg-emerald-500" />
                <span className="text-[10px] text-slate-200">Messages</span>
              </div>

              {/* iOS Target App */}
              <div className="flex flex-col items-center gap-1.5">
                <div className="h-14 w-14 overflow-hidden rounded-[1.2rem] shadow-xl ring-1 ring-white/10 bg-black">
                  {previewDataUrl ? (
                    <img src={previewDataUrl} alt="iOS App Icon" className="h-full w-full object-cover" />
                  ) : (
                    <div className="h-full w-full bg-slate-800 animate-pulse" />
                  )}
                </div>
                <span className="truncate max-w-[64px] text-[11px] font-medium text-white">
                  {displayTitle}
                </span>
              </div>

              <div className="flex flex-col items-center gap-1 opacity-30">
                <div className="h-14 w-14 rounded-[1.2rem] bg-sky-500" />
                <span className="text-[10px] text-slate-200">Safari</span>
              </div>
              <div className="flex flex-col items-center gap-1 opacity-30">
                <div className="h-14 w-14 rounded-[1.2rem] bg-red-500" />
                <span className="text-[10px] text-slate-200">Music</span>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
