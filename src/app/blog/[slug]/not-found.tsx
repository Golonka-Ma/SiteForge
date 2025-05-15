import React from 'react';
import Link from 'next/link';
import BlogNavbar from '@/components/layout/BlogNavbar';

export default function BlogPostNotFound() {
  return (
    <div className="bg-gray-50 min-h-screen pt-16">
      {/* Blog Navigation */}
      <BlogNavbar />
      
      <div className="flex items-center justify-center py-24">
        <div className="max-w-xl px-6 text-center">
          <div className="text-6xl font-bold text-primary-600 mb-4">404</div>
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Post nie znaleziony</h1>
          <p className="text-lg text-gray-600 mb-8">
            Przepraszamy, ale szukany przez Ciebie artykuł nie istnieje lub został przeniesiony.
          </p>
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