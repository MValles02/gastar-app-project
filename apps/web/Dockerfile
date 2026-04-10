FROM node:20-alpine AS build

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

ARG VITE_APP_ENV=production
ARG VITE_API_BASE_URL=/api/v1
ARG VITE_GOOGLE_OAUTH_CLIENT_ID=replace-google-client-id

ENV VITE_APP_ENV="$VITE_APP_ENV"
ENV VITE_API_BASE_URL="$VITE_API_BASE_URL"
ENV VITE_GOOGLE_OAUTH_CLIENT_ID="$VITE_GOOGLE_OAUTH_CLIENT_ID"

RUN corepack enable

WORKDIR /app

COPY package.json pnpm-workspace.yaml pnpm-lock.yaml tsconfig.base.json ./
COPY apps/web/package.json apps/web/package.json
COPY packages/shared/package.json packages/shared/package.json

RUN pnpm install --frozen-lockfile

COPY apps/web apps/web
COPY packages/shared packages/shared

RUN pnpm --filter @gastar/shared build && pnpm --filter @gastar/web build

FROM nginx:1.27-alpine

COPY apps/web/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/apps/web/dist /usr/share/nginx/html

EXPOSE 80
