/// <reference types="vite/client" />

declare const __APP_VERSION__: string;

declare module 'virtual:pwa-register/react' {
  import type { RegisterSWOptions } from 'vite-plugin-pwa/types';

  export function useRegisterSW(options?: RegisterSWOptions): {
    needRefresh: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
    offlineReady: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
    updateServiceWorker: (reloadPage?: boolean) => Promise<void>;
  };
}
