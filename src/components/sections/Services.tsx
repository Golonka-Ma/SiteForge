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

// Usługi standardowe
const standardServices: Service[] = [
  {
    id: 1,
    icon: 'laptop',
    title: 'Strony wizytówki',
    description: 'Idealne rozwiązanie dla małych firm i lokalnych biznesów, które potrzebują profesjonalnej obecności online.',
    features: [
      'Strona do 5 podstron',
      'Responsywny design',
      'Podstawowa optymalizacja SEO',
      'Formularz kontaktowy',
      'Integracja z Google Analytics',
      '30 dni wsparcia technicznego'
    ],
    color: 'accent'
  },
  {
    id: 2,
    icon: 'rocket',
    title: 'Pakiet startowy dla biznesu',
    description: 'Kompleksowe rozwiązanie dla nowych przedsiębiorców, którzy chcą dynamicznie zaistnieć w przestrzeni cyfrowej.',
    features: [
      'Strona internetowa z blogiem',
      'Wizytówka Google Business',
      'Tworzenie profili w mediach społecznościowych',
      'Projekt logo i identyfikacja wizualna',
      'Pakiet startowy postów social media',
      'Profesjonalny copywriting'
    ],
    color: 'accent'
  },
  {
    id: 3,
    icon: 'chart-line',
    title: 'Landing Pages',
    description: 'Strony zoptymalizowane pod konwersję, idealne do generowania leadów i promowania produktów oraz usług.',
    features: [
      'A/B testing',
      'Analityka konwersji',
      'Integracja z CRM',
      'Optymalizacja pod wyszukiwarki',
      'Formularze lead generation',
      '60 dni wsparcia technicznego'
    ],
    color: 'accent'
  }
];

// Usługi premium
const premiumServices: Service[] = [
  {
    id: 4,
    icon: 'code',
    title: 'Aplikacje webowe AI',
    description: 'Zaawansowane systemy oparte o sztuczną inteligencję, dostosowane do indywidualnych potrzeb Twojego biznesu.',
    features: [
      'Autoryzacja użytkowników',
      'Integracja z systemami firm',
      'Panel administracyjny',
      'Architektura SPA/PWA',
      'Chatbot AI z asystentem',
      'Inteligentny system rezerwacji'
    ],
    forIndustries: ['Branża finansowa', 'Kancelarie prawne', 'Gabinety medyczne'],
    roi: ['Redukcja czasu obsługi klienta o 40%', 'Wzrost konwersji o 35%'],
    color: 'accent',
    premium: true
  },
  {
    id: 5,
    icon: 'brain',
    title: 'System AI dla klinik',
    description: 'Dedykowane rozwiązanie dla przychodni i gabinetów medycznych zwiększające efektywność obsługi pacjenta.',
    features: [
      'Inteligentny system rezerwacji',
      'Chatbot kwalifikujący pacjentów',
      'Automatyczne przypomnienia',
      'Portal pacjenta',
      'Analiza danych i raporty',
      'Integracja z systemami medycznymi'
    ],
    forIndustries: ['Kliniki stomatologiczne', 'Przychodnie specjalistyczne', 'Prywatne praktyki lekarskie'],
    roi: ['Redukcja nieodebranych wizyt o 60%', 'Oszczędność 15-20 godzin pracy recepcji miesięcznie'],
    color: 'accent',
    premium: true
  },
  {
    id: 6,
    icon: 'car',
    title: 'Systemy dla lokalnych biznesów',
    description: 'Inteligentne rozwiązania zwiększające efektywność warsztatów samochodowych i lokalnych biznesów usługowych.',
    features: [
      'System rezerwacji online 24/7',
      'Automatyczne powiadomienia dla klientów',
      'Zarządzanie harmonogramem prac',
      'Historia obsługi i kartoteka klienta',
      'Moduł generowania wycen i faktur',
      'Aplikacja mobilna dla klientów'
    ],
    forIndustries: ['Warsztaty samochodowe', 'Usługi mechaniczne', 'Usługi lokalne', 'Małe firmy usługowe'],
    roi: ['Redukcja nieodebranych wizyt o 50%', 'Wzrost liczby zleceń o 35% dzięki rezerwacjom online', 'Oszczędność 20+ godzin miesięcznie na administracji'],
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
            className="text-4xl font-bold text-gray-900 font-heading mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            Inteligentne rozwiązania dla Twojego biznesu
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            Od prostych stron internetowych po zaawansowane systemy wspomagane sztuczną inteligencją, dopasowane do specyficznych potrzeb Twojej branży.
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
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Realne wyniki naszych klientów</h3>
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

        {/* Standard Services Section */}
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
              Rozwiązania standardowe
            </span>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Podstawowe usługi dla każdego biznesu
            </h3>
            <p className="text-gray-600">
              Idealne dla firm, które chcą rozpocząć swoją obecność w internecie
            </p>
          </motion.div>
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {standardServices.map((service) => (
              <ServiceCard key={service.id} service={service} variants={itemVariants} />
            ))}
          </motion.div>
        </motion.div>

        {/* Premium Services Section */}
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
              Rozwiązania premium
            </span>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Specjalistyczne rozwiązania branżowe
            </h3>
            <p className="text-gray-600">
              Dedykowane systemy oparte o AI dla firm, które szukają przewagi konkurencyjnej
            </p>
          </motion.div>
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {premiumServices.map((service) => (
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
          transition={{ duration: 0.4, delay: 0.7 }}
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
            {service.premium ? 'Bezpłatn konsultacja' : 'Bezpłatna wycena'}
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