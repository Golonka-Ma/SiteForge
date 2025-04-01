'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Przykładowe dane FAQ
const faqItems = [
  {
    id: 1,
    question: "Jak możemy pomóc Twojemu biznesowi?",
    answer: "Oferujemy kompleksowe rozwiązania internetowe, które pomagają firmom zwiększyć swoją obecność online i poprawić wyniki biznesowe. Od prostych stron wizytówek po zaawansowane systemy AI - każdy projekt jest dopasowany do specyficznych potrzeb klienta. Nasze rozwiązania pomagają w generowaniu leadów, automatyzacji procesów i budowaniu silnej marki online."
  },
  {
    id: 2,
    question: "Jak wygląda proces współpracy?",
    answer: "Proces współpracy zaczynamy od bezpłatnej konsultacji, podczas której poznajemy Twoje potrzeby i cele biznesowe. Następnie przygotowujemy szczegółową propozycję rozwiązania i harmonogram prac. Po akceptacji, przystępujemy do realizacji projektu, regularnie informując o postępach. Po zakończeniu prac zapewniamy wsparcie techniczne i szkolenie z obsługi systemu."
  },
  {
    id: 3,
    question: "Czy zapewniacie wsparcie techniczne?",
    answer: "Tak, oferujemy pełne wsparcie techniczne dla wszystkich naszych projektów. Po zakończeniu prac zapewniamy okres gwarancyjny, w trakcie którego usuwamy wszelkie błędy bez dodatkowych opłat. Dodatkowo, oferujemy pakiety serwisowe, które obejmują regularne aktualizacje, monitoring bezpieczeństwa, kopie zapasowe i wsparcie techniczne. Dzięki temu klient może skupić się na swoim biznesie, a my zajmujemy się techniczną stroną jego obecności online."
  },
  {
    id: 4,
    question: "Czy pomagacie w pozycjonowaniu stron?",
    answer: "Tak, oferujemy kompleksowe usługi SEO (Search Engine Optimization). Każda tworzona przez nas strona jest od podstaw zoptymalizowana pod kątem wyszukiwarek, co daje solidny fundament pod dalsze działania. Dodatkowo oferujemy dedykowane pakiety pozycjonowania, które obejmują: analizę słów kluczowych, optymalizację treści, budowę zaplecza linkowego, regularne audyty i raporty efektywności. Nasze podejście do SEO jest transparentne i skupione na długoterminowych rezultatach."
  },
  {
    id: 5,
    question: "Czy mogę samodzielnie edytować treści na stronie?",
    answer: "Oczywiście! Wszystkie nasze strony wyposażone są w intuicyjny system zarządzania treścią (CMS), który pozwala na samodzielną edycję zawartości bez znajomości kodowania. Po wdrożeniu projektu przeprowadzamy szkolenie, podczas którego pokazujemy, jak zarządzać treściami, dodawać nowe podstrony, artykuły na blogu czy produkty w sklepie. Dodatkowo przygotowujemy instrukcję obsługi, do której klient może wrócić w dowolnym momencie."
  }
];

interface FaqItem {
  id: number;
  question: string;
  answer: string;
}

interface FaqItemProps {
  item: FaqItem;
  isActive: boolean;
  toggleItem: (id: number) => void;
  variants: Variants;
}

export default function Faq() {
  const [activeItem, setActiveItem] = useState<number | null>(null);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  
  const toggleItem = (id: number) => {
    setActiveItem(activeItem === id ? null : id);
  };
  
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
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  return (
    <section id="faq" className="py-20 bg-gray-50 relative overflow-hidden">
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
            Często zadawane pytania
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Znajdź odpowiedzi na najczęściej zadawane pytania dotyczące naszych usług.
          </p>
        </motion.div>
        
        <motion.div 
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="max-w-3xl mx-auto"
        >
          {faqItems.map((item) => (
            <FaqItem
              key={item.id}
              item={item}
              isActive={activeItem === item.id}
              toggleItem={toggleItem}
              variants={itemVariants}
            />
          ))}
        </motion.div>
        
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-gray-600 mb-6">Nie znalazłeś odpowiedzi na swoje pytanie?</p>
          <Link 
            href="#kontakt" 
            className="inline-flex items-center bg-gradient-to-r from-accent-500 to-accent-600 text-white px-8 py-4 rounded-xl font-medium text-lg hover:shadow-lg transform hover:-translate-y-1 transition-all focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2"
          >
            Skontaktuj się z nami
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function FaqItem({ item, isActive, toggleItem, variants }: FaqItemProps) {
  return (
    <motion.div 
      variants={variants}
      className="mb-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 overflow-hidden"
    >
      <button 
        onClick={() => toggleItem(item.id)}
        className="flex justify-between items-center w-full p-6 font-medium text-left text-gray-900 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2 rounded-xl"
        aria-expanded={isActive}
      >
        <span className="font-heading text-lg">{item.question}</span>
        <motion.svg 
          animate={{ rotate: isActive ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="w-6 h-6 text-accent-500" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"></path>
        </motion.svg>
      </button>
      <AnimatePresence>
        {isActive && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6">
              <p className="text-gray-600 leading-relaxed">{item.answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}