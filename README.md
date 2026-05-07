## Getting Started

First, run the development server:

```bash
pnpm dev
```

## Build

```bash
docker buildx create --name builderx
docker buildx use builderx
docker buildx build --platform linux/amd64,linux/arm64 --provenance=false --sbom=false -t brunoccr/car-manager:dev --push -f Dockerfile .
```
