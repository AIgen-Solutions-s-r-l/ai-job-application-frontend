import Link from "next/link";
import { getSEOTags } from "@/libs/seo";
import config from "@/config";

// CHATGPT PROMPT TO GENERATE YOUR TERMS & SERVICES — replace with your own data 👇

// 1. Go to https://chat.openai.com/
// 2. Copy paste bellow
// 3. Replace the data with your own (if needed)
// 4. Paste the answer from ChatGPT directly in the <pre> tag below

// You are an excellent lawyer.

// I need your help to write a simple Terms & Services for my website. Here is some context:
// - Website: https://shipfa.st
// - Name: ShipFast
// - Contact information: marc@shipfa.st
// - Description: A JavaScript code boilerplate to help entrepreneurs launch their startups faster
// - Ownership: when buying a package, users can download code to create apps. They own the code but they do not have the right to resell it. They can ask for a full refund within 7 day after the purchase.
// - User data collected: name, email and payment information
// - Non-personal data collection: web cookies
// - Link to privacy-policy: https://shipfa.st/privacy-policy
// - Governing Law: France
// - Updates to the Terms: users will be updated by email

// Please write a simple Terms & Services for my site. Add the current date. Do not add or explain your reasoning. Answer:

export const metadata = getSEOTags({
  title: `Terms and Conditions | ${config.appName}`,
  canonicalUrlRelative: "/tos",
});

const TOS = () => {
  return (
    <main className="max-w-xl mx-auto">
      <div className="p-5">
        <Link href="/" className="btn btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M15 10a.75.75 0 01-.75.75H7.612l2.158 1.96a.75.75 0 11-1.04 1.08l-3.5-3.25a.75.75 0 010-1.08l3.5-3.25a.75.75 0 111.04 1.08L7.612 9.25h6.638A.75.75 0 0115 10z"
              clipRule="evenodd"
            />
          </svg>
          Back
        </Link>
        <h1 className="text-3xl font-extrabold pb-6">
          Terms and Conditions for {config.appName}
        </h1>

        <pre
          className="leading-relaxed whitespace-pre-wrap"
          style={{ fontFamily: "sans-serif" }}
        >
          {`Last updated: October 11, 2024

Welcome to aihawk (“we”, “us”, or “our”). By accessing or using our website located at https://aihawk.co (the “Service”), you agree to be bound by these Terms & Services (“Terms”). If you do not agree to these Terms, please do not use the Service.

1. Description of Service

aihawk automates job applications on LinkedIn, allowing users to personalize their applications with AI-generated cover letters and responses. The Service is intended for personal use only.

2. Eligibility

You must be at least 18 years old to use the Service. By using the Service, you represent and warrant that you have the legal capacity to enter into a binding agreement.

3. User Obligations

	•	Personal Use Only: You may use the Service solely for your personal job applications. You may not resell, redistribute, or exploit the Service for any commercial purposes.
	•	Account Security: You are responsible for maintaining the confidentiality of your account information, including your LinkedIn credentials.

4. Payment and Refund Policy

	•	Payment: Certain features of the Service may require payment. By making a purchase, you agree to provide accurate payment information.
	•	Refunds: If you have not used the Service, you may request a refund within 7 days of purchase by contacting us at david@aihawk.co.

5. Data Collection and Privacy

	•	Personal Data: We collect your name, email, LinkedIn credentials, and payment information to provide the Service.
	•	Non-Personal Data: We use web cookies to enhance your experience.
	•	Privacy Policy: For more details on how we collect, use, and protect your data, please review our Privacy Policy.

6. Intellectual Property

All content and materials on the Service are the property of aihawk and are protected by applicable intellectual property laws. Unauthorized use is prohibited.

7. Modifications to the Service and Terms

We reserve the right to modify or discontinue the Service at any time. We may update these Terms from time to time and will notify you of any changes via email.

8. Governing Law

These Terms are governed by the laws of Spain, without regard to its conflict of law principles.

9. Contact Information

If you have any questions or concerns about these Terms, please contact us at david@aihawk.co.

Thank you for using aihawk!`}
        </pre>
      </div>
    </main>
  );
};

export default TOS;
