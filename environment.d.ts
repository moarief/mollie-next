declare namespace NodeJS {
  export interface ProcessEnv {
    readonly ENV_VARIABLE: string;
    readonly MOLLIE_API_KEY: string;
    readonly DOMAIN: string;
    readonly SHIPMONDO_AUTH_URL: string;
    readonly SHIPMONDO_API_KEY: string;
  }
}
