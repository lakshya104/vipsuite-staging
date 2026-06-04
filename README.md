### What is this repository for?

- Quick summary: This repo is the front-end application for VIP SUIT.

### Getting started

## Prerequisites

- Node.js: `24.15.0`
- Yarn: `4.16.0`
- Use `yarn` only not npm.

This repo includes `.nvmrc` to pin the required Node version.

## Install dependencies

Use Yarn only. npm installs are disabled for this repository.

```bash
cd vipsuit-frontend
yarn install
```

If you have not run `yarn install` before, this will also install Husky hooks.

## Run the development server

```bash
yarn dev
```

## Git hooks and commit checks

This project uses Husky and `lint-staged` with a strict commit pipeline.

- `yarn prepare` installs Husky hooks
- Pre-commit runs:
  - `lint-staged` for staged files
  - TypeScript type checking via `yarn typecheck`

## Important repository settings

- `.nvmrc` defines the required Node version: `24.16.0`
- `.npmrc` disables npm package-lock usage and enforces strict engines
- `.yarnrc.yml` enables strict engine enforcement for Node/Yarn compatibility
- `package.json` has `packageManager: "yarn@4.16.0"`

## Notes

- Always run `yarn install`, not `npm install`.
- If you need to change Node versions, use `nvm use` before running Yarn.
- If Husky hooks are not installed, run `yarn prepare`.
