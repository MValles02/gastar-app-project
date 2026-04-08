import cors from "cors";
import express from "express";
import { apiBasePath, healthResponseSchema } from "@gastar/shared";
import { env } from "./env";

export function createApp() {
  const app = express();

  app.use(
    cors({
      origin: env.WEB_ORIGIN,
      credentials: true,
    }),
  );
  app.use(express.json());

  app.get(`${apiBasePath}/health`, (_request, response) => {
    response.status(200).json(
      healthResponseSchema.parse({
        data: {
          status: "ok",
          message: "Gastar API bootstrap ready",
        },
      }),
    );
  });

  app.use((_request, response) => {
    response.status(404).json({
      error: {
        code: "NOT_FOUND",
        message: "Route not found.",
      },
    });
  });

  return app;
}
