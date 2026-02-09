# Copilot instructions (pinia-colada-plugin-recently-successful)

## Repo shape
- pnpm workspace monorepo: library package in `packages/pinia-colada-plugin-recently-successful/`, demo app in `.playground/`.
- Node is **>= 24** (see `packages/pinia-colada-plugin-recently-successful/package.json` and CI).
- TypeScript + ESM everywhere (`"type": "module"`).

## Primary workflows (use these exact commands)
- Install: `pnpm install --frozen-lockfile`
- Build all workspace packages: `pnpm run build` (runs `pnpm --filter ./packages/* run build`)
- Lint: `pnpm run lint` (ESLint only; Prettier is disabled)
- Autofix: `pnpm run lint:fix`

### Library dev loop
- Watch-build the library: `pnpm --filter pinia-colada-plugin-recently-successful dev` (tsdown watch)
- Run the playground app: `pnpm -C .playground dev` (Vite)

## What this package does (key code)
- Entry point is `packages/pinia-colada-plugin-recently-successful/src/index.ts`.
- Exports `PiniaColadaRecentlySuccessfulPlugin(options?)`, a **Pinia Colada plugin** that:
  - hooks `useMutationCache(pinia).$onAction(...)`
  - on `extend`: initializes `entry.ext.recentlySuccessful = shallowRef(false)`
  - on `mutate`: resets to false, then sets true on `after()` success and flips back after a timeout
  - on `remove`: clears timers and WeakMap state
- Duration precedence (see implementation): per-mutation `entry.options.recentlySuccessfulDuration` > plugin option `options.recentlySuccessfulDuration` > default `2000`.

## Conventions to follow when editing
- Keep all type augmentation next to the implementation: `declare module '@pinia/colada' { ... }` in `src/index.ts` extends:
  - `UseMutationOptions` to accept `recentlySuccessfulDuration?`
  - `UseMutationEntryExtensions` to expose `recentlySuccessful: ShallowRef<boolean>`
- Timer/state safety matters: this plugin uses a `WeakMap<UseMutationEntry, { runId; timeout? }>` to avoid stale timers and to ignore out-of-order mutation completions.
- Formatting: rely on ESLint (`@antfu/eslint-config` in `eslint.config.js`); don’t add Prettier configs.

## Release/publishing notes
- `pnpm run release` uses `bumpp --sign` (tags `v*` trigger `.github/workflows/release.yml`).
- CI also publishes preview packages via `pkg-pr-new` (`.github/workflows/ci.yml`).
