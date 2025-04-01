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
  const [key, setKey] = useState(0); // Add key for forcing re-render

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    if (!isPlaying) {
      timeoutId = setTimeout(() => {
        setKey(prev => prev + 1); // Force re-render
        setIsPlaying(true);
      }, 10000); // 10 seconds delay
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [isPlaying]);

  return (
    <section 
      id="hero" 
      className="min-h-screen flex items-center pt-16 relative overflow-hidden bg-gradient-to-b from-primary-900 via-primary-800/95 to-primary-600"
    >
      {/* Background with improved gradient */}
      <div className="absolute inset-0">
        {/* Simplified background pattern with reduced opacity */}
        <div 
          className="absolute inset-0 opacity-[0.01]"
          style={{
            backgroundImage: "url('data:image/svg+xml,%3Csvg xmlns=\"http://www.w3.org/2000/svg\" width=\"100\" height=\"100\" viewBox=\"0 0 100 100\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.1\"%3E%3Cpath d=\"M0 0h50v50H0V0zm50 50h50v50H50V50zm0-50h2l-2 2V0zm0 4l4-4h2l-6 6V4zm0 4l8-8h2L50 10V8zm0 4L62 0h2L50 14v-2zm0 4L66 0h2L50 18v-2zm0 4L70 0h2L50 22v-2zm0 4L74 0h2L50 26v-2zm0 4L78 0h2L50 30v-2zm0 4L82 0h2L50 34v-2zm0 4L86 0h2L50 38v-2zm0 4L90 0h2L50 42v-2zm0 4L94 0h2L50 46v-2zm0 4L98 0h2L50 50v-2zM0 50h2l-2 2v-2zm4 4l4-4h2l-6 6v-2zm4 4l8-8h2L8 58v-2zm4 4l12-12h2L12 62v-2zm4 4l16-16h2L16 66v-2zm4 4l20-20h2L20 70v-2zm4 4l24-24h2L24 74v-2zm4 4l28-28h2L28 78v-2zm4 4l32-32h2L32 82v-2zm4 4l36-36h2L36 86v-2zm4 4l40-40h2L40 90v-2zm4 4l44-44h2L44 94v-2zm4 4l48-48h2L48 98v-2zm4 4l52-52h2L52 100v-2z\"%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E')"
          }}
        />
        {/* Simplified gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary-900/20 via-transparent to-primary-600/20"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            className="text-center lg:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Badge */}
            <motion.div 
              className="inline-flex items-center bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <span className="w-2 h-2 bg-accent-400 rounded-full mr-2 animate-pulse"></span>
              Nowoczesne rozwiązania webowe
            </motion.div>

            {/* Main heading with reduced animation complexity */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight font-heading">
              Tworzymy <span className="text-accent-400">strony</span> i <span className="text-secondary-400">aplikacje</span>, które <span className="text-white">wyróżniają</span> Twój biznes
            </h1>

            {/* Subheading with optimized animation */}
            <motion.p 
              className="mt-6 text-xl text-gray-200 max-w-2xl mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              Profesjonalne rozwiązania webowe, które zwiększają sprzedaż i budują wizerunek Twojej firmy. Szybko, nowocześnie i skutecznie.
            </motion.p>

            {/* CTA buttons with optimized animations */}
            <motion.div 
              className="mt-8 flex flex-col sm:flex-row justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <Link 
                href="#kontakt" 
                className="group bg-gradient-to-r from-accent-500 to-accent-600 text-white px-8 py-4 rounded-full font-medium text-lg hover:shadow-lg transform hover:-translate-y-1 transition-all flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2 focus:ring-offset-primary-900"
              >
                Bezpłatna wycena
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
              <Link 
                href="#realizacje" 
                className="bg-white/10 backdrop-blur-sm text-white border border-white/20 px-8 py-4 rounded-full font-medium text-lg hover:bg-white/20 transition-all flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-primary-900"
              >
                Zobacz realizacje
              </Link>
            </motion.div>

            {/* Social proof with optimized animations */}
            <motion.div 
              className="mt-12 flex justify-center lg:justify-start items-center space-x-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <div className="flex flex-col items-center lg:items-start">
                <span className="text-accent-400 text-3xl font-bold">98%</span>
                <span className="text-gray-300 text-sm">Zadowolonych klientów</span>
              </div>
              <div className="w-px h-12 bg-white/20"></div>
              <div className="flex flex-col items-center lg:items-start">
                <span className="text-accent-400 text-3xl font-bold">100+</span>
                <span className="text-gray-300 text-sm">Zrealizowanych projektów</span>
              </div>
              <div className="w-px h-12 bg-white/20"></div>
              <div className="flex flex-col items-center lg:items-start">
                <span className="text-accent-400 text-3xl font-bold">4.9★</span>
                <span className="text-gray-300 text-sm">Średnia ocena</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Optimized Device Mockup */}
          <motion.div 
            className="hidden lg:block"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative">
              {/* Simplified decorative elements */}
              <div className="absolute -inset-4 bg-gradient-to-r from-accent-500/10 to-secondary-500/10 rounded-3xl blur-2xl"></div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-accent-500 rounded-full opacity-10 blur-xl"></div>
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-secondary-500 rounded-full opacity-10 blur-xl"></div>

              {/* Optimized mockup container */}
              <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-4 shadow-2xl">
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
      
      {/* Simplified decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-gray-50 via-gray-50/90 to-transparent"></div>
      <div className="hidden lg:block absolute top-1/4 -right-16 w-64 h-64 bg-accent-500/5 rounded-full filter blur-2xl animate-pulse"></div>
      <div className="hidden lg:block absolute bottom-1/3 -left-20 w-80 h-80 bg-secondary-500/5 rounded-full filter blur-2xl animate-pulse delay-1000"></div>
    </section>
  );
}