import themes from "daisyui/src/theming/themes";
import { ConfigProps } from "./types/config";

const config = {
  // REQUIRED
  appName: "laboro",
  // REQUIRED: a short description of your app for SEO tags (can be overwritten)
  appDescription:
    "Automate your job applications effortlessly with laboro. Save time, apply faster, and get hired quicker.",
  // REQUIRED (no https://, not trailing slash at the end, just the naked domain)
  domainName: process.env.SITE_URL,
  crisp: {
    // Crisp website ID. If you don't use Crisp, you can remove this.
    id: "",
    // Hide Crisp by default, except on route "/". Crisp is toggled with <ButtonSupport/>. If you want to show Crisp on all routes, remove this below.
    onlyShowOnRoutes: ["/"],
  },
  stripe: {
    // Configuración central de precios para todas las opciones disponibles
    pricing: {
      monthly: {
        "100": {
          id: `price_100_monthly_${process.env.NEXT_PUBLIC_TARGET_ENV}`,
          amount: 39.00
        },
        "200": {
          id: process.env.NEXT_PUBLIC_TARGET_ENV === 'production' ? "price_1QwoUbRwjs1Ksbvt2GTzE3Ec" : "price_1R0iVcRwjs1KsbvtK3hFIzVG",
          amount: 59.00
        },
        "300": {
          id: process.env.NEXT_PUBLIC_TARGET_ENV === 'production' ? "price_1QwoV4Rwjs1KsbvtpCV0OIfU" : "price_1R0iXjRwjs1KsbvtlrGsjlq8",
          amount: 74.00
        },
        "500": {
          id: process.env.NEXT_PUBLIC_TARGET_ENV === 'production' ? "price_1QwoVSRwjs1KsbvtHfSnJvv4" : "price_1R0iYuRwjs1Ksbvt04IxJfpM",
          amount: 105.00
        },
        "1000": {
          id: process.env.NEXT_PUBLIC_TARGET_ENV === 'production' ? "price_1QwoVuRwjs1Ksbvtmpxx2KgP" : "price_1R0iZkRwjs1Ksbvttrg1BoLb",
          amount: 160.00
        }
      },
      onetime: {
        "100": {
          id: process.env.NEXT_PUBLIC_TARGET_ENV === 'production' ? "price_1QyZ11Rwjs1KsbvtHsJnKlAP" : "price_1R0iaERwjs1KsbvtLR7ZGywu",
          amount: 49.00
        },
        "200": {
          id: process.env.NEXT_PUBLIC_TARGET_ENV === 'production' ? "price_1QyZ2mRwjs1KsbvtHs6pHIXs" : "price_1R0ibbRwjs1KsbvtUaTwEjYy",
          amount: 74.00
        },
        "300": {
          id: process.env.NEXT_PUBLIC_TARGET_ENV === 'production' ? "price_1QyZ3yRwjs1KsbvtAUS7hrhr" : "price_1R0icBRwjs1KsbvtxxGqqdao",
          amount: 89.00
        },
        "500": {
          id: process.env.NEXT_PUBLIC_TARGET_ENV === 'production' ? "price_1QyZAERwjs1KsbvtqSj1yIvw" : "price_1R0ienRwjs1KsbvtTd6n0k06",
          amount: 115.00
        },
        "1000": {
          id: process.env.NEXT_PUBLIC_TARGET_ENV === 'production' ? "price_1QyZBlRwjs1Ksbvt4T4t3pOd" : "price_1R0j22Rwjs1KsbvtAltBEhzf",
          amount: 199.00
        }
      }
    },
    // Planes mostrados en la página de precios
    plans: [
      {
        // Monthly plan for 100 applications
        priceId: process.env.NEXT_PUBLIC_TARGET_ENV === 'production' ? "price_1QwoTpRwjs1KsbvtvJsfY6Mh" : "price_1R0iUvRwjs1KsbvtM3plVfZG",
        name: "100 Applications - Monthly",
        description:
          "Get 100 applications per month with our Career Boost Package.",
        price: 39.00,
        priceAnchor: null,
        features: [{ name: "100 Applications" }],
      },
      {
        // Monthly plan for 500 applications
        priceId: process.env.NEXT_PUBLIC_TARGET_ENV === 'production' ? "price_1QwoVSRwjs1KsbvtHfSnJvv4" : "price_1R0iYuRwjs1Ksbvt04IxJfpM",
        name: "500 Applications - Monthly",
        description:
          "Get 500 applications per month with our Elite Package.",
        price: 105.00,
        priceAnchor: null,
        features: [{ name: "500 Applications" }],
      },
      {
        // One-time payment plan for 100 applications
        priceId: process.env.NEXT_PUBLIC_TARGET_ENV === 'production' ? "price_1QyZ11Rwjs1KsbvtHsJnKlAP" : "price_1R0iaERwjs1KsbvtLR7ZGywu",
        name: "100 Applications - One-Time Payment",
        description: "One-time purchase for 100 applications.",
        price: 49.00,
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
    supportEmail: "help@laboro.co",
    // When someone replies to the support email, forward it to this email
    forwardRepliesTo: "help@laboro.co",
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