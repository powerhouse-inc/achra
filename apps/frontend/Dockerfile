# syntax=docker/dockerfile:1
# Fusion image for apps/frontend (see docs: Fusion apps on vetra.io).
# Build from the repo root:
#   docker build -f apps/frontend/Dockerfile -t cr.vetra.io/achra/frontend:local .
#
# NEXT_PUBLIC_* values are NOT baked in: the app is built with the placeholder
# __NEXT_PUBLIC_<NAME>__ and docker/ph-fusion-entrypoint.sh swaps in the
# container's env vars at start, so one image serves every environment.

ARG NODE_IMAGE=node:24-alpine

FROM ${NODE_IMAGE} AS build
WORKDIR /repo
RUN apk add --no-cache libc6-compat \
 && corepack enable && corepack prepare pnpm@10.33.0 --activate
ENV CI=1 NEXT_TELEMETRY_DISABLED=1

COPY . .
RUN --mount=type=cache,id=pnpm-store,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile

ENV NEXT_PUBLIC_SWITCHBOARD_URL=__NEXT_PUBLIC_SWITCHBOARD_URL__ \
    NEXT_PUBLIC_CONNECT_URL=__NEXT_PUBLIC_CONNECT_URL__ \
    NEXT_PUBLIC_BASE_URL=__NEXT_PUBLIC_BASE_URL__ \
    NEXT_PUBLIC_RENOWN_URL=__NEXT_PUBLIC_RENOWN_URL__ \
    NEXT_PUBLIC_ETH_MAINNET_RPC=__NEXT_PUBLIC_ETH_MAINNET_RPC__ \
    NEXT_PUBLIC_ENVIRONMENT=__NEXT_PUBLIC_ENVIRONMENT__ \
    NEXT_PUBLIC_SHOW_WHITELIST_OVERLAY=__NEXT_PUBLIC_SHOW_WHITELIST_OVERLAY__ \
    NEXT_PUBLIC_LEAVE_PAGE_GUARD_ENABLED=__NEXT_PUBLIC_LEAVE_PAGE_GUARD_ENABLED__ \
    NEXT_PUBLIC_ENABLE_SERVICE_PURCHASE_STORE_PERSISTENCE=__NEXT_PUBLIC_ENABLE_SERVICE_PURCHASE_STORE_PERSISTENCE__

# Workspace deps first (op-hub ships a built dist/), then the app.
RUN pnpm --filter "frontend^..." run build \
 && pnpm --filter frontend run build

FROM ${NODE_IMAGE} AS runner
WORKDIR /app
# The entrypoint copies /app with `cp -a`; a root-owned /app makes busybox cp
# warn that it cannot preserve ownership of the target dir.
RUN chown 1000:1000 /app
COPY --from=build --chown=1000:1000 /repo/apps/frontend/.next/standalone ./
COPY --from=build --chown=1000:1000 /repo/apps/frontend/.next/static ./apps/frontend/.next/static
COPY --from=build --chown=1000:1000 /repo/apps/frontend/public ./apps/frontend/public
COPY --chmod=0755 apps/frontend/docker/ph-fusion-entrypoint.sh /ph-fusion-entrypoint.sh

# Runtime defaults for NEXT_PUBLIC_* the platform does not set; any env var on
# the container overrides them before the entrypoint substitutes placeholders.
ENV FUSION_APP_DIR=/app \
    PORT=3000 \
    HOSTNAME=0.0.0.0 \
    NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    NEXT_PUBLIC_ENVIRONMENT=production \
    NEXT_PUBLIC_ETH_MAINNET_RPC=https://ethereum-rpc.publicnode.com \
    NEXT_PUBLIC_SHOW_WHITELIST_OVERLAY=false \
    NEXT_PUBLIC_LEAVE_PAGE_GUARD_ENABLED=true \
    NEXT_PUBLIC_ENABLE_SERVICE_PURCHASE_STORE_PERSISTENCE=true

USER 1000:1000
EXPOSE 3000
ENTRYPOINT ["/ph-fusion-entrypoint.sh"]
CMD ["node", "apps/frontend/server.js"]
