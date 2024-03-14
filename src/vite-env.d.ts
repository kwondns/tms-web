/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_API_SERVER_URL: string;
  readonly VITE_IMAGE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
