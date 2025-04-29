module.exports = {
  siteUrl: process.env.SITE_URL || "https://laboro.co",
  generateRobotsTxt: true,
  exclude: ["/twitter-image.*", "/opengraph-image.*", "/icon.*"],
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
