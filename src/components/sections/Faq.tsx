'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const faqItems = [
  {
    id: 1,
    question: "Czym Wasze projekty różnią się od stron opartych na szablonach?",
    answer: "Strona na szablonie to gotowe ubranie 'z wieszaka' – pasuje na wiele osób, ale rzadko na kogoś idealnie. Nasze projekty to rozwiązania 'szyte na miarę'. Tworzymy je od podstaw, co gwarantuje nie tylko unikalny design w 100% zgodny z Twoją marką, ale przede wszystkim niezrównaną wydajność, bezpieczeństwo i skalowalność. To nie jest tylko strona, to <strong>strategiczne narzędzie biznesowe</strong>, zbudowane z myślą o Twoich konkretnych celach."
  },
  {
    id: 2,
    question: "Jak w praktyce AI może pomóc mojemu biznesowi?",
    answer: "Sztuczna inteligencja to nie science-fiction, a realne narzędzie do generowania zysku. Dla naszych klientów wdrażamy AI m.in. do:<ul><li><strong>Inteligentnych chatbotów</strong>, które automatyzują obsługę klienta 24/7.</li><li><strong>Systemów personalizacji</strong>, które zwiększają sprzedaż w e-commerce.</li><li><strong>Analizy danych</strong>, która pozwala podejmować lepsze decyzje biznesowe.</li></ul>Celem jest zawsze mierzalny rezultat: oszczędność czasu, wzrost konwersji lub redukcja kosztów."
  },
  {
    id: 3,
    question: "Jak wygląda Wasz proces tworzenia projektu?",
    answer: "Nasz proces to partnerska podróż, podzielona na cztery kluczowe etapy:<ol><li><strong>Odkrycie i Strategia:</strong> Zaczynamy od dogłębnego zrozumienia Twojego biznesu i celów.</li><li><strong>Projektowanie i Kreacja:</strong> Nasz zespół UI/UX tworzy angażujące makiety i design.</li><li><strong>Development i Wdrożenie:</strong> Programiści piszą czysty, wydajny kod.</li><li><strong>Wsparcie i Rozwój:</strong> Po starcie zapewniamy wsparcie i analizujemy dane dla ciągłego rozwoju.</li></ol>"
  },
  {
    id: 4,
    question: "Jaki jest koszt stworzenia dedykowanego rozwiązania?",
    answer: "Każdy nasz projekt jest unikalny, dlatego jego wycena jest indywidualna. Koszt zależy od złożoności, zakresu funkcji i integracji. Zamiast patrzeć na to jak na 'koszt', myślimy o tym jako o <strong>'inwestycji'</strong>. Podczas bezpłatnej konsultacji przygotowujemy transparentną propozycję, która jasno pokazuje, jak ta inwestycja przełoży się na zwrot (ROI) dla Twojej firmy."
  },
  {
    id: 5,
    question: "Czy pomagacie w pozycjonowaniu (SEO)?",
    answer: "Tak, ale nasze podejście ewoluuje wraz ze zmianami w wyszukiwarkach, takimi jak Google SGE. Skupiamy się na:<ul><li><strong>Budowaniu autorytetu (E-E-A-T)</strong> poprzez wysokiej jakości treści.</li><li><strong>Implementacji danych strukturalnych (Schema)</strong>, aby AI rozumiała kontekst Twojej oferty.</li><li><strong>Optymalizacji pod kątem intencji użytkownika</strong>.</li></ul>Naszym celem jest nie tylko wysoka pozycja w linkach, ale <strong>pojawienie się w odpowiedziach generowanych przez AI</strong>."
  },
  {
    id: 6,
    question: "Kto zarządza treścią na stronie po jej uruchomieniu?",
    answer: "Wierzymy, że nasi klienci powinni skupiać się na prowadzeniu swojego biznesu. Dlatego oferujemy model <strong>partnerskiej obsługi (Managed Service)</strong>. Zamiast przekazywać Ci kolejny system do nauki (CMS), bierzemy na siebie kompleksowe zarządzanie treścią. To gwarancja spokoju i oszczędność Twojego cennego czasu."
  }
];

interface FaqItem {
  id: number;
  question: string;
  answer: string;
}

interface FaqItemProps {
  item: FaqItem;
  index: number;
  isActive: boolean;
  toggleItem: (id: number) => void;
}

export default function Faq() {
  const [activeItem, setActiveItem] = useState<number | null>(1);
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

  return (
    <section id="faq" className="py-24 sm:py-32 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Left Column: Header */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-heading">
              Masz pytania? Mamy odpowiedzi.
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Zebraliśmy kluczowe informacje, które pomogą Ci zrozumieć naszą filozofię i proces pracy.
            </p>
            <Link
              href="#kontakt"
              className="group inline-flex items-center bg-gradient-to-r from-accent-500 to-accent-600 text-white px-8 py-4 rounded-xl font-medium text-lg hover:shadow-lg transform hover:-translate-y-1 transition-all focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2"
            >
              <span>Porozmawiajmy bez zobowiązań</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </motion.div>

          {/* Right Column: FAQ List */}
          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="lg:col-span-2 space-y-4"
          >
            {faqItems.map((item, index) => (
              <FaqItem
                key={item.id}
                item={item}
                index={index}
                isActive={activeItem === item.id}
                toggleItem={toggleItem}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function FaqItem({ item, index, isActive, toggleItem }: FaqItemProps) {
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };
  
  return (
    <motion.div
      variants={itemVariants}
      className={`group transition-all duration-300 bg-gray-50 rounded-2xl border ${
        isActive ? 'border-accent-200 bg-accent-50/30' : 'border-gray-200 hover:border-gray-300'
      }`}
    >
      <button
        onClick={() => toggleItem(item.id)}
        className="flex items-start text-left w-full p-6"
        aria-expanded={isActive}
      >
        <span className={`mr-4 mt-1 font-bold text-lg ${isActive ? 'text-accent-600' : 'text-accent-500'}`}>
          {String(index + 1).padStart(2, '0')}
        </span>
        <span className="flex-1 font-heading text-lg text-gray-900">
          {item.question}
        </span>
        <div className="relative w-6 h-6 flex-shrink-0 ml-4 mt-1">
           <motion.div
            animate={{ rotate: isActive ? 45 : 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-accent-500 w-full h-0.5 top-1/2"
          />
          <motion.div
            animate={{ rotate: isActive ? -45 : 90 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-accent-500 w-full h-0.5 top-1/2"
          />
        </div>
      </button>
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div 
              className="px-6 pb-6 pl-16 text-gray-600 leading-relaxed prose prose-gray max-w-none"
              dangerouslySetInnerHTML={{ __html: item.answer }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}