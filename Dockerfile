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

RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    pnpm install --frozen-lockfile --ignore-scripts && \
    pnpm rebuild msw sharp unrs-resolver

RUN pnpm run build

FROM base

ENV PORT=3000
ENV HOSTNAME=0.0.0.0

RUN npm i pm2 -g

COPY --from=build /app/dist/standalone /app
COPY --from=build /app/dist/static /app/dist/static
COPY --from=build /app/public /app/public
COPY --from=build /app/ecosystem.config.js /app/ecosystem.config.js

EXPOSE 3000

ARG PB_VERSION=0.38.0

RUN apt-get update && apt-get install -y unzip

ADD https://github.com/pocketbase/pocketbase/releases/download/v${PB_VERSION}/pocketbase_${PB_VERSION}_linux_amd64.zip /tmp/pb.zip
RUN unzip /tmp/pb.zip -d /pb/

COPY --from=build /app/migrations /pb/pb_migrations

EXPOSE 8090

ENV POCKET_BASE_URL=http://127.0.0.1:8090

#ARG PB_ADMIN_USER=default@default.local
#ARG PB_ADMIN_PASS=changeit

VOLUME /data

#RUN /pb/pocketbase superuser upsert ${PB_ADMIN_USER} ${PB_ADMIN_PASS}

CMD [ "pm2-runtime", "start", "ecosystem.config.js" ]
