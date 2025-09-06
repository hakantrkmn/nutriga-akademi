/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ["@chakra-ui/react"]
  },
  webpack: (config, { dev, isServer }) => {
    // Reduce serialization warnings for development
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