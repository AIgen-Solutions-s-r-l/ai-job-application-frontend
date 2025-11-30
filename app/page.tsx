'use client';

import React from 'react';
import Head from 'next/head';
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
import { renderBreadcrumbSchema } from "@/libs/seo";

export default function Home() {
  return (
    <>
      <Head>
        <title>{process.env.NEXT_PUBLIC_APP_NAME || 'Job Application Platform'} | AI-Driven Job Board</title>
        <meta
          name="description"
          content="AI-powered job application engine that finds the best jobs for your profile and generates tailored CVs."
        />
      </Head>

      {renderBreadcrumbSchema([
        { name: "Automate Your Job Applications with AI", url: process.env.SITE_URL || '' },
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
