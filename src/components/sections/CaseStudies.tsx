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

// Custom hook to get window size
function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    
    // Add event listener
    if (typeof window !== 'undefined') {
      window.addEventListener("resize", handleResize);
      
      // Call handler right away so state gets updated with initial window size
      handleResize();
    }
    
    // Remove event listener on cleanup
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, []); // Empty array ensures that effect is only run on mount
  
  return windowSize;
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
    fullImage: "/images/case-studies/transpro-full.png",
    stats: [
      { value: "42%", label: "redukcja kosztów" },
      { value: "65%", label: "mniej pustych kursów" },
      { value: "6m", label: "czas realizacji" }
    ],
    colors: {
      primary: "#1e40af",
      secondary: "#0ea5e9"
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
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const checkMobile = () => {
        setIsMobile(window.innerWidth < 768);
      };
      
      checkMobile();
      window.addEventListener('resize', checkMobile);
      
      return () => {
        window.removeEventListener('resize', checkMobile);
      };
    }
  }, []);

  // Auto-trigger animation on scroll for mobile
  useEffect(() => {
    if (!imageRef.current || !isMobile) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Trigger the animation
          const img = imageRef.current?.querySelector('img');
          if (img) {
            gsap.to(img, {
              y: -90,
              duration: 1,
              ease: 'power1.out',
            });
            
            // Reset after a few seconds
            setTimeout(() => {
              gsap.to(img, {
                y: 0,
                duration: 0.8,
                ease: 'power1.out',
              });
            }, 3000);
          }
        }
      });
    }, { threshold: 0.5 });

    observer.observe(imageRef.current);

    return () => {
      if (imageRef.current) {
        observer.unobserve(imageRef.current);
      }
    };
  }, [isMobile]);

  // Add static tilt effect and image scroll on hover for desktop
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

    // Image scroll effect on hover (for desktop only)
    const handleMouseEnter = () => {
      if (imageContainer && !isMobile) {
        gsap.to(imageContainer.querySelector('img'), {
          y: -90, // Move image up
          duration: 0.4,
          ease: 'power1.out',
        });
      }
    };
    
    const handleMouseLeave = () => {
      // Only reset image position, not card tilt (for desktop only)
      if (imageContainer && !isMobile) {
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
  }, [isMobile]);

  // Determine aspect ratio based on size
  const aspectRatio = 
    cardSize === "small" ? "aspect-[4/5]" : 
    cardSize === "medium" ? "aspect-video" :
    "aspect-[1/1]";

  return (
    <div 
      ref={cardRef}
      className={`relative ${aspectRatio} rounded-xl overflow-hidden shadow-2xl bg-white border border-gray-100 transform-gpu cursor-pointer group ${className}`}
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
          quality={95}
          unoptimized={project.fullImage.endsWith('.png')}
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
        <div className="absolute top-2 right-3 z-10">
          <span 
            className="px-3 py-1 rounded-full text-xs font-medium text-white shadow-md border border-white/10"
            style={{ 
              backgroundColor: `${project.colors.primary}`,
              boxShadow: '0 2px 10px rgba(0,0,0,0.15)'
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
  const { width } = useWindowSize();
  const isMobile = width < 768;

  // Get content based on current stage
  const getStageContent = () => {
    switch(currentStage) {
      case 'challenge':
        return {
          title: 'Wyzwanie',
          content: project.challenge,
          color: project.colors.secondary,
          icon: (
            <svg className="w-6 h-6 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
            <svg className="w-6 h-6 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
            <svg className="w-6 h-6 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
          {/* Left side - Image card - HIDDEN on mobile */}
          <div className="lg:col-span-6 hidden lg:block">
            <motion.div 
              className="w-full"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative w-full mx-auto max-w-md lg:max-w-none">
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

            {/* Mobile only image - placed right after client info */}
            <div className="mb-8 lg:hidden">
              <motion.div 
                className="w-full"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6 }}
              >
                <div className="relative w-full mx-auto max-w-xs">
                  <ScrollImageCard 
                    project={project} 
                    cardSize="medium" 
                    tiltDirection="right"
                    className="transform scale-100"
                    showBotIcon={false}
                  />
                </div>
              </motion.div>
            </div>

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
                        currentStage === 'solution' ? (isMobile ? '45%' : '50%') : 
                        (isMobile ? '90%' : '100%'),
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
                    <div className="bg-white rounded-xl p-3 border border-gray-100 shadow-sm">
                      <div className="flex items-center gap-2 mb-2">
                        <div 
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-accent-600"
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
                    <div className="bg-white rounded-xl p-3 border border-gray-100 shadow-sm">
                      <div className="flex items-center gap-2 mb-2">
                        <div 
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-accent-600"
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
                    <div className="bg-white rounded-xl p-3 border border-gray-100 shadow-sm">
                      <div className="flex items-center gap-2 mb-2">
                        <div 
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-accent-600"
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
                    <div className="bg-white rounded-xl p-3 border border-gray-100 shadow-sm">
                      <div className="flex items-center gap-2 mb-2">
                        <div 
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-accent-600"
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
                    <div className="bg-white rounded-xl p-3 border border-gray-100 shadow-sm">
                      <div className="flex items-center gap-2 mb-2">
                        <div 
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-accent-600"
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
                    <div className="bg-white rounded-xl p-3 border border-gray-100 shadow-sm">
                      <div className="flex items-center gap-2 mb-2">
                        <div 
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-accent-600"
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
                    <div className="bg-white rounded-xl p-3 border border-gray-100 shadow-sm">
                      <div className="flex items-center gap-2 mb-2">
                        <div 
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-accent-600"
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
                    <div className="bg-white rounded-xl p-3 border border-gray-100 shadow-sm">
                      <div className="flex items-center gap-2 mb-2">
                        <div 
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-accent-600"
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
                    <div className="bg-white rounded-xl p-3 border border-gray-100 shadow-sm">
                      <div className="flex items-center gap-2 mb-2">
                        <div 
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-accent-600"
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

  // For desktop behavior only
  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth >= 768) {
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
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isHovered]);

  // Auto trigger the chatbot on mobile when scrolled into view
  // And keep it visible after triggering
  const chatbotRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        // On mobile, when it becomes visible, keep it visible
        if (entry.isIntersecting && typeof window !== 'undefined' && window.innerWidth < 768) {
          setIsHovered(true);
          setIsVisible(true);
          // No timeout to hide it again on mobile
        }
      });
    }, { threshold: 0.5 });
    
    if (chatbotRef.current) {
      observer.observe(chatbotRef.current);
    }
    
    return () => {
      if (chatbotRef.current) {
        observer.unobserve(chatbotRef.current);
      }
    };
  }, []);

  const getStageContent = () => {
    switch(currentStage) {
      case 'challenge':
        return {
          title: 'Wyzwanie',
          content: project.challenge,
          color: project.colors.primary,
          icon: (
            <svg className="w-6 h-6 text-accent-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )
        };
      case 'solution':
        return {
          title: 'Rozwiązanie',
          content: project.solution,
          color: project.colors.primary,
          icon: (
            <svg className="w-6 h-6 text-accent-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
            
            {/* Mobile only - image after client info */}
            <div className="mb-12 lg:hidden" ref={chatbotRef}>
              {/* Chatbot widget - fixed on mobile */}
              <motion.div
                className="relative mb-4 pointer-events-none"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6 }}
              >
                <div 
                  className={`bg-white rounded-xl p-4 shadow-lg relative overflow-hidden ${isVisible ? 'sticky top-2 z-50' : ''}`}
                  style={{ 
                    border: `1px solid ${project.colors.primary}20`,
                    transform: isVisible ? 'translateY(0)' : 'translateY(-100%)',
                    opacity: isVisible ? 1 : 0,
                    transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                    pointerEvents: isVisible ? 'auto' : 'none'
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
                className="w-full mx-auto"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6 }}
              >
                <div className="relative mx-auto max-w-xs">
                  <ScrollImageCard 
                    project={project} 
                    cardSize="medium" 
                    tiltDirection="left"
                    showBotIcon={true}
                  />
                </div>
              </motion.div>
            </div>
            
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
              className="bg-white rounded-xl p-5 shadow-sm relative overflow-hidden"
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
              className="bg-white rounded-xl p-5 shadow-sm mt-8"
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
          
          {/* Right side - Image, chatbot widget and results - DESKTOP ONLY */}
          <div className="lg:col-span-5 hidden lg:block">
            {/* Chatbot widget */}
            <motion.div
              className="relative mb-4 pointer-events-none"
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
              className="mb-8 mx-auto"
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
                    className="w-12 h-12 mt-5 rounded-full flex items-center justify-center mr-4 text-white"
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

          {/* Mobile-only Results section - after the main content */}
          <div className="lg:hidden">
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
            >
              {project.stats.map((stat, i) => (
                <motion.div 
                  key={i} 
                  className="bg-white rounded-xl p-4 shadow-sm flex items-center"
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
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
      title: "Analiza i planowanie",
      content: (
        <div className="space-y-6">
          <div className="space-y-3">
            <h4 className="text-lg md:text-xl font-semibold text-gray-800">Analiza i planowanie</h4>
            <p className="text-gray-700 text-sm md:text-base">
              Rozpoczynamy od dokładnego poznania Twojej firmy, branży i potrzeb. Tworzymy strategię i plan działania.
            </p>
          </div>
          
          <div className="mx-auto max-w-md">
            <div className="space-y-2">
              <div className="aspect-video relative rounded-lg overflow-hidden shadow-md">
            <Image
                  src="/images/case-studies/analysis.jpg"
              alt="Analiza projektu"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <p className="text-xs text-gray-500 text-center">Analiza potrzeb i przygotowanie koncepcji projektu</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Projektowanie i rozwój",
      content: (
        <div className="space-y-6">
          <div className="space-y-3">
            <h4 className="text-lg md:text-xl font-semibold text-gray-800">Projektowanie i rozwój</h4>
            <p className="text-gray-700 text-sm md:text-base">
              Tworzymy projekt graficzny i wdrażamy zaawansowane funkcjonalności z wykorzystaniem najnowszych technologii.
            </p>
          </div>
          
          <div className="mx-auto max-w-md">
            <div className="space-y-2">
              <div className="aspect-video relative rounded-lg overflow-hidden shadow-md">
            <Image
                  src="/images/case-studies/design.jpg"
              alt="Projekt interfejsu"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <p className="text-xs text-gray-500 text-center">Projekt interfejsu i implementacja funkcjonalności</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Finalizacja i korzyści",
      content: (
        <div className="space-y-6">
          <div className="space-y-3">
            <h4 className="text-lg md:text-xl font-semibold text-gray-800">Finalizacja i korzyści</h4>
            <p className="text-gray-700 text-sm md:text-base">
              Gotowy projekt przechodzi testy i optymalizację. Dostarczamy produkt, który spełnia wszystkie oczekiwania.
            </p>
            </div>
          
          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
            <div className="flex items-center gap-2 text-gray-700 text-xs md:text-sm">
              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-xs">✓</span>
              <span>Unikalna, indywidualna strona</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700 text-xs md:text-sm">
              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-xs">✓</span>
              <span>Szybkie działanie</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700 text-xs md:text-sm">
              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-xs">✓</span>
              <span>Responsywność (RWD)</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700 text-xs md:text-sm">
              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-xs">✓</span>
              <span>Nowoczesne animacje</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700 text-xs md:text-sm">
              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-xs">✓</span>
              <span>Optymalizacja SEO</span>
          </div>
            <div className="flex items-center gap-2 text-gray-700 text-xs md:text-sm">
              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-xs">✓</span>
              <span>Wsparcie techniczne</span>
            </div>
          </div>
          
          <div className="mx-auto max-w-md">
            <div className="space-y-2">
              <div className="aspect-video relative rounded-lg overflow-hidden shadow-md">
            <Image
                  src="/images/case-studies/final-1.jpg"
                  alt="Finalny projekt"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <p className="text-xs text-gray-500 text-center">Gotowy projekt - strona główna</p>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section 
      id={`jak-dzialamy`} 
      className="py-12 md:py-24 relative overflow-hidden"
          style={{ 
        background: "linear-gradient(135deg, rgba(59, 130, 246, 0.03) 0%, rgba(255, 255, 255, 1) 50%, rgba(139, 92, 246, 0.03) 100%)"
      }}
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-30"
          style={{ 
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"
          }}
        ></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
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
            Nasza metodologia
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Jak działamy</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Nie korzystamy z gotowych szablonów Wordpress. Każdy projekt tworzymy od podstaw, 
            korzystając z najnowszych technologii webowych.
          </p>
        </motion.div>

        {/* Technology Stack Section */}
        <motion.div 
          className="bg-white rounded-xl p-5 md:p-6 shadow-lg border border-gray-100 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
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
            <h3 className="text-xl font-bold text-gray-900">Nasz stack technologiczny</h3>
          </div>
          <p className="text-gray-600 mb-8">
            Tworzymy strony internetowe i aplikacje internetowe korzystając z najnowszych i najlepszych technologii dostępnych na rynku:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Next.js */}
            <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col items-center text-center">
              <div className="mb-4 h-16 flex items-center justify-center">
                <svg viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16">
                  <mask id="mask0_408_139" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="180" height="180">
                    <circle cx="90" cy="90" r="90" fill="black" />
                  </mask>
                  <g mask="url(#mask0_408_139)">
                    <circle cx="90" cy="90" r="90" fill="black" />
                    <path d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z" fill="url(#paint0_linear_408_139)" />
                    <rect x="115" y="54" width="12" height="72" fill="url(#paint1_linear_408_139)" />
                  </g>
                  <defs>
                    <linearGradient id="paint0_linear_408_139" x1="109" y1="116.5" x2="144.5" y2="160.5" gradientUnits="userSpaceOnUse">
                      <stop stopColor="white" />
                      <stop offset="1" stopColor="white" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id="paint1_linear_408_139" x1="121" y1="54" x2="120.799" y2="106.875" gradientUnits="userSpaceOnUse">
                      <stop stopColor="white" />
                      <stop offset="1" stopColor="white" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Next.js</h4>
              <p className="text-sm text-gray-600">Framework React do tworzenia nowoczesnych stron z optymalizacją SEO i szybkim ładowaniem</p>
            </div>
            
            {/* Tailwind CSS */}
            <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col items-center text-center">
              <div className="mb-4 h-16 flex items-center justify-center">
                <svg viewBox="0 0 248 31" className="w-auto h-8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M25.517 0C18.712 0 14.46 3.382 12.758 10.146c2.552-3.382 5.529-4.65 8.931-3.805 1.941.482 3.329 1.882 4.864 3.432 2.502 2.524 5.398 5.445 11.722 5.445 6.804 0 11.057-3.382 12.758-10.145-2.551 3.382-5.528 4.65-8.93 3.804-1.942-.482-3.33-1.882-4.865-3.431C34.736 2.92 31.841 0 25.517 0zM12.758 15.218C5.954 15.218 1.701 18.6 0 25.364c2.552-3.382 5.529-4.65 8.93-3.805 1.942.482 3.33 1.882 4.865 3.432 2.502 2.524 5.397 5.445 11.722 5.445 6.804 0 11.057-3.381 12.758-10.145-2.552 3.382-5.529 4.65-8.931 3.805-1.941-.483-3.329-1.883-4.864-3.432-2.502-2.524-5.398-5.446-11.722-5.446z" fill="#38bdf8" />
                  <path fillRule="evenodd" clipRule="evenodd" d="M76.546 12.825h-4.453v8.567c0 2.285 1.508 2.249 4.453 2.106v3.463c-5.962.714-8.332-.928-8.332-5.569v-8.567H64.91V9.112h3.304V4.318l3.879-1.143v5.937h4.453v3.713zM93.52 9.112h3.878v17.849h-3.878v-2.57c-1.365 1.891-3.484 3.034-6.285 3.034-4.884 0-8.942-4.105-8.942-9.389 0-5.318 4.058-9.388 8.942-9.388 2.801 0 4.92 1.142 6.285 2.999V9.112zm-5.674 14.636c3.232 0 5.674-2.392 5.674-5.712s-2.442-5.711-5.674-5.711-5.674 2.392-5.674 5.711c0 3.32 2.442 5.712 5.674 5.712zm16.016-17.313c-1.364 0-2.477-1.142-2.477-2.463a2.475 2.475 0 012.477-2.463 2.475 2.475 0 012.478 2.463c0 1.32-1.113 2.463-2.478 2.463zm-1.939 20.526V9.112h3.879v17.849h-3.879zm8.368 0V.9h3.878v26.06h-3.878zm29.053-17.849h4.094l-5.638 17.849h-3.807l-3.735-12.03-3.771 12.03h-3.806l-5.639-17.849h4.094l3.484 12.315 3.771-12.315h3.699l3.734 12.315 3.52-12.315zm8.906-2.677c-1.365 0-2.478-1.142-2.478-2.463a2.475 2.475 0 012.478-2.463 2.475 2.475 0 012.478 2.463c0 1.32-1.113 2.463-2.478 2.463zm-1.939 20.526V9.112h3.878v17.849h-3.878zm17.812-18.313c4.022 0 6.895 2.713 6.895 7.354V26.96h-3.878V16.394c0-2.713-1.58-4.14-4.022-4.14-2.55 0-4.561 1.499-4.561 5.14v9.567h-3.879V9.112h3.879v2.285c1.185-1.856 3.124-2.749 5.566-2.749zm25.282-6.675h3.879V26.96h-3.879v-2.57c-1.364 1.892-3.483 3.034-6.284 3.034-4.884 0-8.942-4.105-8.942-9.389 0-5.318 4.058-9.388 8.942-9.388 2.801 0 4.92 1.142 6.284 2.999V1.973zm-5.674 21.775c3.232 0 5.674-2.392 5.674-5.712s-2.442-5.711-5.674-5.711-5.674 2.392-5.674 5.711c0 3.32 2.442 5.712 5.674 5.712zm22.553 3.677c-5.423 0-9.481-4.105-9.481-9.389 0-5.318 4.058-9.388 9.481-9.388 3.519 0 6.572 1.82 8.008 4.605l-3.34 1.928c-.79-1.678-2.549-2.749-4.704-2.749-3.16 0-5.566 2.392-5.566 5.604 0 3.213 2.406 5.605 5.566 5.605 2.155 0 3.914-1.107 4.776-2.749l3.34 1.892c-1.508 2.82-4.561 4.64-8.08 4.64zm14.472-13.387c0 3.249 9.661 1.285 9.661 7.89 0 3.57-3.125 5.497-7.003 5.497-3.591 0-6.177-1.607-7.326-4.177l3.34-1.927c.574 1.606 2.011 2.57 3.986 2.57 1.724 0 3.052-.571 3.052-2 0-3.176-9.66-1.391-9.66-7.781 0-3.356 2.909-5.462 6.572-5.462 2.945 0 5.387 1.357 6.644 3.713l-3.268 1.82c-.647-1.392-1.904-2.035-3.376-2.035-1.401 0-2.622.607-2.622 1.892zm16.556 0c0 3.249 9.66 1.285 9.66 7.89 0 3.57-3.124 5.497-7.003 5.497-3.591 0-6.176-1.607-7.326-4.177l3.34-1.927c.575 1.606 2.011 2.57 3.986 2.57 1.724 0 3.053-.571 3.053-2 0-3.176-9.66-1.391-9.66-7.781 0-3.356 2.908-5.462 6.572-5.462 2.944 0 5.386 1.357 6.643 3.713l-3.268 1.82c-.646-1.392-1.903-2.035-3.375-2.035-1.401 0-2.622.607-2.622 1.892z" fill="#0f172a" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Tailwind CSS</h4>
              <p className="text-sm text-gray-600">Utility-first CSS dla szybkiego i elastycznego tworzenia nowoczesnych interfejsów</p>
            </div>
            
            {/* Supabase */}
            <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col items-center text-center">
              <div className="mb-4 h-16 flex items-center justify-center">
                <svg width="109" height="113" viewBox="0 0 109 113" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12">
                  <path d="M63.7076 110.284C60.8481 113.885 55.0502 111.912 54.9813 107.314L53.9738 40.0627L99.1935 40.0627C107.384 40.0627 111.952 49.5228 106.859 55.9374L63.7076 110.284Z" fill="url(#paint0_linear)" />
                  <path d="M63.7076 110.284C60.8481 113.885 55.0502 111.912 54.9813 107.314L53.9738 40.0627L99.1935 40.0627C107.384 40.0627 111.952 49.5228 106.859 55.9374L63.7076 110.284Z" fill="url(#paint1_linear)" fillOpacity="0.2" />
                  <path d="M45.317 2.07103C48.1765 -1.53037 53.9745 0.442937 54.0434 5.041L54.4849 72.2922H9.83113C1.64038 72.2922 -2.92775 62.8321 2.1655 56.4175L45.317 2.07103Z" fill="#3ECF8E" />
                  <defs>
                    <linearGradient id="paint0_linear" x1="53.9738" y1="54.974" x2="94.1635" y2="71.8295" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#249361" />
                      <stop offset="1" stopColor="#3ECF8E" />
                    </linearGradient>
                    <linearGradient id="paint1_linear" x1="36.1558" y1="30.578" x2="54.4844" y2="106.782" gradientUnits="userSpaceOnUse">
                      <stop />
                      <stop offset="1" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Supabase</h4>
              <p className="text-sm text-gray-600">Otwartoźródłowa alternatywa dla Firebase z bazą PostgreSQL i autentykacją</p>
            </div>
            
            {/* TypeScript */}
            <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col items-center text-center">
              <div className="mb-4 h-16 flex items-center justify-center">
                <svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12">
                  <path fill="#3178C6" d="M20 0h216c11.046 0 20 8.954 20 20v216c0 11.046-8.954 20-20 20H20c-11.046 0-20-8.954-20-20V20C0 8.954 8.954 0 20 0Z" />
                  <path fill="#FFF" d="M150.518 200.475v27.62c4.492 2.302 9.805 4.028 15.938 5.179 6.133 1.151 12.597 1.726 19.393 1.726 6.622 0 12.914-.633 18.874-1.899 5.96-1.266 11.187-3.352 15.678-6.257 4.492-2.906 8.048-6.704 10.669-11.394 2.62-4.689 3.93-10.486 3.93-17.391 0-5.006-.749-9.394-2.246-13.163a30.748 30.748 0 0 0-6.479-10.055c-2.821-2.935-6.205-5.567-10.149-7.898-3.945-2.33-8.394-4.531-13.347-6.602-3.628-1.497-6.881-2.949-9.761-4.359-2.879-1.41-5.327-2.848-7.342-4.316-2.016-1.467-3.571-3.021-4.665-4.661-1.094-1.64-1.641-3.495-1.641-5.567 0-1.899.489-3.61 1.468-5.135s2.362-2.834 4.147-3.927c1.785-1.094 3.973-1.942 6.565-2.547 2.591-.604 5.471-.906 8.638-.906 2.304 0 4.737.173 7.299.518 2.563.345 5.14.877 7.732 1.597a53.669 53.669 0 0 1 7.558 2.719 41.7 41.7 0 0 1 6.781 3.797v-25.807c-4.204-1.611-8.797-2.805-13.778-3.582-4.981-.777-10.697-1.165-17.147-1.165-6.565 0-12.784.705-18.658 2.115-5.874 1.409-11.043 3.61-15.506 6.602-4.463 2.993-7.99 6.805-10.582 11.437-2.591 4.632-3.887 10.17-3.887 16.615 0 8.228 2.375 15.248 7.127 21.06 4.751 5.811 11.963 10.731 21.638 14.759a291.458 291.458 0 0 1 10.625 4.575c3.283 1.496 6.119 3.049 8.509 4.66 2.39 1.611 4.276 3.366 5.658 5.265 1.382 1.899 2.073 4.057 2.073 6.474a9.901 9.901 0 0 1-1.296 4.963c-.863 1.524-2.174 2.848-3.93 3.97-1.756 1.122-3.945 1.999-6.565 2.632-2.62.633-5.687.95-9.2.95-5.989 0-11.92-1.05-17.794-3.151-5.875-2.1-11.317-5.25-16.327-9.451Zm-46.036-68.733H140V109H41v22.742h35.345V233h28.137V131.742Z" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">TypeScript</h4>
              <p className="text-sm text-gray-600">Typowany JavaScript dla lepszej jakości kodu i zmniejszenia liczby błędów</p>
            </div>
          </div>
        </motion.div>
        
        {/* Process Timeline */}
        <div className="mb-16">
          <motion.div 
            className="bg-white rounded-xl p-5 md:p-6 shadow-lg border border-gray-100 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div 
                className="w-10 h-10 rounded-lg flex items-center justify-center text-white"
                  style={{ 
                  background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)'
                }}
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900">Historia projektu</h3>
          </div>
            <p className="text-gray-600 mb-8 max-w-3xl">
              Poznaj etapy realizacji naszego projektu krok po kroku. Każdy projekt przechodzi przez te same fazy, zapewniając najwyższą jakość końcowego produktu.
            </p>

          <Timeline data={[
            {
                title: "Analiza i planowanie",
              content: (
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <p className="text-gray-700 text-sm md:text-base">
                        Rozpoczynamy od dokładnego poznania Twojej firmy, branży i potrzeb. Tworzymy strategię i plan działania.
                      </p>
                    </div>
                    
                    <div className="mx-auto max-w-md">
                      <div className="space-y-3 group">
                        <div 
                          className="aspect-[4/3] relative rounded-xl overflow-hidden shadow-lg transition-all duration-300 
                          transform group-hover:shadow-2xl group-hover:scale-[1.02] border border-gray-100"
                          style={{
                            boxShadow: "0 10px 30px -15px rgba(0, 0, 0, 0.15), 0 0 8px -2px rgba(0, 0, 0, 0.05)"
                          }}
                        >
                    <Image
                            src="/images/case-studies/analysis.jpg"
                      alt="Analiza projektu"
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                        <p className="text-sm text-gray-600 text-center font-medium">Analiza potrzeb i przygotowanie koncepcji projektu</p>
                      </div>
                  </div>
                </div>
              ),
            },
            {
                title: "Projektowanie i rozwój",
              content: (
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <p className="text-gray-700 text-sm md:text-base">
                        Tworzymy projekt graficzny i wdrażamy zaawansowane funkcjonalności z wykorzystaniem najnowszych technologii.
                      </p>
                    </div>
                    
                    <div className="mx-auto max-w-md">
                      <div className="space-y-3 group">
                        <div 
                          className="aspect-video relative rounded-xl overflow-hidden shadow-lg transition-all duration-300 
                          transform group-hover:shadow-2xl group-hover:scale-[1.02] border border-gray-100"
                          style={{
                            boxShadow: "0 10px 30px -15px rgba(0, 0, 0, 0.15), 0 0 8px -2px rgba(0, 0, 0, 0.05)"
                          }}
                        >
                    <Image
                            src="/images/case-studies/design.jpg"
                      alt="Projekt interfejsu"
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                        <p className="text-sm text-gray-600 text-center font-medium">Projekt interfejsu i implementacja funkcjonalności</p>
                      </div>
                  </div>
                </div>
              ),
            },
            {
                title: "Finalizacja i korzyści",
              content: (
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <p className="text-gray-700 text-sm md:text-base">
                        Gotowy projekt przechodzi testy i optymalizację. Dostarczamy produkt, który spełnia wszystkie oczekiwania.
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-8">
                      <div className="flex items-center gap-2 text-gray-700 text-xs md:text-sm">
                        <span className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-xs">✓</span>
                        <span>Unikalna, indywidualna strona</span>
                    </div>
                      <div className="flex items-center gap-2 text-gray-700 text-xs md:text-sm">
                        <span className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-xs">✓</span>
                        <span>Szybkie działanie</span>
                    </div>
                      <div className="flex items-center gap-2 text-gray-700 text-xs md:text-sm">
                        <span className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-xs">✓</span>
                        <span>Responsywność (RWD)</span>
                    </div>
                      <div className="flex items-center gap-2 text-gray-700 text-xs md:text-sm">
                        <span className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-xs">✓</span>
                        <span>Nowoczesne animacje</span>
                    </div>
                      <div className="flex items-center gap-2 text-gray-700 text-xs md:text-sm">
                        <span className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-xs">✓</span>
                        <span>Optymalizacja SEO</span>
                  </div>
                      <div className="flex items-center gap-2 text-gray-700 text-xs md:text-sm">
                        <span className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-xs">✓</span>
                        <span>Wsparcie techniczne</span>
                      </div>
                    </div>
                    
                    <div className="mx-auto max-w-md">
                      <div className="space-y-3 group">
                        <div 
                          className="aspect-video relative rounded-xl overflow-hidden shadow-lg transition-all duration-300 
                          transform group-hover:shadow-2xl group-hover:scale-[1.02] border border-gray-100"
                          style={{
                            boxShadow: "0 10px 30px -15px rgba(0, 0, 0, 0.15), 0 0 8px -2px rgba(0, 0, 0, 0.05)"
                          }}
                        >
                    <Image
                            src="/images/case-studies/final-1.jpg"
                            alt="Finalny projekt"
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                        <p className="text-sm text-gray-600 text-center font-medium">Gotowy projekt - strona główna</p>
                      </div>
                  </div>
                </div>
              ),
            },
          ]} />
          </motion.div>
        </div>
        
        {/* Benefits and Value Proposition */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="bg-white rounded-xl p-5 shadow-lg border border-gray-100">
            <div 
              className="w-12 h-12 rounded-lg flex items-center justify-center text-white mb-4"
              style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)' }}
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Bezpieczeństwo</h3>
            <p className="text-gray-600">
              Strony budowane od podstaw są bardziej bezpieczne niż gotowe szablony czy CMS, które często stają się celem cyberataków.
            </p>
          </div>
          
          <div className="bg-white rounded-xl p-5 shadow-lg border border-gray-100">
            <div 
              className="w-12 h-12 rounded-lg flex items-center justify-center text-white mb-4"
              style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)' }}
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Wydajność</h3>
            <p className="text-gray-600">
              Nasze strony działają błyskawicznie dzięki wykorzystaniu nowoczesnych technologii i optymalizacji kodu.
            </p>
          </div>
          
          <div className="bg-white rounded-xl p-5 shadow-lg border border-gray-100">
            <div 
              className="w-12 h-12 rounded-lg flex items-center justify-center text-white mb-4"
              style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)' }}
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Skalowalność</h3>
            <p className="text-gray-600">
              Twoja strona może rosnąć wraz z Twoją firmą. Łatwo rozszerzysz ją o nowe funkcje bez przebudowy całego systemu.
            </p>
          </div>
        </motion.div>
        
        {/* CTA Section */}
        <motion.div 
          className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-8 text-white text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-4">Gotowy na stronę internetową z wyższej półki?</h3>
          <p className="text-white/80 mb-6 max-w-2xl mx-auto">
            Pozwól nam stworzyć dla Ciebie unikalną stronę, która wyróżni Twoją firmę na tle konkurencji i zapewni doskonałe doświadczenia użytkownikom.
          </p>
          <button className="px-6 py-3 bg-white text-indigo-600 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            Zamów bezpłatną konsultację
          </button>
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
    <div id="realizacje">
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
      
    </div>
  );
}