/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      // Whitelist domains for NextJS <Image> component src={}
      "lh3.googleusercontent.com",
      "pbs.twimg.com",
      "images.unsplash.com",
      "logos-world.net",
    ]
  },
  // Production optimizations
  swcMinify: true,
  compiler: {
    // Remove console.log in production except for error and warn
    removeConsole: {
      exclude: ['error', 'warn'],
    },
  },
  // Minimize bundle size
  poweredByHeader: false,
  // Disable production browser sourcemaps
  productionBrowserSourceMaps: false,
};

module.exports = nextConfig;
