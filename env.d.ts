export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production";
      MONGO_DEV_URI: string
      NEXT_AUTH_DEV_SECRET: string
      NEXT_AUTH_SECRET: string
      NEXT_PUBLIC_DEV_DOMAIN: string
      NEXT_PUBLIC_DOMAIN: string
      MONGO_USERNAME: string
      MONGO_PASSWORD: string
      MONGO_HOST: string
    }
  }
}