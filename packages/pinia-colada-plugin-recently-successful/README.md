# pinia-colada-plugin-recently-successful

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![pkg.pr.new](https://pkg.pr.new/badge/Barbapapazes/pinia-colada-plugin-recently-successful)](https://pkg.pr.new/~/Barbapapazes/pinia-colada-plugin-recently-successful)

A Pinia Colada plugin that adds a `recentlySuccessful` ref to mutations.

- ✅ Adds `recentlySuccessful: ShallowRef<boolean>` to `useMutation()` results
- ⏱️ Turns `true` on success, then auto-resets after a configurable duration
- 🧯 Timer-safe: ignores out-of-order mutation completions

## Installation

```bash
pnpm add pinia-colada-plugin-recently-successful
```

## Usage

Register the plugin when installing Pinia Colada:

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

Then, in a mutation:

```ts
import { useMutation } from '@pinia/colada'

const { mutate, recentlySuccessful } = useMutation({
  mutation: async () => {
    // ...
  },
})

await mutate()

// `recentlySuccessful.value` becomes true on success,
// then flips back to false after the configured duration.
```

## Configuration

You can configure the duration globally (plugin option) and/or per mutation.

Duration precedence:

1. Per-mutation `recentlySuccessfulDuration`
2. Plugin `recentlySuccessfulDuration`
3. Default: `2000`

| Option | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `recentlySuccessfulDuration` | `number` | `2000` | Duration in milliseconds that `recentlySuccessful` stays `true` after a successful mutation. |

### Global configuration

```ts
PiniaColadaRecentlySuccessfulPlugin({
  recentlySuccessfulDuration: 3000,
})
```

### Per-mutation configuration

```ts
useMutation({
  recentlySuccessfulDuration: 500,
  mutation: async () => {
    // ...
  },
})
```

## Sponsors

<p align="center">
  <a href="https://github.com/sponsors/barbapapazes">
    <img src="https://cdn.jsdelivr.net/gh/barbapapazes/static/sponsors.svg"/>
  </a>
</p>

## License

[MIT](../../LICENSE) License © 2026-PRESENT [Estéban Soubiran](https://github.com/barbapapazes)

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/pinia-colada-plugin-recently-successful/latest.svg?style=flat&colorA=000&colorB=171717
[npm-version-href]: https://npmjs.com/package/pinia-colada-plugin-recently-successful

[npm-downloads-src]: https://img.shields.io/npm/dm/pinia-colada-plugin-recently-successful.svg?style=flat&colorA=000&colorB=171717
[npm-downloads-href]: https://npmjs.com/package/pinia-colada-plugin-recently-successful

[license-src]: https://img.shields.io/npm/l/pinia-colada-plugin-recently-successful.svg?style=flat&colorA=000&colorB=171717
[license-href]: https://npmjs.com/package/pinia-colada-plugin-recently-successful
