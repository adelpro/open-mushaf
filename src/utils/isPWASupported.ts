export const isPWASupported = (): boolean => {
  if (typeof navigator === 'undefined' || typeof window === 'undefined') {
    return false
  }

  return 'serviceWorker' in navigator
}
