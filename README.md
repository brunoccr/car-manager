## Getting Started

First, run the development server:

```bash
pnpm dev
```

## Build

```bash
docker buildx create --name builderx-senac-scrapper
docker buildx use builderx-senac-scrapper
docker buildx build --platform linux/amd64,linux/arm64 --provenance=false --sbom=false -t brunoccr/senac-collector:dev --push -f Dockerfile .
```
