'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, Variants } from 'framer-motion';

interface Service {
  id: number;
  icon: string;
  title: string;
  description: string;
  features: string[];
  color: 'primary' | 'secondary' | 'accent';
  forIndustries?: string[];
  roi?: string[];
  premium?: boolean;
}

interface ServiceCardProps {
  service: Service;
  variants: Variants;
}

// Filar 1: Fundamenty Cyfrowe
const digitalFoundationsServices: Service[] = [
  {
    id: 1,
    icon: 'window-maximize',
    title: 'Profesjonalne Strony Internetowe',
    description: 'Tworzymy szybkie, responsywne i zoptymalizowane pod SEO strony internetowe, które są cyfrową wizytówką Twojej marki i solidnym fundamentem dla dalszych działań.',
    features: [
      'Indywidualny projekt graficzny UI/UX',
      'Nowoczesny design (RWD)',
      'Optymalizacja SEO On-Page',
      'System zarządzania treścią (CMS)',
      'Certyfikat SSL i zabezpieczenia',
      'Wsparcie techniczne po wdrożeniu'
    ],
    color: 'primary'
  },
  {
    id: 2,
    icon: 'rocket',
    title: 'Kompleksowy Start w Online',
    description: 'Pełen pakiet dla nowych firm lub marek przechodzących rebranding. Zapewniamy wszystko, czego potrzebujesz, by z impetem wejść na rynek cyfrowy.',
    features: [
      'Strona internetowa z blogiem',
      'Projekt logo i kluczowe elementy identyfikacji wizualnej',
      'Konfiguracja analityki internetowej',
      'Stworzenie i optymalizacja profili w social media',
      'Pakiet startowych materiałów graficznych',
      'Wizytówka Google Moja Firma'
    ],
    color: 'primary'
  },
  {
    id: 3,
    icon: 'bullseye',
    title: 'Strony Konwertujące (Landing Pages)',
    description: 'Projektujemy strony docelowe z jednym celem: maksymalizacją konwersji. Idealne dla kampanii reklamowych, promocji produktów i generowania leadów.',
    features: [
      'Projekt zorientowany na konwersję (CRO)',
      'Testy A/B w celu optymalizacji',
      'Szybkie ładowanie i mobile-first',
      'Integracja z systemami CRM i analityką',
      'Perswazyjny copywriting',
      'Analiza map ciepła i zachowań użytkowników'
    ],
    color: 'primary'
  }
];

// Filar 2: Wzrost i Zaangażowanie
const growthAndEngagementServices: Service[] = [
  {
    id: 4,
    icon: 'users-cog',
    title: 'Marketing w Social Media',
    description: 'Budujemy zaangażowane społeczności wokół Twojej marki. Tworzymy strategie, kreacje i prowadzimy profile, które realnie przekładają się na wyniki biznesowe.',
    features: [
      'Audyt i strategia komunikacji',
      'Tworzenie treści (content plan)',
      'Zarządzanie profilami (Facebook, Instagram, LinkedIn)',
      'Community management i interakcja z fanami',
      'Prowadzenie kampanii Social Media Ads',
      'Regularne raportowanie i analiza wyników'
    ],
    color: 'secondary'
  },
  {
    id: 5,
    icon: 'ad',
    title: 'Kampanie Reklamowe (Google & Social Ads)',
    description: 'Precyzyjnie docieramy do Twoich potencjalnych klientów dzięki kampaniom opartym na danych. Optymalizujemy budżety, by każda złotówka pracowała na Twój sukces.',
    features: [
      'Kampanie Google Ads (Search, Display, YouTube)',
      'Kampanie Meta Ads (Facebook, Instagram)',
      'Analityka i śledzenie konwersji',
      'Optymalizacja stawek i ROI',
      'Retargeting i budowanie lejków sprzedażowych',
      'Testy A/B kreacji reklamowych'
    ],
    color: 'secondary'
  },
  {
    id: 6,
    icon: 'film',
    title: 'Produkcja Kreatywna (Wideo i Animacje)',
    description: 'Opowiadamy historie, które sprzedają. Tworzymy przyciągające uwagę spoty reklamowe, animacje produktowe i content wideo, który wyróżni Cię na tle konkurencji.',
    features: [
      'Spoty reklamowe do social media',
      'Animacje produktowe i explainer videos',
      'Krótkie formy wideo (Reels, Shorts)',
      'Scenariusz i koncepcja kreatywna',
      'Profesjonalny montaż i postprodukcja',
      'Formaty dopasowane do każdej platformy'
    ],
    color: 'secondary'
  }
];

