/// <reference types="vite/client" />

/**
 * Define System Environment Variables from the .env
 * IMPORTANT: Only vars starting with "VITE_" are available in the app
 */
interface ImportMetaEnv {
  readonly VITE_AZURE_ACCESS_TOKEN: string;
  readonly VITE_AZURE_PROJECT: string;
  readonly VITE_AZURE_URL: string;
  readonly VITE_SNYK_ACCESS_TOKEN: string;
  readonly VITE_SNYK_PROJECT: string;
  readonly VITE_SNYK_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
