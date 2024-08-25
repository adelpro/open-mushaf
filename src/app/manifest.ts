import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Open-Mushaf App",
    short_name: "Open-Mushaf",
    description: "Quran mushaf  from elmadina-warsh-azrak",
    start_url: "/",
    display: "standalone",
    background_color: "#fff",
    theme_color: "#fff",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: "/images/48x48.png",
        sizes: "48x48",
        type: "image/png",
      },
      {
        src: "/images/72x72.png",
        sizes: "72x72",
        type: "image/png",
      },
      {
        src: "/images/96x96.png",
        sizes: "96x96",
        type: "image/png",
      },
      {
        src: "/images/144x144.png",
        sizes: "144x144",
        type: "image/png",
      },

      {
        src: "/images/192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/images/512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/images/512x512-maskable.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    orientation: "any",
    id: "hbblfifohoxdngfbjbiimbbcimepbdcb",
    screenshots: [
      {
        src: "/screenshots/mushaf-page-desktop.png",
        sizes: "1920x916",
        type: "image/png",
      },
      {
        src: "/screenshots/mushaf-page-mobile.png",
        sizes: "441x898",
        type: "image/png",
      },
      {
        src: "/screenshots/tafseer-popup-mobile.png",
        sizes: "441x898",
        type: "image/png",
      },
      {
        src: "/screenshots/sura-index-desktop.png",
        sizes: "1239x916",
        type: "image/png",
      },
      {
        src: "/screenshots/sura-index-mobile.png",
        sizes: "531x916",
        type: "image/png",
      },
    ],
  };
}
