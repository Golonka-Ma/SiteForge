'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface BlogHeaderProps {
  title: string;
  description?: string;
  imageSrc?: string;
  category?: string;
  categoryStyle?: string;
}

export default function BlogHeader({
  title,
  description,
  imageSrc = '/images/blog/blog-header-default.jpg',
  category,
  categoryStyle
}: BlogHeaderProps) {
  // Original heights were h-64 (16rem), md:h-80 (20rem), lg:h-96 (24rem)
  // Increasing by 15%: 16 * 1.15 = 18.4rem, 20 * 1.15 = 23rem, 24 * 1.15 = 27.6rem
  return (
    <header className="relative h-[18.4rem] md:h-[23rem] lg:h-[27.6rem] overflow-hidden">
      {/* Background image */}
      <Image
        src={imageSrc}
        alt={title}
        fill
        priority
        sizes="100vw"
        style={{ objectFit: 'cover', objectPosition: 'center' }}
      />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/30 flex items-end">
        <div className="container mx-auto px-4 md:px-6 pb-12 md:pb-16">
          {/* Category tag */}
          {category && categoryStyle && (
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className={`inline-block px-3 py-1 rounded-full text-xs font-semibold text-white shadow-md mb-3 ${categoryStyle}`}
            >
              {category}
            </motion.span>
          )}
          
          {/* Title */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white font-heading max-w-4xl"
          >
            {title}
          </motion.h1>
          
          {/* Description */}
          {description && (
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-4 text-lg md:text-xl text-white/90 max-w-3xl"
            >
              {description}
            </motion.p>
          )}
        </div>
      </div>
    </header>
  );
} 