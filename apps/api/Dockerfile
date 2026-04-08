FROM node:20-alpine

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable

WORKDIR /app

COPY package.json pnpm-workspace.yaml pnpm-lock.yaml tsconfig.base.json ./
COPY apps/api apps/api
COPY packages/shared packages/shared

RUN pnpm install --frozen-lockfile --prod=false
RUN pnpm --filter @gastar/shared build && pnpm --filter @gastar/api build

WORKDIR /app/apps/api

ENV NODE_ENV=production

EXPOSE 3000

CMD ["sh", "./scripts/start-production.sh"]
