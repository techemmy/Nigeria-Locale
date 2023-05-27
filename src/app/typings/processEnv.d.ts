declare namespace NodeJS {
  export interface ProcessEnv {
    PORT: string
    MONGO_URI: string
    JWT_SECRET: string
  }
}