// Filar 3: Innowacje i Automatyzacja
const innovationAndAutomationServices: Service[] = [
  {
    id: 7,
    icon: 'cogs',
    title: 'Automatyzacja Procesów Biznesowych',
    description: 'Eliminujemy powtarzalne i czasochłonne zadania. Projektujemy i wdrażamy automatyzacje, które oszczędzają czas, redukują koszty i minimalizują ryzyko błędów.',
    features: [
      'Analiza i mapowanie procesów',
      'Integracja systemów i API',
      'Automatyzacja marketingu i sprzedaży',
      'Automatyczne generowanie raportów i dokumentów',
      'Wdrożenia z wykorzystaniem platform no-code/low-code',
      'Inteligentne przepływy pracy (workflows)'
    ],
    forIndustries: ['E-commerce', 'Finanse', 'Produkcja', 'Usługi B2B'],
    roi: ['Oszczędność do 25 godzin pracy tygodniowo', 'Redukcja błędów ludzkich o 90%'],
    color: 'accent',
    premium: true
  },
  {
    id: 8,
    icon: 'brain',
    title: 'Dedykowane Aplikacje Webowe z AI',
    description: 'Tworzymy "szyte na miarę" aplikacje webowe i systemy, które rozwiązują specyficzne problemy biznesowe, wykorzystując potencjał sztucznej inteligencji.',
    features: [
      'Inteligentne chatboty i asystenci AI',
      'Systemy rekomendacji produktów',
      'Analiza danych i predykcje',
      'Bezpieczna autoryzacja i panel administracyjny',
      'Architektura PWA dla doświadczenia mobilnego',
      'Pełna integracja z istniejącą infrastrukturą'
    ],
    forIndustries: ['E-commerce', 'Fintech', 'Logistyka', 'SaaS'],
    roi: ['Wzrost konwersji dzięki personalizacji o 35%', 'Automatyzacja 70% zapytań do supportu'],
    color: 'accent',
    premium: true
  },
  {
    id: 9,
    icon: 'clinic-medical',
    title: 'System AI dla Branży Medycznej',
    description: 'Inteligentna platforma dla klinik i gabinetów, która automatyzuje obsługę pacjenta, optymalizuje grafiki i podnosi jakość świadczonych usług medycznych.',
    features: [
      'Inteligentny system rezerwacji wizyt 24/7',
      'Chatbot medyczny do wstępnej kwalifikacji',
      'Automatyczne przypomnienia SMS/email o wizytach',
      'Portal pacjenta z historią leczenia',
      'Analiza obłożenia i raporty zarządcze',
      'Integracja z systemami gabinetowymi (np. Gabinet.gov.pl)'
    ],
    forIndustries: ['Kliniki stomatologiczne', 'Przychodnie specjalistyczne', 'Centra fizjoterapii'],
    roi: ['Redukcja nieobecności pacjentów o 60%', 'Oszczędność 15-20 godzin pracy recepcji miesięcznie'],
    color: 'accent',
    premium: true
  }
];

