import React from 'react';
import Link from 'next/link';
import BlogHeader from '@/components/layout/BlogHeader';

export default function BlogNotFound() {
  return (
    <div className="bg-gray-50 min-h-screen relative">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none bg-pattern"></div>
      
      {/* Blog Header */}
      <BlogHeader 
        title="404 - Strona nie znaleziona"
        description="Przepraszamy, ale szukana przez Ciebie strona nie istnieje lub została przeniesiona."
        imageSrc="/images/blog/404-header.jpg"
      />
      
      <div className="flex items-center justify-center py-16 relative z-10">
        <div className="max-w-xl px-6 text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/blog"
              className="inline-flex items-center justify-center bg-primary-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-primary-700 transition-colors"
            >
              Zobacz wszystkie artykuły
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center bg-gray-200 text-gray-800 px-6 py-3 rounded-xl font-medium hover:bg-gray-300 transition-colors"
            >
              Strona główna
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 