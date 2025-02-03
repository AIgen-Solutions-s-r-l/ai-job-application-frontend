import Link from "next/link";
import { getSEOTags } from "@/libs/seo";
import config from "@/config";

// CHATGPT PROMPT TO GENERATE YOUR PRIVACY POLICY — replace with your own data 👇

// 1. Go to https://chat.openai.com/
// 2. Copy paste bellow
// 3. Replace the data with your own (if needed)
// 4. Paste the answer from ChatGPT directly in the <pre> tag below

// You are an excellent lawyer.

// I need your help to write a simple privacy policy for my website. Here is some context:
// - Website: https://shipfa.st
// - Name: ShipFast
// - Description: A JavaScript code boilerplate to help entrepreneurs launch their startups faster
// - User data collected: name, email and payment information
// - Non-personal data collection: web cookies
// - Purpose of Data Collection: Order processing
// - Data sharing: we do not share the data with any other parties
// - Children's Privacy: we do not collect any data from children
// - Updates to the Privacy Policy: users will be updated by email
// - Contact information: marc@shipfa.st

// Please write a simple privacy policy for my site. Add the current date.  Do not add or explain your reasoning. Answer:

export const metadata = getSEOTags({
  title: `Privacy Policy | ${config.appName}`,
  canonicalUrlRelative: "/privacy-policy",
});

const PrivacyPolicy = () => {
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
          </svg>{" "}
          Back
        </Link>
        <h1 className="text-3xl font-extrabold pb-6">
          Privacy Policy for {config.appName}
        </h1>

        <pre
          className="leading-relaxed whitespace-pre-wrap"
          style={{ fontFamily: "sans-serif" }}
        >
          {`Last updated: October 11, 2024

Thank you for choosing laboro (“we,” “us,” or “our”). This Privacy Policy explains how we collect, use, and protect your personal information when you use our website https://laboro.co (the “Service”). By accessing or using the Service, you agree to the terms of this Privacy Policy.

1. Information We Collect

Personal Data

We collect the following personal information:

	•	Name
	•	Email address
	•	Payment information

Non-Personal Data

We use web cookies to collect non-personal data to enhance your user experience.

2. Purpose of Data Collection

We collect your data for the following purposes:

	•	Order Processing: To process your purchases and provide the Service.
	•	Communication: To contact you regarding updates or issues related to the Service.

3. Data Sharing

We do not share your personal data with any third parties unless required by law.

4. Children’s Privacy

Our Service is not intended for individuals under the age of 18. We do not knowingly collect personal information from children.

5. Security

We take reasonable measures to protect your personal information from unauthorized access or disclosure. However, no method of transmission over the internet or electronic storage is completely secure.

6. Changes to This Privacy Policy

We may update our Privacy Policy from time to time. We will notify you of any changes by sending an email to the address you have provided.

7. Contact Us

If you have any questions or concerns about this Privacy Policy, please contact us at david@laboro.co.

By using laboro, you consent to the terms of this Privacy Policy.`}
        </pre>
      </div>
    </main>
  );
};

export default PrivacyPolicy;