export default function Services() {
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
      transition: { duration: 0.4 }
    }
  };

  return (
    <section id="oferta" className="py-20 bg-gray-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-500/5 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary-500/5 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-accent-500/5 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-4000"></div>
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50/0 via-gray-50/90 to-gray-50"></div>

      {/* Subtle pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: "url('data:image/svg+xml,%3Csvg xmlns=\"http://www.w3.org/2000/svg\" width=\"100\" height=\"100\" viewBox=\"0 0 100 100\"%3E%3Cg fill=\"%23000000\" fill-opacity=\"0.1\"%3E%3Cpath d=\"M0 0h50v50H0V0zm50 50h50v50H50V50zm0-50h2l-2 2V0zm0 4l4-4h2l-6 6V4zm0 4l8-8h2L50 10V8zm0 4L62 0h2L50 14v-2zm0 4L66 0h2L50 18v-2zm0 4L70 0h2L50 22v-2zm0 4L74 0h2L50 26v-2zm0 4L78 0h2L50 30v-2zm0 4L82 0h2L50 34v-2zm0 4L86 0h2L50 38v-2zm0 4L90 0h2L50 42v-2zm0 4L94 0h2L50 46v-2zm0 4L98 0h2L50 50v-2zM0 50h2l-2 2v-2zm4 4l4-4h2l-6 6v-2zm4 4l8-8h2L8 58v-2zm4 4l12-12h2L12 62v-2zm4 4l16-16h2L16 66v-2zm4 4l20-20h2L20 70v-2zm4 4l24-24h2L24 74v-2zm4 4l28-28h2L28 78v-2zm4 4l32-32h2L32 82v-2zm4 4l36-36h2L36 86v-2zm4 4l40-40h2L40 90v-2zm4 4l44-44h2L44 94v-2zm4 4l48-48h2L48 98v-2zm4 4l52-52h2L52 100v-2z\"%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E')"
        }}
      ></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Header Section */}
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <motion.span 
            className="inline-block bg-accent-100 text-accent-700 px-4 py-2 rounded-xl text-sm font-medium mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            Nasza oferta
          </motion.span>
          <motion.h2 
            className="text-4xl lg:text-5xl font-bold text-gray-900 font-heading mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            Kreacja napędzana danymi. Technologia, która zachwyca.
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            Nie zgadujemy. Analizujemy twarde dane, by tworzyć porywające kampanie i projektować inteligentne systemy, które nie tylko działają, ale i budują trwałe relacje z klientami.
          </motion.p>
        </motion.div>

        {/* Success Metrics */}
        <motion.div 
          className="bg-white rounded-2xl shadow-lg p-8 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Wzrost, który możesz policzyć.</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-gray-50 rounded-xl">
              <div className="text-4xl font-bold text-accent-600 mb-2">+35%</div>
              <p className="text-gray-600 font-medium">Średni wzrost konwersji</p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-xl">
              <div className="text-4xl font-bold text-accent-600 mb-2">-40%</div>
              <p className="text-gray-600 font-medium">Redukcja kosztów obsługi</p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-xl">
              <div className="text-4xl font-bold text-accent-600 mb-2">+68%</div>
              <p className="text-gray-600 font-medium">Wzrost jakości leadów</p>
            </div>
          </div>
        </motion.div>

        {/* Filar 1: Fundamenty Cyfrowe */}
        <motion.div 
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <span className="inline-block bg-primary-100 text-primary-700 px-4 py-2 rounded-xl text-sm font-medium mb-4">
              Fundamenty Cyfrowe
            </span>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Solidna podstawa Twojej obecności online
            </h3>
            <p className="text-gray-600">
              Niezbędne usługi do zbudowania profesjonalnego wizerunku w internecie.
            </p>
          </motion.div>
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {digitalFoundationsServices.map((service) => (
              <ServiceCard key={service.id} service={service} variants={itemVariants} />
            ))}
          </motion.div>
        </motion.div>

        {/* Filar 2: Wzrost i Zaangażowanie */}
        <motion.div 
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <span className="inline-block bg-secondary-100 text-secondary-700 px-4 py-2 rounded-xl text-sm font-medium mb-4">
              Wzrost i Zaangażowanie
            </span>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Przyciągnij klientów i rozwijaj swój biznes
            </h3>
            <p className="text-gray-600">
              Kreatywne i technologiczne działania, które zwiększają sprzedaż i budują silną markę.
            </p>
          </motion.div>
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {growthAndEngagementServices.map((service) => (
              <ServiceCard key={service.id} service={service} variants={itemVariants} />
            ))}
          </motion.div>
        </motion.div>

        {/* Filar 3: Innowacje i Automatyzacja */}
        <motion.div 
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <span className="inline-block bg-accent-100 text-accent-700 px-4 py-2 rounded-xl text-sm font-medium mb-4">
              Innowacje i Automatyzacja
            </span>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Zdobądź przewagę dzięki technologii
            </h3>
            <p className="text-gray-600">
              Zaawansowane rozwiązania AI i automatyzacje, które optymalizują procesy i napędzają innowacje.
            </p>
          </motion.div>
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {innovationAndAutomationServices.map((service) => (
              <ServiceCard key={service.id} service={service} variants={itemVariants} />
            ))}
          </motion.div>
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          className="mt-20 text-center relative z-20 bg-white rounded-2xl shadow-lg p-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            Nie znalazłeś odpowiedniej oferty?
          </h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Skontaktuj się z nami, a przygotujemy indywidualną propozycję dopasowaną do potrzeb Twojego biznesu.
          </p>
          <Link 
            href="#kontakt" 
            className="inline-flex items-center bg-gradient-to-r from-accent-500 to-accent-600 text-white px-8 py-4 rounded-xl font-medium text-lg hover:shadow-lg transform hover:-translate-y-1 transition-all focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2"
          >
            Umów konsultację
            <svg 
              className="h-5 w-5 ml-2 transition-transform duration-200 group-hover:translate-x-1" 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function ServiceCard({ service, variants }: ServiceCardProps) {
  // Simplified color mapping
  const colorClasses = {
    primary: 'border-green-500 hover:bg-green-50/30',
    secondary: 'border-green-600 hover:bg-green-50/30',
    accent: 'border-green-400 hover:bg-green-50/30'
  };

  const iconColorClasses = {
    primary: 'bg-green-100 text-green-600',
    secondary: 'bg-green-100 text-green-600',
    accent: 'bg-green-100 text-green-600'
  };

  const checkColorClasses = {
    primary: 'text-green-500',
    secondary: 'text-green-600',
    accent: 'text-green-400'
  };

  const buttonColorClasses = {
    primary: 'bg-green-600 hover:bg-green-700',
    secondary: 'bg-green-600 hover:bg-green-700',
    accent: 'bg-green-600 hover:bg-green-700'
  };

  const tagColorClasses = {
    primary: 'bg-green-50 text-green-700',
    secondary: 'bg-green-50 text-green-700',
    accent: 'bg-green-50 text-green-700'
  };
  
  return (
    <motion.div 
      variants={variants}
      className={`group bg-white rounded-2xl shadow-md p-8 hover:shadow-xl transition-all duration-300 relative overflow-hidden flex flex-col ${
        service.premium ? `border-l-4 ${colorClasses[service.color]}` : ''
      }`}
    >
      {/* Decorative background */}
      <div className={`absolute inset-0 bg-${service.color}-500 opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
      
      {/* Main content wrapper */}
      <div className="flex flex-col flex-grow">
        {/* Icon */}
        <div className={`w-16 h-16 ${iconColorClasses[service.color]} rounded-xl flex items-center justify-center mb-6 transform group-hover:scale-110 transition-transform duration-300`}>
          <i className={`fas fa-${service.icon} text-2xl`}></i>
        </div>
        
        {/* Content */}
        <h3 className="text-xl font-bold text-gray-900 mb-3 font-heading">{service.title}</h3>
        <p className="text-gray-600 mb-6">{service.description}</p>
        
        {/* Features */}
        <ul className="space-y-3 mb-8">
          {service.features.map((feature: string, index: number) => (
            <li key={index} className="flex items-center text-gray-600">
              <i className={`fas fa-check ${checkColorClasses[service.color]} mr-2`}></i>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        
        {/* Industries - only for premium services */}
        {service.forIndustries && (
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Dedykowane dla:</h4>
            <div className="flex flex-wrap gap-2">
              {service.forIndustries.map((industry, index) => (
                <span key={index} className={`text-xs ${tagColorClasses[service.color]} px-3 py-1 rounded-full`}>
                  {industry}
                </span>
              ))}
            </div>
          </div>
        )}
        
        {/* ROI examples - only for premium services */}
        {service.roi && (
          <div className="mb-8">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Przykładowe rezultaty:</h4>
            <ul className="space-y-2">
              {service.roi.map((result, index) => (
                <li key={index} className="flex items-center text-gray-600 text-sm">
                  <i className={`fas fa-chart-line ${checkColorClasses[service.color]} mr-2`}></i>
                  <span>{result}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      
      {/* CTA - now properly aligned at the bottom with correct z-index */}
      <div className="mt-8 relative z-10">
        <a 
          href="#kontakt" 
          className="relative z-10 block w-full cursor-pointer bg-gradient-to-r from-accent-500 to-accent-600 text-white px-8 py-4 rounded-xl font-medium text-lg hover:shadow-lg transform hover:-translate-y-1 transition-all focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2 flex items-center justify-center"
          style={{ zIndex: 20 }}
          onClick={(e) => {
            e.stopPropagation();
            window.location.href = '#kontakt';
          }}
        >
          <span className="flex-1 text-center">
            {service.premium ? 'Bezpłatna konsultacja' : 'Bezpłatna wycena'}
          </span>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5 ml-2 transition-transform duration-200 hover:translate-x-1" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </a>
      </div>
    </motion.div>
  );
}