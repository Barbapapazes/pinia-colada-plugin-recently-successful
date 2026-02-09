# pinia-colada-plugin-recently-successful

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![pkg.pr.new](https://pkg.pr.new/badge/Barbapapazes/pinia-colada-plugin-recently-successful)](https://pkg.pr.new/~/Barbapapazes/pinia-colada-plugin-recently-successful)

A Pinia Colada plugin that adds a `recentlySuccessful` ref to mutations.

- 📦 Package: [`packages/pinia-colada-plugin-recently-successful`](./packages/pinia-colada-plugin-recently-successful)
- 🧪 Demo app: [`.playground`](./.playground)

## Installation

```bash
pnpm add pinia-colada-plugin-recently-successful
```

## Usage

```ts
import { PiniaColada } from '@pinia/colada'
import { createPinia } from 'pinia'
import { PiniaColadaRecentlySuccessfulPlugin } from 'pinia-colada-plugin-recently-successful'
import { createApp } from 'vue'

import App from './App.vue'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(PiniaColada, {
  plugins: [PiniaColadaRecentlySuccessfulPlugin()],
})

app.mount('#app')
```

More details (configuration, option precedence, etc.) are in the package README: [`packages/pinia-colada-plugin-recently-successful/README.md`](./packages/pinia-colada-plugin-recently-successful/README.md).

## Development

This repo is a pnpm workspace.

- Install: `pnpm install --frozen-lockfile`
- Build: `pnpm run build`
- Lint: `pnpm run lint`
- Playground: `pnpm -C .playground dev`

## Sponsors

<p align="center">
  <a href="https://github.com/sponsors/barbapapazes">
    <img src="https://cdn.jsdelivr.net/gh/barbapapazes/static/sponsors.svg"/>
  </a>
</p>

## License

[MIT](./LICENSE) License © 2026-PRESENT [Estéban Soubiran](https://github.com/barbapapazes)

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/pinia-colada-plugin-recently-successful/latest.svg?style=flat&colorA=000&colorB=171717
[npm-version-href]: https://npmjs.com/package/pinia-colada-plugin-recently-successful

[npm-downloads-src]: https://img.shields.io/npm/dm/pinia-colada-plugin-recently-successful.svg?style=flat&colorA=000&colorB=171717
[npm-downloads-href]: https://npmjs.com/package/pinia-colada-plugin-recently-successful

[license-src]: https://img.shields.io/npm/l/pinia-colada-plugin-recently-successful.svg?style=flat&colorA=000&colorB=171717
[license-href]: https://npmjs.com/package/pinia-colada-plugin-recently-successful
