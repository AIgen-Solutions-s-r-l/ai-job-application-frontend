import AboutUsPage from "@/components/about-us/AboutUs";
import { renderBreadcrumbSchema, getSEOTags } from "@/libs/seo"; // adjust path if necessary
import type { Metadata } from "next";

export const metadata: Metadata = getSEOTags({
  title: "About Us | LABORO",
  description: "Learn more about the team and mission behind LABORO.",
  canonicalUrlRelative: "/about-us",
});

const AboutUs = () => {
  return (
    <>
      {renderBreadcrumbSchema([
        { name: "Automate your Job Applications", url: "https://laboro.co/" },
        { name: "About Us", url: "https://laboro.co/about-us" },
      ])}
      <AboutUsPage />
    </>
  );
};

export default AboutUs;
