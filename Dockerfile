FROM node:24-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
ARG APP_VERSION
ENV NEXT_PUBLIC_APP_VERSION=$APP_VERSION
WORKDIR /app

FROM base AS build
ENV CI=true
COPY . /app
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile --no-verify-store-integrity
RUN pnpm run build

FROM base

COPY --from=build /app/dist/standalone /app
COPY --from=build /app/dist/static /app/dist/static
COPY --from=build /app/public /app/public

EXPOSE 3000

CMD [ "node", "server.js" ]
