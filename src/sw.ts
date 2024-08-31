import { defaultCache, PAGES_CACHE_NAME } from '@serwist/next/worker'
import type { PrecacheEntry, SerwistGlobalConfig } from 'serwist'
import {
  CacheFirst,
  ExpirationPlugin,
  NetworkFirst,
  NetworkOnly,
  PrecacheFallbackPlugin,
  Serwist,
} from 'serwist'

// This declares the value of `injectionPoint` to TypeScript.
// `injectionPoint` is the string that will be replaced by the
// actual precache manifest. By default, this string is set to
// `"self.__SW_MANIFEST"`.
declare global {
  interface WorkerGlobalScope extends SerwistGlobalConfig {
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined
  }
}

declare const self: ServiceWorkerGlobalScope

const runtimeCaching = [
  {
    matcher: (input: {
      request: Request
      url: URL
      sameOrigin: boolean
    }): boolean =>
      input.request.headers.get('RSC') === '1' &&
      input.request.headers.get('Next-Router-Prefetch') === '1' &&
      input.sameOrigin &&
      !input.url.pathname.startsWith('/api/'),
    // NEW: an initialized instance.
    handler: new NetworkFirst({
      cacheName: PAGES_CACHE_NAME.rscPrefetch,
      plugins: [
        new ExpirationPlugin({
          maxEntries: 32,
          maxAgeSeconds: 7 * 24 * 60 * 60, // 7 days
        }),
      ],
    }),
  },
  {
    matcher: ({
      request,
      url: { pathname },
      sameOrigin,
    }: {
      request: Request
      url: URL
      sameOrigin: boolean
    }): boolean =>
      request.headers.get('RSC') === '1' &&
      sameOrigin &&
      !pathname.startsWith('/api/'),
    // NEW: an initialized instance.
    handler: new NetworkFirst({
      cacheName: PAGES_CACHE_NAME.rsc,
      plugins: [
        new ExpirationPlugin({
          maxEntries: 32,
          maxAgeSeconds: 7 * 24 * 60 * 60, // 7 days
        }),
      ],
    }),
  },
  {
    matcher: ({
      request,
      url: { pathname },
      sameOrigin,
    }: {
      request: Request
      url: URL
      sameOrigin: boolean
    }): boolean =>
      request.headers.get('Content-Type')?.includes('text/html') ??
      (false && sameOrigin && !pathname.startsWith('/api/')),
    // NEW: an initialized instance.
    handler: new NetworkFirst({
      cacheName: PAGES_CACHE_NAME.html,
      plugins: [
        new ExpirationPlugin({
          maxEntries: 32,
          maxAgeSeconds: 7 * 24 * 60 * 60, // 7 days
        }),
      ],
    }),
  },
  {
    matcher: ({
      url: { pathname },
      sameOrigin,
    }: {
      url: URL
      sameOrigin: boolean
    }) =>
      sameOrigin &&
      pathname.startsWith('/public/') &&
      pathname.endsWith('.json'),
    handler: new CacheFirst({
      cacheName: PAGES_CACHE_NAME.html,
      plugins: [
        new ExpirationPlugin({
          maxEntries: 30,
          maxAgeSeconds: 90 * 24 * 60 * 60, // 90 days
        }),
      ],
    }),
  },
  {
    matcher: ({
      url: { pathname },
      sameOrigin,
    }: {
      url: URL
      sameOrigin: boolean
    }) =>
      sameOrigin &&
      pathname.startsWith('/public/') &&
      (pathname.endsWith('.png') ||
        pathname.endsWith('.jpg') ||
        pathname.endsWith('.jpeg') ||
        pathname.endsWith('.gif') ||
        pathname.endsWith('.svg')),
    handler: new CacheFirst({
      cacheName: PAGES_CACHE_NAME.html,
      plugins: [
        new ExpirationPlugin({
          maxEntries: 60,
          maxAgeSeconds: 90 * 24 * 60 * 60, // 90 days
        }),
      ],
    }),
  },

  ...defaultCache,
]

const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  runtimeCaching,
})

serwist.registerCapture(
  /.*/,
  new NetworkOnly({
    plugins: [
      new PrecacheFallbackPlugin({
        fallbackUrls: ['/offline'],
        serwist,
      }),
    ],
  })
)

serwist.addEventListeners()
