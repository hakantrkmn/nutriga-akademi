/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ["@chakra-ui/react", "react-icons"],
    // Enable faster builds
    esmExternals: true,
    // Optimize CSS
    optimizeCss: true,
  },
  // Enable compression
  compress: true,
  // Optimize images
  images: {
    formats: ['image/webp', 'image/avif'],
  },
  webpack: (config, { dev, isServer }) => {
    // Development optimizations
    if (dev && !isServer) {
      config.optimization = {
        ...config.optimization,
        removeAvailableModules: false,
        removeEmptyChunks: false,
        splitChunks: false,
      };
    }

    // Optimize module resolution
    config.resolve = {
      ...config.resolve,
      symlinks: false,
      // Faster module resolution
      cacheWithContext: false,
    };

    // Optimize bundle size
    config.optimization = {
      ...config.optimization,
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          chakra: {
            test: /[\\/]node_modules[\\/]@chakra-ui[\\/]/,
            name: 'chakra',
            chunks: 'all',
          },
          icons: {
            test: /[\\/]node_modules[\\/]react-icons[\\/]/,
            name: 'icons',
            chunks: 'all',
          },
        },
      },
    };

    return config;
  },
  // Disable webpack cache warnings
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
};

export default nextConfig;