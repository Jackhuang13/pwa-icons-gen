import React, { useRef, useState, useEffect } from 'react';
import { Upload, Clipboard, Sparkles, ChevronDown, ChevronRight } from 'lucide-react';
import { PRESET_TEMPLATES } from '../utils/constants';

interface ImageUploaderProps {
  onImageSelected: (source: string | File, bgColor?: string) => void;
  currentImageLoaded: boolean;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  onImageSelected,
  currentImageLoaded,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [pasteNotice, setPasteNotice] = useState<string | null>(null);
  const [isPresetsOpen, setIsPresetsOpen] = useState(false);

  // Handle global paste event (Ctrl+V)
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;

      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
          const file = items[i].getAsFile();
          if (file) {
            onImageSelected(file);
            showNotice('已成功貼上剪貼簿圖片！');
            break;
          }
        }
      }
    };

    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, [onImageSelected]);

  const showNotice = (msg: string) => {
    setPasteNotice(msg);
    setTimeout(() => setPasteNotice(null), 3000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageSelected(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      onImageSelected(file);
    }
  };

  const handleClipboardClick = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.read) {
        const items = await navigator.clipboard.read();
        for (const item of items) {
          const imageType = item.types.find((t) => t.startsWith('image/'));
          if (imageType) {
            const blob = await item.getType(imageType);
            const file = new File([blob], 'clipboard-image.png', { type: imageType });
            onImageSelected(file);
            showNotice('從剪貼簿讀取圖片成功！');
            return;
          }
        }
      }
      showNotice('剪貼簿中未偵測到圖片檔，請按 Ctrl+V 貼上');
    } catch {
      showNotice('請按鍵盤 Ctrl + V 貼上圖片');
    }
  };

  return (
    <div className="space-y-4 min-w-0 w-full">
      {/* Main Drag and Drop Upload Area */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`group relative flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-8 text-center transition-all duration-200 min-w-0 ${
          isDragging
            ? 'border-blue-500 bg-blue-950/30 scale-[1.01]'
            : 'border-white/10 bg-[#141415] hover:border-blue-500/50 hover:bg-[#141415]/80'
        }`}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/png,image/jpeg,image/webp,image/svg+xml"
          className="hidden"
        />

        <div className="flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-dashed border-blue-500/40 bg-blue-500/10 text-blue-500 group-hover:scale-110 group-hover:bg-blue-500/20 transition-all duration-200 shadow-inner">
          <Upload className="h-8 w-8" />
        </div>

        <h3 className="mt-4 text-base font-semibold text-slate-100 uppercase tracking-tight">
          點擊上傳 或 將圖像拖曳至此處
        </h3>

        <p className="mt-1 text-xs text-slate-400">
          支援 PNG, JPG, WebP, SVG 向量圖 (自動精確向量繪製)
        </p>

        {/* Action Bar */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2" onClick={(e) => e.stopPropagation()}>
          <button
            type="button"
            onClick={handleClipboardClick}
            className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-[#0A0A0B] px-3.5 py-1.5 text-xs font-medium text-slate-200 hover:border-blue-500/50 hover:bg-white/10 transition-colors shadow-sm shrink-0 whitespace-nowrap"
          >
            <Clipboard className="h-3.5 w-3.5 text-blue-400" />
            貼上剪貼簿 (Ctrl+V)
          </button>

          <span className="text-xs text-slate-500">或選用下面向量範本</span>
        </div>

        {pasteNotice && (
          <div className="absolute top-3 left-1/2 -translate-x-1/2 rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white shadow-lg animate-fade-in">
            {pasteNotice}
          </div>
        )}
      </div>

      {/* Built-in Preset Templates */}
      <div className="min-w-0 w-full rounded-xl border border-white/10 bg-[#141415] overflow-hidden transition-all">
        <button
          type="button"
          onClick={() => setIsPresetsOpen(!isPresetsOpen)}
          className="w-full flex items-center justify-between p-3 text-left hover:bg-white/5 transition-colors cursor-pointer"
        >
          <span className="text-xs font-mono uppercase tracking-wider text-slate-300 flex items-center gap-1.5 font-semibold">
            <Sparkles className="h-3.5 w-3.5 text-blue-400" />
            內建設計向量圖示範本 ({PRESET_TEMPLATES.length} 個範本)
          </span>
          <div className="flex items-center gap-1 text-slate-400 text-xs font-sans">
            <span>{isPresetsOpen ? '收起' : '展開選用'}</span>
            {isPresetsOpen ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </div>
        </button>

        {isPresetsOpen && (
          <div className="p-3 pt-0 border-t border-white/5">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-3">
              {PRESET_TEMPLATES.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => onImageSelected(preset.svgString, preset.bgColor)}
                  className="group flex flex-col items-center gap-2 rounded-xl border border-white/10 bg-[#0A0A0B] p-2.5 text-left transition-all hover:border-blue-500/50 hover:bg-[#1c1c1e] hover:scale-[1.02] shadow-sm cursor-pointer"
                >
                  <div
                    className="h-12 w-12 shrink-0 flex items-center justify-center overflow-hidden rounded-xl bg-black/20 p-1 shadow-md transition-transform group-hover:scale-105 [&>svg]:w-full [&>svg]:h-full [&>svg]:max-w-full [&>svg]:max-h-full [&>svg]:block"
                    dangerouslySetInnerHTML={{ __html: preset.svgString }}
                  />
                  <div className="w-full text-center min-w-0">
                    <p className="truncate text-xs font-semibold text-slate-200">{preset.name}</p>
                    <p className="truncate text-[10px] text-slate-400 font-mono">{preset.category}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
