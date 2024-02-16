/// <reference types="vite/client" />

/**
 * Define System Environment Variables from the .env
 * IMPORTANT: Only vars starting with "VITE_" are available in the app
 */
interface ImportMetaEnv {
  readonly VITE_AZURE_ORG_URL: string;
  readonly VITE_AZURE_PERSONA_ACCESS_TOKEN: string;
  readonly VITE_AZURE_PROJECT: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
