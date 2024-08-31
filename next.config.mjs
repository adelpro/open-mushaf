import withBundleAnalyzer from '@next/bundle-analyzer'
import withSerwistInit from '@serwist/next'
/** @type {import('next').NextConfig} */

const nextConfig = {
  productionBrowserSourceMaps: false,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '3540',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3540',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        port: '',
        pathname: '/photos/**',
      },
      {
        protocol: 'https',
        hostname: 'pixabay.com',
        port: '',
        pathname: '/get/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  typescript: {
    // Set this to false if you want production builds to abort if there's type errors
    ignoreBuildErrors: process.env.NODE_ENV !== 'production',
  },
  eslint: {
    // Set this to false if you want production builds to abort if there's lint errors
    ignoreDuringBuilds: process.env.NODE_ENV !== 'production',
  },
  compiler: {
    removeConsole:
      process.env.NODE_ENV === 'production' ? { exclude: ['error'] } : false,
  },
}

const pwaConfig = {
  swSrc: 'src/sw.ts',
  swDest: 'public/sw.js',
  cacheOnNavigation: true,
  disable: process.env.NODE_ENV !== 'production',
  register: true,
  maximumFileSizeToCacheInBytes: 100 * 1024 * 1024, // 100MB
}

const withSerwist = withSerwistInit(pwaConfig)

/* How this will work

* Bundle-analyzer will run only if we pass 'ANALYZER=true' to our command (yarn analyze)
*
* next-PWA is disabled in developement ( disable: process.env.NODE_ENV === 'development', )
* next-PWA will run only with this command ( yarn build)
*
* running (yarn dev) will only pass the (config)
*/
export default withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})(withSerwist(nextConfig))
