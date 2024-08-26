export const isPWASupported = (): boolean => {
  if (typeof navigator === "undefined") {
    console.log("navigator is undefined");
    return false;
  }

  if (typeof window === "undefined") {
    console.log("window is undefined");
    return false;
  }

  return "serviceWorker" in navigator && "Cash" in window;
};
