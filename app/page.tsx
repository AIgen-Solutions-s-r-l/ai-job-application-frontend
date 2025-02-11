import React from 'react';
import { Header } from "@/components/landing/Header";
import { Hero } from '@/components/landing/Hero';
import { Features } from '@/components/landing/Features';
import { Clouds } from '@/components/landing/Clouds';
import { Spotlight } from '@/components/landing/Spotlight';
import { Automate } from '@/components/landing/Automate';
import { Testimonials } from '@/components/landing/Testimonials';
import { FAQ } from '@/components/landing/FAQ';
import { GetHired } from '@/components/landing/GetHired';
import { Contacts } from '@/components/landing/Contacts';
import { Footer } from '@/components/landing/Footer';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Features />
        <Clouds />
        <Spotlight />
        <Automate />
        <Testimonials />
        <FAQ />
        <GetHired />
        <Contacts />
      </main>
      <Footer />
    </>
  );
}