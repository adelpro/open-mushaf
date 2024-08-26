export const isPWASupported = (): boolean => {
  if (typeof navigator === "undefined") {
    return false;
  }

  if (typeof window === "undefined") {
    return false;
  }

  return "serviceWorker" in navigator && "Cash" in window;
};
