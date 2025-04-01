'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Przykładowe dane opinii klientów
const testimonials = [
  {
    id: 1,
    content: "SiteForge.pl zrewolucjonizowało naszą obecność online. Nowa strona zwiększyła naszą konwersję o 75% i znacznie poprawiła pozycję w Google. Profesjonalizm, terminowość i innowacyjne podejście — to definicja tej agencji.",
    author: "Anna Kowalska",
    position: "CEO, FashionStore",
    rating: 5,
    imageSrc: "/images/testimonials/person-1.jpg"
  },
  {
    id: 2,
    content: "Od 3 lat współpracujemy z SiteForge.pl i jesteśmy zachwyceni efektami. Nasza aplikacja webowa działa bez zarzutu, a każda aktualizacja przynosi pozytywne opinie od użytkowników. Szczerze polecam!",
    author: "Marek Nowak",
    position: "CTO, TaskFlow",
    rating: 5,
    imageSrc: "/images/testimonials/person-2.jpg"
  },
  {
    id: 3,
    content: "Landing page stworzony przez SiteForge.pl całkowicie odmienił nasze wyniki sprzedażowe. Profesjonalny design, intuicyjny UX i szybkość działania to atuty, które doceniają nasi klienci. Polecam z czystym sumieniem!",
    author: "Katarzyna Wiśniewska",
    position: "Marketing Manager, HealthyLife",
    rating: 4.5,
    imageSrc: "/images/testimonials/person-3.jpg"
  }
];

// Przykładowi klienci (logotypy)
const clients = [
  { id: 1, name: "Client 1", logoSrc: "/images/clients/client-1.svg" },
  { id: 2, name: "Client 2", logoSrc: "/images/clients/client-2.svg" },
  { id: 3, name: "Client 3", logoSrc: "/images/clients/client-3.svg" },
  { id: 4, name: "Client 4", logoSrc: "/images/clients/client-4.svg" },
  { id: 5, name: "Client 5", logoSrc: "/images/clients/client-5.svg" },
  { id: 6, name: "Client 6", logoSrc: "/images/clients/client-6.svg" }
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
  variants: {
    hidden: { opacity: number; y: number };
    visible: { opacity: number; y: number; transition: { duration: number } };
  };
}

export default function Testimonials() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section id="opinie" className="py-20 bg-gray-50 relative overflow-hidden">
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
            Co mówią o nas klienci
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Zobacz, jak pomogliśmy innym firmom osiągnąć ich cele biznesowe
          </p>
        </motion.div>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
              variants={itemVariants}
            />
          ))}
        </div>

        {/* Clients section */}
        <div className="mt-20">
          <p className="text-center text-gray-500 mb-8">Zaufali nam</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {clients.map((client) => (
              <motion.div 
                key={client.id}
                whileHover={{ scale: 1.05, filter: 'grayscale(0)', opacity: 1 }}
                className="flex items-center justify-center grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
              >
                <Image 
                  src={client.logoSrc} 
                  alt={client.name} 
                  width={120} 
                  height={40} 
                  className="h-8 w-auto"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ testimonial, variants }: TestimonialCardProps) {
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <i key={`full-${i}`} className="fas fa-star text-accent-400"></i>
      );
    }
    
    if (hasHalfStar) {
      stars.push(
        <i key="half" className="fas fa-star-half-alt text-accent-400"></i>
      );
    }
    
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <i key={`empty-${i}`} className="far fa-star text-accent-400"></i>
      );
    }
    
    return stars;
  };

  return (
    <motion.div 
      variants={variants}
      className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
    >
      <div className="flex items-center mb-4">
        <div className="flex gap-1">
          {renderStars(testimonial.rating)}
        </div>
        <span className="ml-2 text-gray-600">{testimonial.rating}</span>
      </div>
      <p className="text-gray-700 mb-6">„{testimonial.content}"</p>
      <div className="flex items-center">
        <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4 ring-2 ring-accent-100">
          <Image 
            src={testimonial.imageSrc} 
            alt={testimonial.author}
            fill
            sizes="48px"
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div>
          <h4 className="font-bold text-gray-900">{testimonial.author}</h4>
          <p className="text-gray-600 text-sm">{testimonial.position}</p>
        </div>
      </div>
    </motion.div>
  );
}