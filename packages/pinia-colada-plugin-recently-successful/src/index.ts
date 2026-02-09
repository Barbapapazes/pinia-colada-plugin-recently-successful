import type { _EmptyObject, PiniaColadaPlugin, UseMutationEntry } from '@pinia/colada'
import type { ShallowRef } from 'vue'
import { useMutationCache } from '@pinia/colada'
import { shallowRef } from 'vue'

declare const setTimeout: (callback: () => void, ms: number) => any
declare const clearTimeout: (id: any) => void

interface InternalState {
  runId: number
  timeout?: any
}

interface PiniaColadaRecentlySuccessfulPluginOptions {
  /**
   * The duration (in milliseconds) for which a mutation is considered "recently successful".
   *
   * @default 2000
   *
   * @example
   * ```ts
   * import { useMutation } from '@pinia/colada'
   *
   * const { mutate, recentlySuccessful } = useMutation()
   * ```
   */
  recentlySuccessfulDuration?: number
}

export function PiniaColadaRecentlySuccessfulPlugin(options: PiniaColadaRecentlySuccessfulPluginOptions = {}): PiniaColadaPlugin {
  const DEFAULT_DURATION = 2000
  const globalDuration = options.recentlySuccessfulDuration

  return ({ pinia }) => {
    const mutationCache = useMutationCache(pinia)
    const internalState = new WeakMap<UseMutationEntry<any, any, any>, InternalState>()

    mutationCache.$onAction(({ name, args, after, onError }) => {
      if (name === 'extend') {
        const [entry] = args as [UseMutationEntry<any, any, any>]
        // Initialize the recentlySuccessful ref
        entry.ext.recentlySuccessful = shallowRef(false)
        // Initialize internal state
        internalState.set(entry, { runId: 0 })
      }
      else if (name === 'mutate') {
        const [entry] = args as [UseMutationEntry<any, any, any>]
        const state = internalState.get(entry)
        if (!state)
          return

        // Increment runId and clear any existing timer
        state.runId++
        if (state.timeout) {
          clearTimeout(state.timeout)
          state.timeout = undefined
        }

        // Reset to false at the start of mutation
        if (entry.ext.recentlySuccessful) {
          entry.ext.recentlySuccessful.value = false
        }

        const currentRunId = state.runId

        after(() => {
          // Only proceed if this is still the latest run
          if (state.runId !== currentRunId)
            return
          if (!entry.ext.recentlySuccessful)
            return

          // Mutation succeeded - set to true
          entry.ext.recentlySuccessful.value = true

          // Calculate duration with precedence: per-mutation > global > default
          let duration = DEFAULT_DURATION
          if (globalDuration !== undefined && Number.isFinite(globalDuration) && globalDuration > 0) {
            duration = globalDuration
          }
          if (entry.options.recentlySuccessfulDuration !== undefined
            && Number.isFinite(entry.options.recentlySuccessfulDuration)
            && entry.options.recentlySuccessfulDuration > 0) { duration = entry.options.recentlySuccessfulDuration }

          // Schedule reset to false
          state.timeout = setTimeout(() => {
            // Only reset if this is still the latest run
            if (state.runId === currentRunId && entry.ext.recentlySuccessful) {
              entry.ext.recentlySuccessful.value = false
            }
          }, duration)
        })

        onError(() => {
          // On error, ensure recentlySuccessful is false
          if (entry.ext.recentlySuccessful) {
            entry.ext.recentlySuccessful.value = false
          }
          if (state.timeout) {
            clearTimeout(state.timeout)
            state.timeout = undefined
          }
        })
      }
      else if (name === 'remove') {
        const [entry] = args as [UseMutationEntry<any, any, any>]
        const state = internalState.get(entry)
        if (state?.timeout) {
          clearTimeout(state.timeout)
        }
        internalState.delete(entry)
      }
    })
  }
}

declare module '@pinia/colada' {
  /* eslint-disable-next-line unused-imports/no-unused-vars */
  interface UseMutationOptions<TData, TVars, TError, TContext extends Record<any, any> = _EmptyObject> extends PiniaColadaRecentlySuccessfulPluginOptions {}

  /* eslint-disable-next-line unused-imports/no-unused-vars */
  interface UseMutationEntryExtensions<TData, TVars, TError, TContext extends Record<any, any> = _EmptyObject> {
    /**
     * Indicates whether the mutation was recently successful.
     */
    recentlySuccessful: ShallowRef<boolean>
  }
}
