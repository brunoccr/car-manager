## Getting Started

First, run the development server:

```bash
pnpm dev
```

## Build Dev

```bash
docker build -t local/car-manager .
```

## Run Build Dev

```bash
docker run --rm -p 3001:3000 -p 8090:8090 -v ./data:/data local/car-manager
```

## New Version

```bash
git tag -a v0.0.0 -m "v0.0.0" & git push origin --tags
```

## Build

```bash
docker buildx create --name builderx
docker buildx use builderx
docker buildx build --platform linux/amd64,linux/arm64 --provenance=false --sbom=false -t brunoccr/car-manager:dev --push -f Dockerfile .
```
