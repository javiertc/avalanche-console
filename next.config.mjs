import bundleAnalyzer from '@next/bundle-analyzer'

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // TODO: Enable after fixing all linting errors
    ignoreDuringBuilds: true,
  },
  typescript: {
    // TODO: Enable after fixing all TypeScript errors
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: false,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.avax.network',
      },
      {
        protocol: 'https',
        hostname: 'developers.avacloud.io',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  compiler: {
    // Remove console logs in production
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },

  // Disable powered by header
  poweredByHeader: false,
  // Compress responses
  compress: true,
  // Enable strict mode
  reactStrictMode: true,
  // Experimental features for better performance
  experimental: {
    // optimizeCss: true, // Disabled: requires critters package
  },
  // Production optimizations
  productionBrowserSourceMaps: false,
}

export default withBundleAnalyzer(nextConfig)
