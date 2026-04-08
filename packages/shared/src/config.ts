import { z } from "zod";

export const appEnvironments = ["local", "development", "production"] as const;

export const appEnvironmentSchema = z.enum(appEnvironments);

export const apiBasePath = "/api/v1";

export const appMetadata = {
  name: "Gastar App",
  apiBasePath,
  supportedCurrencies: ["ARS", "USD"] as const,
};
