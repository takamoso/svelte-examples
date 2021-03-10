import {writable} from 'svelte/store'

export const count = (() => {
  const {subscribe, set, update, ...rest} = writable(0)

  return {
    subscribe: subscribe,
    increment: () => update(n => n + 1),
    decrement: () => update(n => n - 1),
    reset: () => set(0),
  }
})()