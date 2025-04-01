import { Suspense } from 'react';
import Hero from '@/components/sections/Hero';
import Services from '@/components/sections/Services';
import CaseStudies from '@/components/sections/CaseStudies';
import Testimonials from '@/components/sections/Testimonials';
import Blog from '@/components/sections/Blog';
import Faq from '@/components/sections/Faq';
import Contact from '@/components/sections/Contact';

export default function Home() {
  return (
    <>
      {/* Hero Section - First Impression */}
      <Hero />

      {/* Services Section - What We Offer */}
      <Services />

      {/* Case Studies Section - Our Work */}
      <Suspense fallback={<div className="h-96 flex items-center justify-center">Ładowanie realizacji...</div>}>
        <CaseStudies />
      </Suspense>

      {/* Testimonials Section - Social Proof */}
      <Testimonials />

      {/* Blog Section - Our Expertise */}
      <Suspense fallback={<div className="h-96 flex items-center justify-center">Ładowanie bloga...</div>}>
        <Blog />
      </Suspense>

      {/* FAQ Section - Common Questions */}
      <Faq />

      {/* Contact Section - Call to Action */}
      <Contact />
    </>
  );
}