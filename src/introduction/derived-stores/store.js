import {readable, derived} from 'svelte/store'

const start = Date.now()

export const time = readable(Date.now(), set => {
  const interval = setInterval(() => set(Date.now()), 1000)

  return () => {
    clearInterval(interval)
  }
})

export const elapsed = derived(time, $time => Math.round(($time - start) / 1000))