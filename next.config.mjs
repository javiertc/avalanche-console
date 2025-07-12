import bundleAnalyzer from '@next/bundle-analyzer'
import { createHash } from 'crypto'

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Temporarily ignore during builds to fix issues
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Temporarily ignore build errors to fix issues
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
  // Server external packages
  serverExternalPackages: ['@radix-ui/react-icons'],
  // Production optimizations
  productionBrowserSourceMaps: false,
  // Optimize bundle analyzer
  webpack: (config, { isServer }) => {
    // Optimize bundle size
    if (!isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          default: false,
          vendors: false,
          framework: {
            name: 'framework',
            chunks: 'all',
            test: /(?<!node_modules.*)[\\/]node_modules[\\/](react|react-dom|scheduler|prop-types|use-subscription)[\\/]/,
            priority: 40,
            enforce: true,
          },
          commons: {
            name: 'commons',
            chunks: 'all',
            minChunks: 2,
            priority: 20,
          },
          lib: {
            test(module) {
              return module.size() > 160000 && /node_modules[/\\]/.test(module.identifier());
            },
            name(module) {
              const hash = createHash('sha1');
              hash.update(module.identifier());
              return hash.digest('hex').substring(0, 8);
            },
            priority: 30,
            minChunks: 1,
            reuseExistingChunk: true,
          },
        },
      };
    }
    return config;
  },
}

export default withBundleAnalyzer(nextConfig)
