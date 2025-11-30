import AboutUsPage from "@/components/about-us/AboutUs";
import { renderBreadcrumbSchema, getSEOTags } from "@/libs/seo"; // adjust path if necessary
import type { Metadata } from "next";

export const metadata: Metadata = getSEOTags({
  title: `About Us | ${process.env.NEXT_PUBLIC_APP_NAME || 'Job Application Platform'}`,
  description: "Learn more about the team and mission behind our platform.",
  canonicalUrlRelative: "/about-us",
});

const AboutUs = () => {
  return (
    <>
      {renderBreadcrumbSchema([
        { name: "Automate your Job Applications", url: process.env.SITE_URL || '' },
        { name: "About Us", url: `${process.env.SITE_URL || ''}/about-us` },
      ])}
      <AboutUsPage />
    </>
  );
};

export default AboutUs;
