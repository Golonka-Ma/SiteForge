'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ContainerScroll } from '@/components/ui/container-scroll-animation';
import { Timeline } from '@/components/ui/timeline';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Types for projects
interface Project {
  id: number;
  title: string;
  slug: string;
  description: string;
  challenge: string;
  solution: string;
  client: string;
  technologies: string[];
  category: string;
  year: string;
  featuredImage: string;
  fullImage: string; // Taller image for the scrolling effect
  stats: Array<{
    value: string;
    label: string;
  }>;
  colors: {
    primary: string;
    secondary: string;
  };
  features: string[];
}

// Real projects data based on your descriptions
const realProjects: Project[] = [
  {
    id: 1,
    title: "TransPro - System zarządzania flotą",
    slug: "transpro-fleet-management",
    description: "Zintegrowany system zarządzania flotą pojazdów, stworzony w ramach pracy inżynierskiej. Usprawnia zarządzanie operacjami floty, ładunkami, komunikacją z kierowcami oraz śledzeniem kosztów.",
    challenge: "Branża transportowa potrzebowała efektywnego rozwiązania do zarządzania operacjami floty, ładunkami i komunikacją w czasie rzeczywistym między dyspozytorami a kierowcami, przy jednoczesnym śledzeniu kosztów.",
    solution: "Opracowaliśmy kompleksowy system składający się z platformy webowej dla dyspozytorów i administratorów oraz aplikacji mobilnej dla kierowców, umożliwiający pełną kontrolę nad procesami logistycznymi, od planowania tras po finalizację kosztów.",
    client: "TransPro Solutions",
    technologies: ["Spring Boot", "Thymeleaf", "Tailwind CSS", "React Native", "JWT", "WebSockets"],
    category: "Aplikacja webowa & mobilna",
    year: "2023",
    featuredImage: "/images/case-studies/transpro-featured.jpg",
    fullImage: "/images/case-studies/transpro-full.jpg",
    stats: [
      { value: "42%", label: "redukcja kosztów" },
      { value: "65%", label: "mniej pustych kursów" },
      { value: "6m", label: "czas realizacji" }
    ],
    colors: {
      primary: "#1e40af",
      secondary: "#3b82f6"
    },
    features: [
      "Zarządzanie kierowcami",
      "Zarządzanie flotą pojazdów",
      "Planowanie tras",
      "Zarządzanie ładunkami",
      "Śledzenie kosztów",
      "Komunikacja w czasie rzeczywistym",
      "Uwierzytelnianie JWT",
      "Responsywny interfejs"
    ]
  },
  {
    id: 2,
    title: "MedQueue - Chatbot dla przychodni",
    slug: "medqueue-clinic-chatbot",
    description: "Widget typu chatbot zaprojektowany dla przychodni i klinik medycznych, umożliwiający pacjentom umawianie wizyt i uzyskiwanie odpowiedzi na pytania poprzez intuicyjne drzewko decyzyjne lub model AI.",
    challenge: "Przychodnie i gabinety medyczne borykały się z nieefektywnym procesem rejestracji oraz brakiem zautomatyzowanej komunikacji z pacjentami, co prowadziło do dłuższych czasów oczekiwania i mniejszej satysfakcji pacjentów.",
    solution: "Stworzyliśmy łatwy w integracji widget chatbota, który można dodać do dowolnej strony internetowej kliniki, umożliwiający automatyzację procesu umawiania wizyt oraz odpowiadanie na typowe pytania pacjentów poprzez drzewko decyzyjne lub prosty model AI.",
    client: "MedCare Clinic",
    technologies: ["Spring Boot", "React", "JavaScript", "REST API", "AI/ML", "WebSocket"],
    category: "Aplikacja AI dla branży medycznej",
    year: "2023",
    featuredImage: "/images/case-studies/medqueue-featured.jpg",
    fullImage: "/images/case-studies/medqueue-full.jpg",
    stats: [
      { value: "67%", label: "mniej nieodebranych wizyt" },
      { value: "-35%", label: "czasu na telefony" },
      { value: "94%", label: "zadowolonych pacjentów" }
    ],
    colors: {
      primary: "#0f766e",
      secondary: "#14b8a6"
    },
    features: [
      "Umawianie wizyt online",
      "Drzewko decyzyjne pytań",
      "Integracja z kalendarzem",
      "Powiadomienia SMS/Email",
      "Łatwa instalacja na stronie",
      "Responsywny design",
      "Statystyki i analityka",
      "Konfigurowalne odpowiedzi"
    ]
  },
  {
    id: 3,
    title: "MM-ProWelding - Strona firmowa",
    slug: "prowelding-company-website",
    description: "Nowoczesna strona internetowa dla firmy świadczącej profesjonalne usługi spawalnicze i metalurgiczne, zaprojektowana z naciskiem na przyciąganie nowych klientów i budowanie profesjonalnego wizerunku.",
    challenge: "Firma MM-ProWelding potrzebowała profesjonalnej prezentacji swojej oferty online, która odzwierciedla wysoką jakość i precyzję świadczonych usług spawalniczych oraz skutecznie przyciąga nowych klientów.",
    solution: "Stworzyliśmy responsywną stronę wizytówkową z przejrzystą prezentacją usług, galerią realizacji i formularzem kontaktowym, zoptymalizowaną pod kątem konwersji i wyróżniającą się na tle konkurencji.",
    client: "MM ProWelding",
    technologies: ["React", "Next.js", "Tailwind CSS", "Framer Motion", "SEO", "RWD"],
    category: "Strona wizytówka",
    year: "2023",
    featuredImage: "/images/case-studies/prowelding-featured.jpg",
    fullImage: "/images/case-studies/prowelding-full.jpg",
    stats: [
      { value: "138%", label: "wzrost zapytań" },
      { value: "4.2×", label: "więcej klientów" },
    ],
    colors: {
      primary: "#b91c1c",
      secondary: "#f97316"
    },
    features: [
      "Responsywny design",
      "Optymalizacja SEO",
      "Wysokiej jakości galeria",
      "Formularze kontaktowe",
      "Przejrzysta prezentacja usług",
      "Szybkie ładowanie strony",
      "Integracja z Google Maps",
      "Integracja z mediami społecznościowymi"
    ]
  }
];

