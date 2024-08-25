import withBundleAnalyzer from "@next/bundle-analyzer";
import withPWA from "next-pwa";

/** @type {import('next').NextConfig} */

const config = {
  productionBrowserSourceMaps: false,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "3540",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "3540",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
        port: "",
        pathname: "/photos/**",
      },
      {
        protocol: "https",
        hostname: "pixabay.com",
        port: "",
        pathname: "/get/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  typescript: {
    // Set this to false if you want production builds to abort if there's type errors
    ignoreBuildErrors: true,
  },
  eslint: {
    // Set this to false if you want production builds to abort if there's lint errors
    ignoreDuringBuilds: true,
  },
};
// Runtime Caching rules
const runtimeCaching = [
  // https request caching
  {
    urlPattern: /^https?.*/,
    handler: "NetworkFirst",
    options: {
      cacheName: "https-calls",
      expiration: {
        maxAgeSeconds: 60 * 60 * 24 * 7,
        // 7 days.
        purgeOnQuotaError: true, // Automatically delete the cache if the quota is exceeded.
      },
      cacheableResponse: {
        statuses: [0, 200], // Only cache response with status 0 and 200 ( 0 : opaque response with don't reveal its origin, 200: successfully origin )
      },
    },
  },
  // Images caching
  {
    urlPattern: /\.(jpe?g|png|gif|webp)$/i,
    handler: "CacheFirst",
    options: {
      cacheName: "static-image-assets",
      expiration: {
        maxEntries: 50,
        maxAgeSeconds: 60 * 60 * 24 * 30,
        // 30 days.
        purgeOnQuotaError: true,
      },
      cacheableResponse: {
        statuses: [0, 200],
      },
    },
  },
  // js,css caching
  {
    urlPattern: /\.(js|css)$/i,
    handler: "CacheFirst",
    options: {
      cacheName: "static-assets",
      expiration: {
        maxEntries: 200,
        maxAgeSeconds: 60 * 60 * 24 * 90,
        // 90 days
        purgeOnQuotaError: true,
      },
      cacheableResponse: {
        statuses: [0, 200],
      },
    },
  },
  // Google fonts caching
  {
    urlPattern: /^https?:\/\/fonts\.googleapis\.com\/.*/,
    handler: "CacheFirst",
    options: {
      cacheName: "google-fonts",
      expiration: {
        maxAgeSeconds: 60 * 60 * 24 * 90,
        // 90 days
        purgeOnQuotaError: true,
      },
      cacheableResponse: {
        statuses: [0, 200],
      },
    },
  },
];
const pwaConfig = {
  dest: "public",
  swSrc: "src/utils/service-worker.ts",
  disable: process.env.NODE_ENV !== "production",
  register: true,
  skipWaiting: true,
  clientsClaim: true,
  // for more information: https://developer.mozilla.org/en-US/docs/Web/API/Clients/claim
  // Must be false to precache the home page url ('/')
  dynamicStartUrl: false,

  cacheStartUrl: true,
  runtimeCaching,
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  extendDefaultRuntimeCaching: true,
};

/* How this will work

* Bundle-analyzer will run only if we pass 'ANALYZER=true' to our command (yarn analyze)
*
* next-PWA is disabled in developement ( disable: process.env.NODE_ENV === 'development', )
* next-PWA will run only with this command ( yarn build)
*
* running (yarn dev) will only pass the (config)
*/
export default withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
})(withPWA(pwaConfig)(config));
