/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  experimental: {
    optimizePackageImports: ["react-icons"],
    // Enable faster builds
    esmExternals: true,
  },
  // Next 15: externalize native Node deps for server runtime
  serverExternalPackages: ["iyzipay"],
  // Enable compression
  compress: true,
  // Optimize images
  images: {
    formats: ["image/webp", "image/avif"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
        port: "",
        pathname: "/**",
      },
    ],
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
      cacheWithContext: false,
    };

    // Production code splitting - simplified approach
    if (!dev && !isServer) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: "all",
          minSize: 20000,
          cacheGroups: {
            // TipTap extensions - separate chunk
            tiptap: {
              test: /[\\/]node_modules[\\/]@tiptap[\\/]/,
              name: "tiptap",
              chunks: "all",
              priority: 20,
            },
            // React libraries
            react: {
              test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
              name: "react",
              chunks: "all",
              priority: 15,
            },
            // Radix UI components
            radix: {
              test: /[\\/]node_modules[\\/]@radix-ui[\\/]/,
              name: "radix",
              chunks: "all",
              priority: 10,
            },
            // Other vendor libraries
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: "vendors",
              chunks: "all",
              priority: 5,
            },
          },
        },
      };
    }

    return config;
  },
  // Disable webpack cache warnings
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
};

export default nextConfig;
