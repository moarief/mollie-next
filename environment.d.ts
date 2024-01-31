declare namespace NodeJS {
  export interface ProcessEnv {
    readonly ENV_VARIABLE: string;
    readonly MONDU_API_KEY: string;
  }
}