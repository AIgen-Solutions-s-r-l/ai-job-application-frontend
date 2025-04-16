'use client'

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

export default function Home() {
  return (
    <>
      <Header />
      <main>
        {/* <Hero /> */}
        <Features />
        <Automate />
        <Clouds />
        <Spotlight />
        <Testimonials />
        <FAQ />
        <GetHired />
        {/* <Contacts /> */}
      </main>
      <Footer />
    </>
  );
}