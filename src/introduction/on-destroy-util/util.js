import {onDestroy} from 'svelte'

export const onInterval = (fn, time) => {
  const interval = setInterval(fn, time)

  onDestroy(() => clearInterval(interval))
}