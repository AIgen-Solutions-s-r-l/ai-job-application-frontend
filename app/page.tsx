'use client';

import React from 'react';
import { Header } from "@/components/landing/Header";
import { Features } from '@/components/landing/Features';
import { Clouds } from '@/components/landing/Clouds';
import { Spotlight } from '@/components/landing/Spotlight';
import { Automate } from '@/components/landing/Automate';
import { Testimonials } from '@/components/landing/Testimonials';
import { FAQ } from '@/components/landing/FAQ';
import { GetHired } from '@/components/landing/GetHired';
import { Footer } from '@/components/landing/Footer';
import { Hero } from '@/components/landing/Hero';
import { renderBreadcrumbSchema, getSEOTags } from "@/libs/seo"; // adjust path if needed
import type { Metadata } from "next";

export const metadata: Metadata = getSEOTags({
  title: "LABORO | Automate Your Job Applications with AI",
  description: "LABORO helps you streamline job applications and interview prep with AI.",
  canonicalUrlRelative: "/",
});

export default function Home() {
  return (
    <>
      {renderBreadcrumbSchema([
        { name: "Automate Your Job Applications with AI", url: "https://laboro.co/" },
      ])}
      <Header />
      <main>
        <Hero />
        <Features />
        <Automate />
        <Clouds />
        <Spotlight />
        <Testimonials />
        <FAQ />
        <GetHired />
      </main>
      <Footer />
    </>
  );
}
