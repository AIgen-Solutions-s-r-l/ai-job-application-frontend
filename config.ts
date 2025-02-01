import themes from "daisyui/src/theming/themes";
import { ConfigProps } from "./types/config";

const config = {
  // REQUIRED
  appName: "aihawk",
  // REQUIRED: a short description of your app for SEO tags (can be overwritten)
  appDescription:
    "Automate your LinkedIn job applications effortlessly with aihawk. Save time, apply faster, and get hired quicker.",
  // REQUIRED (no https://, not trailing slash at the end, just the naked domain)
  domainName: "aihawk.co",
  crisp: {
    // Crisp website ID. If you don't use Crisp, you can remove this.
    id: "",
    // Hide Crisp by default, except on route "/". Crisp is toggled with <ButtonSupport/>. If you want to show Crisp on all routes, remove this below.
    onlyShowOnRoutes: ["/"],
  },
  stripe: {
    // Create multiple plans in your Stripe dashboard, then add them here. You can add as many plans as you want, just make sure to add the priceId
    plans: [
      {
        // REQUIRED — we use this to find the plan in the webhook (for instance if you want to update the user's credits based on the plan)
        priceId:
          process.env.NODE_ENV === "development"
            ? "price_dev_example_123"
            : "price_prod_example_456",
        //  REQUIRED - Name of the plan, displayed on the pricing page
        name: "Free Plan",
        // A friendly description of the plan, displayed on the pricing page
        description: "Try the essential features of aihawk for free",
        // The price you want to display, the one user will be charged on Stripe
        price: 0,
        // No priceAnchor because this is a free plan
        priceAnchor: null,
        features: [
          { name: "Unlimited applications (shared bot)" },
          { name: "AI Cover letters" },
          { name: "AI Specific questions" },
          { name: "Community support" },
        ],
      },
      {
        priceId:
          process.env.NODE_ENV === "development"
            ? "price_dev_example_789"
            : "price_prod_example_012",
        // This plan will look different on the pricing page, it will be highlighted. You can only have one plan with isFeatured: true
        isFeatured: true,
        name: "Intermediate Plan",
        description: "Access advanced features with higher accuracy and exclusivity",
        price: 30,
        priceAnchor: 50,
        features: [
          { name: "Up to 300 applications" },
          { name: "AI Cover letters" },
          { name: "AI Specific questions" },
          { name: "Exclusive bot access" },
          { name: "Email support" },
        ],
      },
      {
        priceId:
          process.env.NODE_ENV === "development"
            ? "price_dev_example_345"
            : "price_prod_example_678",
        name: "Premium Plan",
        description: "High volume applications with multiple bots running simultaneously",
        price: 60,
        priceAnchor: 100,
        features: [
          { name: "Up to 1,000 applications" },
          { name: "AI Cover letters" },
          { name: "AI Specific questions" },
          { name: "Up to 3 bots (exclusive)" },
          { name: "Priority support" },
        ],
      },
    ],
  },
  aws: {
    // If you use AWS S3/Cloudfront, put values in here
    bucket: "aihawk-bucket",
    bucketUrl: `https://aihawk-bucket.s3.amazonaws.com/`,
    cdn: "https://cdn.aihawk.co/",
  },
  mailgun: {
    // subdomain to use when sending emails
    subdomain: "mg",
    // REQUIRED — Email 'From' field to be used when sending magic login links
    fromNoReply: `aihawk <noreply@mg.aihawk.co>`,
    // REQUIRED — Email 'From' field to be used when sending other emails, like abandoned carts, updates, etc.
    fromAdmin: `David at aihawk <david@mg.aihawk.co>`,
    // Email shown to customers if they need support
    supportEmail: "support@aihawk.co",
    // When someone replies to the support email, forward it to this email
    forwardRepliesTo: "david@aihawk.co",
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