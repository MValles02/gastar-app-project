import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { config as loadEnv } from "dotenv";
import { appEnvironmentSchema } from "@gastar/shared";
import { z } from "zod";

const currentDir = path.dirname(fileURLToPath(import.meta.url));
const localEnvFile = path.resolve(currentDir, "../../../.env.api.local");

if (existsSync(localEnvFile)) {
  loadEnv({ path: localEnvFile });
}

const envSchema = z.object({
  NODE_ENV: appEnvironmentSchema.default("local"),
  PORT: z.coerce.number().int().positive().default(3000),
  DATABASE_URL: z.string().url(),
  WEB_ORIGIN: z.string().url(),
  GOOGLE_OAUTH_CLIENT_ID: z.string().min(1),
  ACCESS_TOKEN_SECRET: z.string().min(1),
  REFRESH_TOKEN_SECRET: z.string().min(1),
  COOKIE_SECURE: z
    .union([z.boolean(), z.enum(["true", "false"])])
    .transform((value) =>
      typeof value === "boolean" ? value : value === "true",
    )
    .default(false),
});

export const env = envSchema.parse(process.env);
