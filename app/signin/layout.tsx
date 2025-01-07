import { ReactNode } from "react";
import config from "@/config";
import { getSEOTags } from "@/libs/seo";

export const metadata = getSEOTags({
  title: `Sign-in to ${config.appName}`,
  canonicalUrlRelative: "/auth/signin",
});

export const dynamic = "force-dynamic";

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}