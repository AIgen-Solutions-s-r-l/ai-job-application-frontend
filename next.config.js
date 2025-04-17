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
    // Only remove console.logs in production
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
  // Minimize bundle size
  poweredByHeader: false,
  // Disable production browser sourcemaps
  productionBrowserSourceMaps: false,
};

module.exports = nextConfig;