// Add new type for project stages
type ProjectStage = 'challenge' | 'solution' | 'results';

// Interactive card with hover-scroll effect
function ScrollImageCard({ 
  project, 
  cardSize = "small", 
  tiltDirection = 'left',
  className = "",
  showBotIcon = false
}: { 
  project: Project; 
  cardSize?: "small" | "medium" | "large";
  tiltDirection?: 'left' | 'right';
  className?: string;
  showBotIcon?: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Set up parallax scrolling effect for the card (if needed elsewhere, keep it)
  // const { scrollYProgress } = useScroll({
  //   target: cardRef,
  //   offset: ["start end", "end start"]
  // });

  // Add static tilt effect and image scroll on hover
  useEffect(() => {
    const card = cardRef.current;
    const imageContainer = imageRef.current;
    
    if (!card || !imageContainer) return;
    
    // Determine target rotation based on prop
    const targetRotationY = tiltDirection === 'left' ? -15 : 15;

    // Apply static tilt 
    gsap.set(card, {
      rotationY: targetRotationY, 
      rotationX: 5,  // Keep rotationX consistent for now
      transformPerspective: 1000
    });

    // Image scroll effect on hover (remains unchanged)
    const handleMouseEnter = () => {
      if (imageContainer) {
        gsap.to(imageContainer.querySelector('img'), {
          y: -90, // Move image up
          duration: 0.4,
          ease: 'power1.out',
        });
      }
    };
    
    const handleMouseLeave = () => {
      // Only reset image position, not card tilt
      if (imageContainer) {
        gsap.to(imageContainer.querySelector('img'), {
          y: 0, // Reset image position to top
          duration: 0.5,
          ease: 'power1.out',
        });
      }
    };
    
    // Initialize image position at the top
    if (imageContainer) {
      gsap.set(imageContainer.querySelector('img'), {
        y: 0, 
      });
    }
    
    // Only add listeners for image scroll, not for card tilt
    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      // Remove only the listeners we added
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Determine aspect ratio based on size
  const aspectRatio = 
    cardSize === "small" ? "aspect-[4/5]" : 
    cardSize === "medium" ? "aspect-video" :
    "aspect-[1/1]";

  return (
    <div 
      ref={cardRef}
      className={`relative ${aspectRatio} rounded-xl overflow-hidden shadow-2xl bg-white border border-gray-100 transform-gpu cursor-pointer group ${className} hidden md:block`}
      style={{ 
        transformStyle: 'preserve-3d',
        willChange: 'transform',
        maxWidth: cardSize === "small" ? "350px" : cardSize === "medium" ? "650px" : "550px"
      }}
    >
      {/* Image container with overflow for scroll effect */}
      <div 
        ref={imageRef} 
        className="absolute inset-0 w-full h-full overflow-hidden"
      >
        <Image
          src={project.fullImage}
          alt={project.title}
          width={1200}
          height={800}
          sizes="(max-width: 768px) 100vw, 400px"
          className="object-cover object-top absolute top-0 left-0 w-full h-auto"
          priority={true}
          style={{ 
            willChange: 'transform',
            transformStyle: 'preserve-3d',
            transform: 'translateZ(0)',
          }}
        />
        
        {/* Bot icon card - only shown when showBotIcon is true */}
        {showBotIcon && (
          <motion.div 
            className="absolute bottom-4 left-4 z-20 cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            onClick={() => setIsHovered(true)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div 
              className="w-16 h-16 rounded-xl shadow-lg flex items-center justify-center transform transition-all duration-300 hover:scale-110 backdrop-blur-sm"
              style={{ 
                backgroundColor: `${project.colors.primary}cc`,
                border: `2px solid ${project.colors.secondary}`
              }}
            >
              <svg 
                className="w-8 h-8 text-white" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" 
                />
              </svg>
            </div>
          </motion.div>
        )}
        
        {/* Category badge - moved to top right */}
        <div className="absolute top-4 right-4 z-10">
          <span 
            className="px-3 py-1 rounded-full text-xs font-medium text-white backdrop-blur-sm"
            style={{ 
              backgroundColor: `${project.colors.primary}cc` 
            }}
          >
            {project.category}
          </span>
        </div>
        
        {/* Gradient overlay */}
        <div 
          className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80 z-5"
        />
      </div>
    </div>
  );
}

// Layout 1: Left image, right content (TransPro)
function ProjectLayout1({ project, index }: { project: Project; index: number }) {
  const [currentStage, setCurrentStage] = useState<ProjectStage>('challenge');

  // Get content based on current stage
  const getStageContent = () => {
    switch(currentStage) {
      case 'challenge':
        return {
          title: 'Wyzwanie',
          content: project.challenge,
          color: project.colors.primary,
          icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )
        };
      case 'solution':
        return {
          title: 'Rozwiązanie',
          content: project.solution,
          color: project.colors.secondary,
          icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          )
        };
      case 'results':
        return {
          title: 'Rezultaty',
          content: (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {project.stats.map((stat, i) => (
                <div 
                  key={i}
                  className="text-center p-4 rounded-xl"
                  style={{ backgroundColor: `${project.colors.primary}10` }}
                >
                  <span 
                    className="block text-2xl font-bold mb-1"
                    style={{ color: project.colors.primary }}
                  >
                    {stat.value}
                  </span>
                  <span className="text-sm text-gray-600">{stat.label}</span>
                </div>
              ))}
            </div>
          ),
          color: project.colors.secondary,
          icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          )
        };
    }
  };

  const stageContent = getStageContent();

  return (
    <section id={`project-${project.id}`} className="py-12 md:py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10 max-w-[1400px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start">
          {/* Left side - Larger Image card */}
          <div className="lg:col-span-6">
            <motion.div 
              className="w-full"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative w-full">
                <ScrollImageCard 
                  project={project} 
                  cardSize="medium" 
                  tiltDirection="right"
                  className="transform scale-100 md:scale-110"
                  showBotIcon={false}
                />
              </div>
            </motion.div>
          </div>
          
          {/* Right side - Project header and dynamic content */}
          <div className="lg:col-span-6">
            {/* Project header */}
            <motion.div 
              className="mb-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div 
                className="w-16 h-1 mb-4 rounded mx-auto"
                style={{ backgroundColor: project.colors.primary }}
              ></div>
              <span 
                className="inline-block px-3 py-1 rounded text-sm font-medium mb-3"
                style={{ 
                  backgroundColor: `${project.colors.primary}20`,
                  color: project.colors.primary
                }}
              >
                {project.category}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{project.title}</h2>
              <div className="text-gray-600">
                <span className="font-medium">{project.client}</span>
                <span className="mx-2">•</span>
                <span>{project.year}</span>
              </div>
            </motion.div>

            {/* Progress bar */}
            <div className="flex items-center justify-between mb-8 relative">
              {/* Background line */}
              <div className="absolute top-3 left-0 w-full h-[2px] bg-gray-200" />
              
              {/* Active line */}
              <div 
                className="absolute top-3 left-0 h-[2px] transition-all duration-700 ease-out"
                style={{ 
                  backgroundColor: project.colors.primary,
                  width: currentStage === 'challenge' ? '0%' : 
                         currentStage === 'solution' ? '50%' : '100%'
                }}
              />

              {/* Animated truck */}
              <motion.div
                className="absolute top-0 z-20"
                animate={{
                  left: currentStage === 'challenge' ? '0%' : 
                        currentStage === 'solution' ? '50%' : '100%',
                  scale: [1, 1.1, 1],
                  rotate: [0, -5, 0]
                }}
                transition={{
                  duration: 0.8,
                  ease: "easeInOut"
                }}
                style={{
                  transform: 'translateX(-50%)'
                }}
              >
                <svg 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill={project.colors.primary}
                  className="transform -translate-y-1"
                >
                  <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
                </svg>
              </motion.div>

              {(['challenge', 'solution', 'results'] as ProjectStage[]).map((stage, index) => (
                <button
                  key={stage}
                  onClick={() => setCurrentStage(stage)}
                  className="flex flex-col items-center relative z-10"
                >
                  {/* Stage dot */}
                  <motion.div 
                    className="w-6 h-6 rounded-full transition-all duration-300 border-2 border-white"
                    animate={{
                      opacity: currentStage === stage ? 0 : 1,
                      scale: currentStage === stage ? 0 : 1
                    }}
                    transition={{
                      duration: 0.3,
                      delay: currentStage === stage ? 0.4 : 0
                    }}
                    style={{ 
                      backgroundColor: currentStage === stage || 
                        (currentStage === 'solution' && stage === 'challenge') ||
                        (currentStage === 'results' && (stage === 'challenge' || stage === 'solution'))
                        ? project.colors.primary 
                        : '#e5e7eb'
                    }}
                  />
                  
                  {/* Stage label */}
                  <span 
                    className="text-sm font-medium mt-2 transition-colors duration-300"
                    style={{ 
                      color: currentStage === stage ? project.colors.primary : '#6b7280'
                    }}
                  >
                    {stage === 'challenge' ? 'Wyzwanie' : 
                     stage === 'solution' ? 'Rozwiązanie' : 
                     'Rezultaty'}
                  </span>
                </button>
              ))}
            </div>

            {/* Dynamic content */}
            <motion.div
              key={currentStage}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl p-6 shadow-sm relative overflow-hidden"
            >
              {/* Stage indicator */}
              <div className="flex items-center gap-2 mb-4">
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${stageContent.color}15` }}
                >
                  {stageContent.icon}
                </div>
                <h3 
                  className="text-xl font-bold"
                  style={{ color: stageContent.color }}
                >
                  {stageContent.title}
                </h3>
              </div>

              {/* Content */}
              <div className="text-gray-600 mb-6">
                {stageContent.content}
              </div>

              {/* Technology blocks */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {currentStage === 'challenge' && (
                  <>
                    <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                      <div className="flex items-center gap-2 mb-2">
                        <div 
                          className="w-8 h-8 rounded-lg flex items-center justify-center"
                          style={{ backgroundColor: `${project.colors.primary}15` }}
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                          </svg>
                        </div>
                        <h4 className="font-medium text-gray-900">Efektywność</h4>
                      </div>
                      <p className="text-sm text-gray-600">Optymalizacja procesów i redukcja kosztów operacyjnych</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                      <div className="flex items-center gap-2 mb-2">
                        <div 
                          className="w-8 h-8 rounded-lg flex items-center justify-center"
                          style={{ backgroundColor: `${project.colors.primary}15` }}
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                          </svg>
                        </div>
                        <h4 className="font-medium text-gray-900">Centralizacja danych</h4>
                      </div>
                      <p className="text-sm text-gray-600">Zintegrowane zarządzanie informacjami o flocie i ładunkach</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                      <div className="flex items-center gap-2 mb-2">
                        <div 
                          className="w-8 h-8 rounded-lg flex items-center justify-center"
                          style={{ backgroundColor: `${project.colors.primary}15` }}
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                          </svg>
                        </div>
                        <h4 className="font-medium text-gray-900">Elastyczność</h4>
                      </div>
                      <p className="text-sm text-gray-600">Dostosowanie systemu do zmieniających się potrzeb biznesowych</p>
                    </div>
                  </>
                )}
                {currentStage === 'solution' && (
                  <>
                    <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                      <div className="flex items-center gap-2 mb-2">
                        <div 
                          className="w-8 h-8 rounded-lg flex items-center justify-center"
                          style={{ backgroundColor: `${project.colors.secondary}15` }}
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <h4 className="font-medium text-gray-900">Automatyzacja</h4>
                      </div>
                      <p className="text-sm text-gray-600">Zautomatyzowane procesy zarządzania flotą i ładunkami</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                      <div className="flex items-center gap-2 mb-2">
                        <div 
                          className="w-8 h-8 rounded-lg flex items-center justify-center"
                          style={{ backgroundColor: `${project.colors.secondary}15` }}
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <h4 className="font-medium text-gray-900">Mobilność</h4>
                      </div>
                      <p className="text-sm text-gray-600">Dostęp do systemu z dowolnego miejsca i urządzenia</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                      <div className="flex items-center gap-2 mb-2">
                        <div 
                          className="w-8 h-8 rounded-lg flex items-center justify-center"
                          style={{ backgroundColor: `${project.colors.secondary}15` }}
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                          </svg>
                        </div>
                        <h4 className="font-medium text-gray-900">Analiza</h4>
                      </div>
                      <p className="text-sm text-gray-600">Zaawansowane raporty i analizy danych</p>
                    </div>
                  </>
                )}
                {currentStage === 'results' && (
                  <>
                    <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                      <div className="flex items-center gap-2 mb-2">
                        <div 
                          className="w-8 h-8 rounded-lg flex items-center justify-center"
                          style={{ backgroundColor: `${project.colors.secondary}15` }}
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                          </svg>
                        </div>
                        <h4 className="font-medium text-gray-900">Oszczędności</h4>
                      </div>
                      <p className="text-sm text-gray-600">Znaczna redukcja kosztów operacyjnych</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                      <div className="flex items-center gap-2 mb-2">
                        <div 
                          className="w-8 h-8 rounded-lg flex items-center justify-center"
                          style={{ backgroundColor: `${project.colors.secondary}15` }}
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <h4 className="font-medium text-gray-900">Czas</h4>
                      </div>
                      <p className="text-sm text-gray-600">Szybsze podejmowanie decyzji i realizacja zadań</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                      <div className="flex items-center gap-2 mb-2">
                        <div 
                          className="w-8 h-8 rounded-lg flex items-center justify-center"
                          style={{ backgroundColor: `${project.colors.secondary}15` }}
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                          </svg>
                        </div>
                        <h4 className="font-medium text-gray-900">Satysfakcja</h4>
                      </div>
                      <p className="text-sm text-gray-600">Wysoka satysfakcja klientów i pracowników</p>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Layout 2: Content left, image right with vertical flow (MedQueue)
function ProjectLayout2({ project, index }: { project: Project; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [currentStage, setCurrentStage] = useState<'challenge' | 'solution'>('challenge');
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (isHovered) {
      setIsVisible(true);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    } else {
      timeoutRef.current = setTimeout(() => {
        setIsVisible(false);
      }, 2000);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isHovered]);

  const getStageContent = () => {
    switch(currentStage) {
      case 'challenge':
        return {
          title: 'Wyzwanie',
          content: project.challenge,
          color: project.colors.primary,
          icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )
        };
      case 'solution':
        return {
          title: 'Rozwiązanie',
          content: project.solution,
          color: project.colors.secondary,
          icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          )
        };
    }
  };

  const stageContent = getStageContent();

  return (
    <section id={`project-${project.id}`} className="py-12 md:py-24 bg-gray-50 relative overflow-hidden">
      {/* Background gradient */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{ 
          background: `linear-gradient(135deg, ${project.colors.primary}40, ${project.colors.secondary}20)` 
        }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start">
          {/* Left side - Content with vertical flow */}
          <div className="lg:col-span-7 lg:sticky lg:top-32">
            {/* Project header */}
            <motion.div 
              className="mb-16 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div 
                className="w-16 h-1 mb-4 rounded mx-auto"
                style={{ backgroundColor: project.colors.primary }}
              ></div>
              <span 
                className="inline-block px-3 py-1 rounded text-sm font-medium mb-3"
                style={{ 
                  backgroundColor: `${project.colors.primary}20`,
                  color: project.colors.primary
                }}
              >
                {project.category}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{project.title}</h2>
              <div className="text-gray-600">
                <span className="font-medium">{project.client}</span>
                <span className="mx-2">•</span>
                <span>{project.year}</span>
              </div>
            </motion.div>
            
            {/* Technology pills */}
            <motion.div 
              className="mb-8 overflow-x-auto no-scrollbar"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="flex gap-2 pb-2">
                {project.technologies.map((tech, i) => (
                  <span 
                    key={i} 
                    className="px-3 py-1 text-sm font-medium rounded whitespace-nowrap"
                    style={{ 
                      backgroundColor: `${project.colors.primary}15`,
                      color: project.colors.primary
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
            
            {/* Dynamic content with stages */}
            <motion.div
              key={currentStage}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl p-6 shadow-sm relative overflow-hidden"
            >
              {/* Stage indicator */}
              <div className="flex items-center gap-2 mb-4">
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${stageContent.color}15` }}
                >
                  {stageContent.icon}
                </div>
                <h3 
                  className="text-xl font-bold"
                  style={{ color: stageContent.color }}
                >
                  {stageContent.title}
                </h3>
              </div>

              {/* Content */}
              <div className="text-gray-600">
                {stageContent.content}
              </div>

              {/* Interactive navigation dots */}
              <div className="flex justify-center gap-2 mt-6">
                {['challenge', 'solution'].map((stage) => (
                  <button
                    key={stage}
                    onClick={() => setCurrentStage(stage as 'challenge' | 'solution')}
                    className="w-3 h-3 rounded-full transition-all duration-300"
                    style={{ 
                      backgroundColor: currentStage === stage ? stageContent.color : '#e5e7eb',
                      transform: currentStage === stage ? 'scale(1.2)' : 'scale(1)'
                    }}
                  />
                ))}
              </div>
            </motion.div>

            {/* Project summary section */}
            <motion.div
              className="bg-white rounded-xl p-6 shadow-sm mt-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <h3 
                className="text-xl font-bold mb-4"
                style={{ color: project.colors.primary }}
              >
                Podsumowanie projektu
              </h3>
              <div className="space-y-4">
                <p className="text-gray-600">
                  MedQueue to innowacyjne rozwiązanie, które zrewolucjonizowało sposób, w jaki przychodnie komunikują się z pacjentami. Dzięki implementacji zaawansowanego chatbota, udało się znacząco usprawnić proces umawiania wizyt i udzielania podstawowych informacji.
                </p>
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">Kluczowe osiągnięcia:</h4>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Automatyzacja procesu rejestracji wizyt</li>
                    <li>24/7 dostępność dla pacjentów</li>
                    <li>Redukcja obciążenia personelu medycznego</li>
                    <li>Zwiększenie satysfakcji pacjentów</li>
                    <li>Integracja z istniejącymi systemami zarządzania</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Right side - Image, chatbot widget and results */}
          <div className="lg:col-span-5">
            {/* Chatbot widget - hidden on mobile */}
            <motion.div
              className="relative mb-4 pointer-events-none hidden md:block"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div 
                className="bg-white rounded-xl p-4 shadow-lg relative overflow-hidden"
                style={{ 
                  border: `1px solid ${project.colors.primary}20`,
                  transform: isVisible ? 'translateY(0)' : 'translateY(-100%)',
                  opacity: isVisible ? 1 : 0,
                  transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                  pointerEvents: 'none'
                }}
              >
                <div className="flex items-start gap-3">
                  <div 
                    className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: project.colors.primary }}
                  >
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Cześć! Jestem MedBot</p>
                    <p className="text-gray-600 mt-1">Chcesz umówić wizytę?</p>
                    <div className="flex gap-2 mt-3">
                      <div 
                        className="px-3 py-1.5 text-sm font-medium rounded-lg"
                        style={{ 
                          backgroundColor: project.colors.primary,
                          color: 'white'
                        }}
                      >
                        Tak, umów wizytę
                      </div>
                      <div 
                        className="px-3 py-1.5 text-sm font-medium rounded-lg"
                        style={{ 
                          backgroundColor: `${project.colors.primary}10`,
                          color: project.colors.primary
                        }}
                      >
                        Nie, dziękuję
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Image card */}
            <motion.div 
              className="mb-8 mx-auto hidden md:block"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <ScrollImageCard 
                project={project} 
                cardSize="medium" 
                tiltDirection="left"
                showBotIcon={true}
              />
            </motion.div>

            {/* Results section */}
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {project.stats.map((stat, i) => (
                <motion.div 
                  key={i} 
                  className="bg-white rounded-xl p-4 shadow-sm flex items-center"
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 + (i * 0.1) }}
                >
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center mr-4 text-white"
                    style={{ 
                      background: `linear-gradient(135deg, ${project.colors.primary}, ${project.colors.secondary})` 
                    }}
                  >
                    {i === 0 ? (
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    ) : i === 1 ? (
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    ) : (
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                      </svg>
                    )}
                  </div>
                  <div>
                    <span 
                      className="block text-xl font-bold"
                      style={{ color: project.colors.primary }}
                    >
                      {stat.value}
                    </span>
                    <span className="text-sm text-gray-600">{stat.label}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Layout 3: Centered showcase with features grid (MM-ProWelding)
function ProjectLayout3({ project, index }: { project: Project; index: number }) {
  const timelineData = [
    {
      title: "Etap 1",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
            Analiza potrzeb klienta i przygotowanie koncepcji projektu
          </p>
          <div className="grid grid-cols-2 gap-4">
            <Image
              src="/images/case-studies/prowelding-analysis.jpg"
              alt="Analiza projektu"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
            <Image
              src="/images/case-studies/prowelding-concept.jpg"
              alt="Koncepcja projektu"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
          </div>
        </div>
      ),
    },
    {
      title: "Etap 2",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
            Projektowanie interfejsu i implementacja funkcjonalności
          </p>
          <div className="grid grid-cols-2 gap-4">
            <Image
              src="/images/case-studies/prowelding-design.jpg"
              alt="Projekt interfejsu"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
            <Image
              src="/images/case-studies/prowelding-development.jpg"
              alt="Implementacja"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
          </div>
        </div>
      ),
    },
    {
      title: "Etap 3",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-4">
            Zrealizowane funkcjonalności:
          </p>
          <div className="mb-8">
            <div className="flex gap-2 items-center text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">
              ✅ Responsywny design
            </div>
            <div className="flex gap-2 items-center text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">
              ✅ Optymalizacja SEO
            </div>
            <div className="flex gap-2 items-center text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">
              ✅ Galeria realizacji
            </div>
            <div className="flex gap-2 items-center text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">
              ✅ Formularze kontaktowe
            </div>
            <div className="flex gap-2 items-center text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">
              ✅ Integracja z Google Maps
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Image
              src="/images/case-studies/prowelding-final-1.jpg"
              alt="Finalny projekt 1"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
            <Image
              src="/images/case-studies/prowelding-final-2.jpg"
              alt="Finalny projekt 2"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
          </div>
        </div>
      ),
    },
  ];

  return (
    <section id={`project-${project.id}`} className="py-12 md:py-24 bg-white relative overflow-hidden">
      {/* Background circles */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute top-0 right-0 w-1/3 h-1/3 rounded-full opacity-5"
          style={{ 
            background: `radial-gradient(circle, #3b82f6, transparent)`,
            transform: 'translate(30%, -30%)'
          }}
        ></div>
        <div 
          className="absolute bottom-0 left-0 w-1/2 h-1/2 rounded-full opacity-5"
          style={{ 
            background: `radial-gradient(circle, #8b5cf6, transparent)`,
            transform: 'translate(-30%, 30%)'
          }}
        ></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">

        {/* Project header */}
        <motion.div 
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div 
            className="w-16 h-1 mb-4 rounded mx-auto"
            style={{ background: 'linear-gradient(to right, #3b82f6, #8b5cf6)' }}
          ></div>
          <span 
            className="inline-block px-3 py-1 rounded text-sm font-medium mb-3"
            style={{ 
              background: 'linear-gradient(to right, #3b82f6, #8b5cf6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              color: 'transparent'
            }}
          >
            {project.category}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{project.title}</h2>
          <div className="text-gray-600">
            <span className="font-medium">{project.client}</span>
            <span className="mx-2">•</span>
            <span>{project.year}</span>
          </div>
        </motion.div>

        {/* Project Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 mb-16">
          {/* Left Column - Project Details */}
          <div className="space-y-8">
            {/* Challenge Card */}
            <motion.div 
              className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-white"
                  style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)' }}
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Wyzwanie</h3>
              </div>
              <p className="text-gray-600">{project.challenge}</p>
            </motion.div>

            {/* Solution Card */}
            <motion.div 
              className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-white"
                  style={{ background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)' }}
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Rozwiązanie</h3>
              </div>
              <p className="text-gray-600">{project.solution}</p>
            </motion.div>
          </div>

          {/* Right Column - Stats and Features Preview */}
          <div className="space-y-8">
            {/* Stats Grid */}
            <motion.div 
              className="grid grid-cols-2 gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {project.stats.map((stat, i) => (
                <div 
                  key={i}
                  className="bg-white rounded-xl p-4 shadow-lg border border-gray-100 text-center"
                >
                  <span 
                    className="block text-2xl font-bold mb-1"
                    style={{ 
                      background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      color: 'transparent'
                    }}
                  >
                    {stat.value}
                  </span>
                  <span className="text-sm text-gray-600">{stat.label}</span>
                </div>
              ))}
            </motion.div>

            {/* Features Preview */}
            <motion.div 
              className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-white"
                  style={{ 
                    background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)'
                  }}
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Kluczowe funkcje</h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {project.features.slice(0, 4).map((feature, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                    <div 
                      className="w-5 h-5 rounded-full flex items-center justify-center"
                      style={{ 
                        background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                        color: 'white'
                      }}
                    >
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    {feature}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Technology Stack */}
            <motion.div 
              className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-white"
                  style={{ 
                    background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)'
                  }}
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Stack technologiczny</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, i) => (
                  <span 
                    key={i} 
                    className="px-3 py-1 text-sm font-medium rounded-full"
                    style={{ 
                      background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      color: 'transparent'
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Timeline Section */}
        <div className="mb-16">
          <Timeline data={timelineData} />
        </div>
        
        {/* Showcase Section */}
        <motion.div 
          className="relative overflow-hidden rounded-2xl shadow-2xl"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <ContainerScroll
            titleComponent={
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                Zobacz nasze rozwiązanie w akcji
              </h3>
            }
          >
            <Image
              src={project.fullImage}
              alt={project.title}
              width={1400}
              height={800}
              className="mx-auto rounded-2xl object-cover h-full object-left-top"
              draggable={false}
            />
          </ContainerScroll>
        </motion.div>
        
      </div>
    </section>
  );
}

