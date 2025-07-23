/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL_PROD: string;
  // otras variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
