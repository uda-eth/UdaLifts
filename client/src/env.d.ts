/// <reference types="vite/client" />

interface ImportMetaEnv {
  // Add environment variables as needed
  readonly VITE_STRIPE_PUBLIC_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