// Main component
export default function CaseStudiesSection() {
  // Animation for section entry
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <div>
      {/* Section header */}
      <motion.div 
        className="py-20 bg-gray-50"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4 text-center">
          <motion.span 
            className="inline-block px-4 py-2 rounded-xl text-sm font-medium bg-accent-100 text-accent-700 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Nasze realizacje
          </motion.span>
          
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Projekty, które mówią same za siebie
          </motion.h1>
          
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Odkryj, jak nasze rozwiązania technologiczne pomogły klientom osiągnąć realne rezultaty biznesowe.
          </motion.p>
        </div>
      </motion.div>
      
      {/* TransPro - System zarządzania flotą */}
      <ProjectLayout1 project={realProjects[0]} index={0} />
      
      {/* MedQueue - Chatbot dla przychodni */}
      <ProjectLayout2 project={realProjects[1]} index={1} />
      
      {/* MM-ProWelding - Strona firmowa */}
      <ProjectLayout3 project={realProjects[2]} index={2} />
      
      {/* CTA section */}
      <motion.div 
        className="py-20 bg-accent-500 text-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4 text-center">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Chcesz dołączyć do grona naszych zadowolonych klientów?
          </motion.h2>
          
          <motion.p 
            className="text-xl text-white/90 max-w-3xl mx-auto mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Skontaktuj się z nami, aby omówić Twój projekt i dowiedzieć się, jak możemy pomóc Twojemu biznesowi osiągnąć sukces.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link href="/kontakt">
              <div className="inline-flex items-center px-8 py-4 bg-white text-accent-600 font-medium rounded-lg shadow-xl transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-1 group/button">
                Rozpocznij współpracę
                <svg 
                  className="w-5 h-5 ml-2 transition-transform duration-300 group-hover/button:translate-x-1" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}