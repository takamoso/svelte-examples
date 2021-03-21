import {readable} from 'svelte/store'

const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

export const darkMode = readable(mediaQuery.matches, set => {
  const handler = event => set(event.matches)

  try {
    mediaQuery.addEventListener('change', handler)
  } catch {
    mediaQuery.addListener(handler)
  }

  return () => {
    try {
      mediaQuery.removeEventListener('change', handler)
    } catch {
      mediaQuery.removeListener(handler)
    }
  }
})