'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const testimonials = [
  {
    id: 1,
    content: "Dzięki SiteForge.pl nasza nowa strona wreszcie zaczęła generować realne wyniki. Zauważyliśmy wyraźny wzrost zapytań od klientów, a pozycja w Google uległa poprawie. Wszystko zostało zrealizowane zgodnie z harmonogramem i w dobrej komunikacji.",
    author: "Joanna Zawadzka",
    position: "Właścicielka butiku online",
    rating: 5,
    imageSrc: "/images/testimonials/person-1.jpg"
  },
  {
    id: 2,
    content: "Współpracujemy z SiteForge.pl od ponad 3 lat. Nasza aplikacja webowa działa stabilnie, a wszystkie zmiany wdrażane są sprawnie i bez problemów. Cenimy ich za szybki kontakt i techniczną rzetelność. Polecamy jako solidnego partnera.",
    author: "Tomasz Dębski",
    position: "Kierownik działu IT, firma usługowa",
    rating: 5,
    imageSrc: "/images/testimonials/person-2.jpg"
  },
  {
    id: 3,
    content: "Nowy landing page stworzony przez SiteForge.pl wpłynął pozytywnie na naszą sprzedaż. Klienci chwalą prostotę i przejrzystość, a my doceniamy sprawny proces realizacji. Było kilka drobnych poprawek, ale zostały szybko wprowadzone.",
    author: "Piotr Majewski",
    position: "Specjalista ds. marketingu, sklep ze zdrową żywnością",
    rating: 4.5,
    imageSrc: "/images/testimonials/person-3.jpg"
  }
];


// Przykładowi klienci (logotypy) - używamy kolorowych nazw zamiast brakujących SVG
const clients = [
  { id: 1, name: "TechCorp", color: "#3B82F6" },
  { id: 2, name: "GreenLife", color: "#10B981" },
  { id: 3, name: "MediaFlow", color: "#6366F1" },
  { id: 4, name: "DataSense", color: "#EC4899" },
  { id: 5, name: "BuildPro", color: "#F59E0B" },
  { id: 6, name: "CloudWave", color: "#8B5CF6" }
];

interface Testimonial {
  id: number;
  content: string;
  author: string;
  position: string;
  rating: number;
  imageSrc: string;
}

