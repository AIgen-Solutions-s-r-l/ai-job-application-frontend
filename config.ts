import themes from "daisyui/src/theming/themes";
import { ConfigProps } from "./types/config";

const config = {
  // REQUIRED
  appName: "laboro",
  // REQUIRED: a short description of your app for SEO tags (can be overwritten)
  appDescription:
    "Automate your LinkedIn job applications effortlessly with laboro. Save time, apply faster, and get hired quicker.",
  // REQUIRED (no https://, not trailing slash at the end, just the naked domain)
  domainName: "laboro.co",
  crisp: {
    // Crisp website ID. If you don't use Crisp, you can remove this.
    id: "",
    // Hide Crisp by default, except on route "/". Crisp is toggled with <ButtonSupport/>. If you want to show Crisp on all routes, remove this below.
    onlyShowOnRoutes: ["/"],
  },
  stripe: {
    // Only the plan for 100 applications is included for now.
    plans: [
      {
        // Monthly plan for 100 applications (20% discount)
        priceId:
          process.env.NODE_ENV === "development"
            ? "price_1QwgkhEZ5izZ581vRMUrj1A2"
            : "price_1QwgkhEZ5izZ581vRMUrj1A2",
        name: "100 Applications - Monthly",
        description:
          "Get 100 applications per month with a 20% discount applied.",
        price: 1.60,
        priceAnchor: null,
        features: [{ name: "100 Applications" }],
      },
      {
        // Yearly plan for 100 applications (35% discount)
        priceId:
          process.env.NODE_ENV === "development"
            ? "price_dev_100_yearly"
            : "price_prod_100_yearly",
        name: "100 Applications - Yearly",
        description:
          "Get 100 applications per year with a 35% discount applied.",
        price: 1.30,
        priceAnchor: null,
        features: [{ name: "100 Applications" }],
      },
      {
        // One-time payment plan for 100 applications (no discount)
        priceId:
          process.env.NODE_ENV === "development"
            ? "price_dev_100_onetime"
            : "price_prod_100_onetime",
        name: "100 Applications - One-Time Payment",
        description: "One-time purchase for 100 applications with no discount.",
        price: 2.00,
        priceAnchor: null,
        features: [{ name: "100 Applications" }],
      },
    ],
  },
  aws: {
    // If you use AWS S3/Cloudfront, put values in here
    bucket: "laboro-bucket",
    bucketUrl: `https://laboro-bucket.s3.amazonaws.com/`,
    cdn: "https://cdn.laboro.co/",
  },
  mailgun: {
    // subdomain to use when sending emails
    subdomain: "mg",
    // REQUIRED — Email 'From' field to be used when sending magic login links
    fromNoReply: `laboro <noreply@mg.laboro.co>`,
    // REQUIRED — Email 'From' field to be used when sending other emails, like abandoned carts, updates, etc.
    fromAdmin: `David at laboro <david@mg.laboro.co>`,
    // Email shown to customers if they need support
    supportEmail: "support@laboro.co",
    // When someone replies to the support email, forward it to this email
    forwardRepliesTo: "david@laboro.co",
  },
  colors: {
    // REQUIRED — The DaisyUI theme to use. Leave blank for default (light & dark mode). 
    theme: "lightTheme",
    // REQUIRED — This color will be reflected on the whole app outside of the document (loading bar, Chrome tabs, etc.). By default, it takes the primary color from your DaisyUI theme.
    main: themes["cupcake"]["primary"],
  },
  auth: {
    // REQUIRED — the path to log in users. It's used to protect private routes (like /dashboard)
    loginUrl: "/signin",
    // REQUIRED — the path you want to redirect users after successful login (i.e. /dashboard). Normally a private page for users to manage their accounts.
    callbackUrl: "/dashboard",
  },
} as ConfigProps;

export default config;