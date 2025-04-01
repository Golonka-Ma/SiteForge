'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface CaseStudy {
  id: number;
  title: string;
  description: string;
  category: string;
  imageSrc: string;
  slug: string;
  stats: Array<{
    value: string;
    label: string;
  }>;
}

// Przykładowe dane realizacji
const caseStudies: CaseStudy[] = [
  {
    id: 1,
    title: 'E-commerce dla sklepu z odzieżą',
    category: 'E-commerce',
    description: 'Nowoczesny sklep internetowy z zaawansowanymi funkcjami filtrowania i wyszukiwania produktów.',
    stats: [
      { value: '150%', label: 'wzrost sprzedaży' },
      { value: '3 miesiące', label: 'czas realizacji' }
    ],
    imageSrc: '/images/case-studies/ecommerce.jpg',
    slug: 'ecommerce-dla-sklepu-z-odzieza'
  },
  {
    id: 2,
    title: 'Landing page dla agencji marketingowej',
    category: 'Landing Page',
    description: 'Przekonujący landing page z formularzem leadowym i animowanymi elementami.',
    stats: [
      { value: '200%', label: 'wzrost leadów' },
      { value: '2 tygodnie', label: 'czas realizacji' }
    ],
    imageSrc: '/images/case-studies/landing.jpg',
    slug: 'landing-page-dla-agencji-marketingowej'
  },
  {
    id: 3,
    title: 'Aplikacja webowa dla startupu',
    category: 'Aplikacja Webowa',
    description: 'Kompleksowa aplikacja webowa z systemem zarządzania użytkownikami i analityką.',
    stats: [
      { value: '300%', label: 'wzrost wydajności' },
      { value: '4 miesiące', label: 'czas realizacji' }
    ],
    imageSrc: '/images/case-studies/webapp.jpg',
    slug: 'aplikacja-webowa-dla-startupu'
  }
];

interface CaseStudyCardProps {
  study: CaseStudy;
  variants: {
    hidden: { opacity: number; y: number };
    visible: { opacity: number; y: number; transition: { duration: number } };
  };
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

export default function CaseStudies() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section id="realizacje" className="py-20 bg-gray-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-500/5 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary-500/5 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-accent-500/5 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-4000"></div>
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50/0 via-gray-50/90 to-gray-50"></div>

      {/* Content */}
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-heading">
            Nasze realizacje
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Zobacz, jak pomogliśmy innym firmom osiągnąć sukces online
          </p>
        </motion.div>

        {/* Case studies grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {caseStudies.map((study) => (
            <CaseStudyCard key={study.id} study={study} variants={itemVariants} />
          ))}
        </motion.div>

        {/* View all case studies button */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center mt-12"
        >
          <Link
            href="/realizacje"
            className="inline-flex items-center px-8 py-4 bg-accent-500 text-white rounded-full font-medium hover:bg-accent-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2"
          >
            Zobacz wszystkie realizacje
            <svg
              className="w-5 h-5 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function CaseStudyCard({ study, variants }: CaseStudyCardProps) {
  return (
    <motion.article
      variants={variants}
      className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
    >
      <div className="relative aspect-w-16 aspect-h-9">
        <Image
          src={study.imageSrc}
          alt={study.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{ objectFit: 'cover' }}
          className="transform hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-4 left-4 right-4">
          <span className="bg-accent-500 text-white px-4 py-1 rounded-full text-sm font-medium">
            {study.category}
          </span>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-3 font-heading">
          {study.title}
        </h3>
        <p className="text-gray-600 mb-4">
          {study.description}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-accent-500">{study.stats[0].value}</span>
              <span className="text-sm text-gray-500">{study.stats[0].label}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-accent-500">{study.stats[1].value}</span>
              <span className="text-sm text-gray-500">{study.stats[1].label}</span>
            </div>
          </div>
          <Link
            href={`/realizacje/${study.slug}`}
            className="inline-flex items-center text-accent-500 hover:text-accent-600 font-medium group"
          >
            Szczegóły
            <svg
              className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