interface TestimonialCardProps {
  testimonial: Testimonial;
  isActive: boolean;
}

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.2
  });

  // Autoplay functionality
  useEffect(() => {
    if (!autoplay || !inView) return;
    
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [autoplay, inView]);

  // Pause autoplay on hover
  const handleMouseEnter = () => setAutoplay(false);
  const handleMouseLeave = () => setAutoplay(true);
  
  return (
    <section 
      id="opinie" 
      className="py-20 bg-gray-50 relative overflow-hidden"
      ref={ref}
    >
      {/* Background decorative elements - matching Services.tsx style */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-500/5 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary-500/5 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-accent-500/5 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-4000"></div>
      </div>

      {/* Gradient overlay - matching Services.tsx style */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50/0 via-gray-50/90 to-gray-50"></div>

      {/* Subtle pattern overlay - matching Services.tsx style */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: "url('data:image/svg+xml,%3Csvg xmlns=\"http://www.w3.org/2000/svg\" width=\"100\" height=\"100\" viewBox=\"0 0 100 100\"%3E%3Cg fill=\"%23000000\" fill-opacity=\"0.1\"%3E%3Cpath d=\"M0 0h50v50H0V0zm50 50h50v50H50V50zm0-50h2l-2 2V0zm0 4l4-4h2l-6 6V4zm0 4l8-8h2L50 10V8zm0 4L62 0h2L50 14v-2zm0 4L66 0h2L50 18v-2zm0 4L70 0h2L50 22v-2zm0 4L74 0h2L50 26v-2zm0 4L78 0h2L50 30v-2zm0 4L82 0h2L50 34v-2zm0 4L86 0h2L50 38v-2zm0 4L90 0h2L50 42v-2zm0 4L94 0h2L50 46v-2zm0 4L98 0h2L50 50v-2zM0 50h2l-2 2v-2zm4 4l4-4h2l-6 6v-2zm4 4l8-8h2L8 58v-2zm4 4l12-12h2L12 62v-2zm4 4l16-16h2L16 66v-2zm4 4l20-20h2L20 70v-2zm4 4l24-24h2L24 74v-2zm4 4l28-28h2L28 78v-2zm4 4l32-32h2L32 82v-2zm4 4l36-36h2L36 86v-2zm4 4l40-40h2L40 90v-2zm4 4l44-44h2L44 94v-2zm4 4l48-48h2L48 98v-2zm4 4l52-52h2L52 100v-2z\"%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E')"
        }}
      ></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Header Section - matching Services.tsx style */}
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
            Opinie klientów
          </motion.span>
          <motion.h2 
            className="text-4xl font-bold text-gray-900 font-heading mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            Co mówią o nas klienci
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            Zobacz, jak pomagamy firmom osiągać ich cele biznesowe poprzez nowoczesne rozwiązania webowe
          </motion.p>
        </motion.div>

        {/* Testimonial Carousel */}
        <motion.div 
          className="max-w-4xl mx-auto mb-16 bg-white rounded-2xl shadow-lg p-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.4 }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="relative h-[320px] md:h-[280px]">
            <AnimatePresence mode="wait">
              {testimonials.map((testimonial, index) => (
                activeIndex === index && (
                  <TestimonialCard
                    key={testimonial.id}
                    testimonial={testimonial}
                    isActive={activeIndex === index}
                  />
                )
              ))}
            </AnimatePresence>
          </div>
          
          {/* Navigation dots */}
          <div className="flex justify-center gap-3 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  activeIndex === index 
                    ? 'bg-accent-500 w-8' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </motion.div>

        {/* Clients section - matching Services.tsx style */}
        <motion.div 
          className="mt-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <span className="inline-block bg-accent-100 text-accent-700 px-4 py-2 rounded-xl text-sm font-medium mb-4">
              Nasi klienci
            </span>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Zaufali nam
            </h3>
            <p className="text-gray-600">
              Dołącz do grona zadowolonych klientów, którzy rozwijają swój biznes z nami
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ 
              duration: 0.6, 
              delay: 0.2,
              staggerChildren: 0.1
            }}
          >
            {clients.map((client, index) => (
              <motion.div 
                key={client.id}
                className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300 group flex items-center justify-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 + (index * 0.05) }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div 
                  className="font-bold text-xl group-hover:scale-110 transition-transform duration-300"
                  style={{ color: client.color }}
                >
                  {client.name}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function TestimonialCard({ testimonial, isActive }: TestimonialCardProps) {
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg key={`full-${i}`} className="w-5 h-5 text-accent-500" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }
    
    if (hasHalfStar) {
      stars.push(
        <svg key="half" className="w-5 h-5 text-accent-500" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 .2l2.944 6.42L20 7.118l-5 4.916 1.179 6.765L10 15.4l-6.179 3.4L5 12.034 0 7.118l7.056-.498L10 .2z" clipRule="evenodd" />
          <path fillRule="evenodd" d="M10 15.4v-15l-2.944 6.42L0 7.118l5 4.916L3.821 18.8 10 15.4z" clipRule="evenodd" />
        </svg>
      );
    }
    
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <svg key={`empty-${i}`} className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }
    
    return stars;
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.5 }}
      className="absolute inset-0"
    >
      <div className="h-full flex flex-col">
        <div className="mb-2">
          <svg className="w-10 h-10 text-accent-200" fill="currentColor" viewBox="0 0 32 32">
            <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
          </svg>
        </div>
        <p className="text-gray-700 text-lg md:text-xl mb-8 flex-grow">{testimonial.content}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="relative w-14 h-14 rounded-full overflow-hidden mr-4 ring-2 ring-accent-100">
              <Image 
                src={testimonial.imageSrc} 
                alt={testimonial.author}
                fill
                sizes="56px"
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div>
              <h4 className="font-bold text-gray-900">{testimonial.author}</h4>
              <p className="text-gray-600 text-sm">{testimonial.position}</p>
            </div>
          </div>
          <div className="flex gap-1">
            {renderStars(testimonial.rating)}
          </div>
        </div>
      </div>
    </motion.div>
  );
}