'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

// Dynamically import Lottie with no SSR
const Lottie = dynamic(() => import('lottie-react'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-white/10 backdrop-blur-sm rounded-xl animate-pulse" />
  ),
});

// Import the animation data
const deviceMockup = require('../../../public/animations/device-mockup.json');

export default function Hero() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [key, setKey] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    if (!isPlaying) {
      timeoutId = setTimeout(() => {
        setKey(prev => prev + 1);
        setIsPlaying(true);
      }, 10000);
    }

    // Check for mobile on mount and window resize
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [isPlaying]);

  return (
    <section 
      id="hero" 
      className="min-h-screen flex items-center pt-6 md:pt-16 pb-40 md:pb-48 relative overflow-hidden bg-gradient-to-b from-primary-900 via-primary-800/95 to-primary-600"
    >
      {/* Background with improved gradient */}
      <div className="absolute inset-0">
        {/* Enhanced background pattern */}
        <div 
          className="absolute inset-0 opacity-[0.5]"
          style={{
            backgroundImage: "url('data:image/svg+xml,%3Csvg xmlns=\"http://www.w3.org/2000/svg\" width=\"100\" height=\"100\" viewBox=\"0 0 100 100\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.1\"%3E%3Cpath d=\"M0 0h50v50H0V0zm50 50h50v50H50V50zm0-50h2l-2 2V0zm0 4l4-4h2l-6 6V4zm0 4l8-8h2L50 10V8zm0 4L62 0h2L50 14v-2zm0 4L66 0h2L50 18v-2zm0 4L70 0h2L50 22v-2zm0 4L74 0h2L50 26v-2zm0 4L78 0h2L50 30v-2zm0 4L82 0h2L50 34v-2zm0 4L86 0h2L50 38v-2zm0 4L90 0h2L50 42v-2zm0 4L94 0h2L50 46v-2zm0 4L98 0h2L50 50v-2zM0 50h2l-2 2v-2zm4 4l4-4h2l-6 6v-2zm4 4l8-8h2L8 58v-2zm4 4l12-12h2L12 62v-2zm4 4l16-16h2L16 66v-2zm4 4l20-20h2L20 70v-2zm4 4l24-24h2L24 74v-2zm4 4l28-28h2L28 78v-2zm4 4l32-32h2L32 82v-2zm4 4l36-36h2L36 86v-2zm4 4l40-40h2L40 90v-2zm4 4l44-44h2L44 94v-2zm4 4l48-48h2L48 98v-2zm4 4l52-52h2L52 100v-2z\"%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E')"
          }}
        />
        {/* Enhanced gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary-900/40 via-transparent to-primary-600/40"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-accent-500/10 via-transparent to-secondary-500/10"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 md:px-6 py-6 md:py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            className="text-center lg:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Mobile Logo - visible only on mobile screens */}
            {isMobile && (
              <motion.div 
                className="flex justify-center lg:justify-start items-center mb-4"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Link href="/" className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full shadow-md">
                  <span className="text-2xl font-semibold text-white">Service</span>
                  <span className="text-2xl font-semibold text-accent-400">Flow</span>
                  <span className="text-lg font-medium text-gray-400/90">.agency</span>
                </Link>
              </motion.div>
            )}

            {/* Enhanced Badge */}
            <motion.div 
              className="inline-flex items-center bg-white/10 backdrop-blur-xl text-white px-4 py-2 rounded-full text-sm font-medium mb-6 border border-white/10 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <span className="w-2 h-2 bg-accent-400 rounded-2xl mr-2 animate-pulse"></span>
              Twój Partner w Cyfrowym Wzroście
            </motion.div>

            {/* Main heading with refined spacing and enhanced impact */}
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.2] md:leading-[1.2] lg:leading-[1.2] font-heading tracking-tight"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <span className="block mb-1">Projektujemy</span>
              <span className="block mb-1">
                <span className="text-accent-400">doświadczenia cyfrowe</span>,
              </span>
              <span className="block">
                które budują <span className="text-secondary-400">Liderów</span> <span className="text-white">Rynku.</span>
              </span>
            </motion.h1>

            {/* Subheading with enhanced styling */}
            <motion.p 
              className="mt-6 text-xl text-gray-200 max-w-2xl mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              Jako Twój strategiczny partner, łączymy technologię z kreacją, która angażuje i konwertuje. Twoje cele stają się naszymi.
            </motion.p>

            {/* Enhanced CTA buttons */}
            <motion.div 
              className="mt-8 flex flex-col sm:flex-row justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <Link 
                href="#kontakt" 
                className="group bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 text-white px-8 py-4 rounded-2xl font-medium text-lg hover:shadow-lg transform hover:-translate-y-1 transition-all flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2 focus:ring-offset-primary-900 relative overflow-hidden"
              >
                <span className="relative z-10">Umów bezpłatną konsultację</span>
                <div className="absolute inset-0 bg-gradient-to-r from-accent-400 to-accent-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform relative z-10" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
              <Link 
                href="#realizacje" 
                className="bg-white/10 backdrop-blur-xl text-white border border-white/20 px-8 py-4 rounded-2xl font-medium text-lg hover:bg-white/20 transition-all flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-primary-900 group"
              >
                <span className="relative z-10">Zobacz nasze realizacje</span>
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
              </Link>
            </motion.div>

            {/* Enhanced Social proof - optimized for mobile */}
            <motion.div 
              className="mt-12 px-2 sm:px-0 mx-auto lg:mx-0 max-w-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <div className="inline-flex justify-center lg:justify-start items-center space-x-3 sm:space-x-10 py-4 px-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/10">
                <div className="flex flex-col items-center lg:items-start shrink-0">
                  <span className="text-accent-400 text-2xl sm:text-3xl font-bold">98%</span>
                  <span className="text-gray-300 text-sm">Zadowolonych klientów</span>
                </div>
                <div className="w-px h-10 sm:h-12 bg-white/20 shrink-0"></div>
                <div className="flex flex-col items-center lg:items-start shrink-0">
                  <span className="text-accent-400 text-2xl sm:text-3xl font-bold">100+</span>
                  <span className="text-gray-300 text-sm">Ukończonych projektów</span>
                </div>
                <div className="hidden sm:block w-px h-10 sm:h-12 bg-white/20 shrink-0"></div>
                <div className="hidden sm:flex flex-col items-center lg:items-start shrink-0">
                  <span className="text-accent-400 text-2xl sm:text-3xl font-bold">4.9★</span>
                  <span className="text-gray-300 text-sm">Średnia ocena</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Enhanced Device Mockup */}
          <motion.div 
            className="hidden lg:block"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative">
              {/* Enhanced decorative elements */}
              <div className="absolute -inset-4 bg-gradient-to-r from-accent-500/20 to-secondary-500/20 rounded-3xl blur-2xl"></div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-accent-500 rounded-full opacity-20 blur-xl"></div>
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-secondary-500 rounded-full opacity-20 blur-xl"></div>

              {/* Enhanced mockup container */}
              <div className="relative bg-white/10 backdrop-blur-xl rounded-2xl p-4 shadow-2xl border border-white/10">
                <div className="relative w-full aspect-[4/3]">
                  <Lottie
                    key={key}
                    animationData={deviceMockup}
                    loop={false}
                    autoplay={isPlaying}
                    className="w-full h-full"
                    rendererSettings={{
                      preserveAspectRatio: 'xMidYMid slice',
                      progressiveLoad: true
                    }}
                    onComplete={() => setIsPlaying(false)}
                    style={{ willChange: 'transform' }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Enhanced decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-gray-50 via-gray-50/90 to-transparent"></div>
      <div className="hidden lg:block absolute top-1/4 -right-16 w-64 h-64 bg-accent-500/10 rounded-full filter blur-2xl animate-pulse"></div>
      <div className="hidden lg:block absolute bottom-1/3 -left-20 w-80 h-80 bg-secondary-500/10 rounded-full filter blur-2xl animate-pulse delay-1000"></div>
    </section>
  );
}