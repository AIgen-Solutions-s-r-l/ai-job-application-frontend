module.exports = {
  siteUrl: process.env.SITE_URL || "https://example.com",
  generateRobotsTxt: true,
  exclude: [
    "/api/*",
    "/logout",
    "/resend-verification",
    "/verify-email",
    "/forgot-password",
    "/dashboard/*",
    "/onboarding",
    "/twitter-image.*",
    "/opengraph-image.*",
    "/icon.*",
    "/apple-icon.png",
    "/favicon.*",
    "/_next/*",
  ],
  transform: async (config, path) => {
    const priorities = {
      "/signup": 1.0,
      "/": 0.8,
      "/about-us": 0.6,
    };

    return {
      loc: path,
      changefreq: "weekly",
      priority: priorities[path] || 0.5,
      lastmod: new Date().toISOString(),
    };
  },
};
