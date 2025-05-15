import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getAllPosts, categoryStyles } from '../data/blogPosts';
import { Metadata } from 'next';
import BlogHeader from '@/components/layout/BlogHeader';

export const metadata: Metadata = {
  title: 'Blog | SiteForge.pl',
  description: 'Sprawdź nasze najnowsze artykuły i porady dotyczące tworzenia stron internetowych, optymalizacji SEO i rozwoju biznesu online.',
  keywords: ['blog', 'artykuły', 'strony internetowe', 'SEO', 'web development'],
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <div className="bg-gray-50 min-h-screen relative">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none bg-pattern"></div>
      
      {/* Blog Header */}
      <BlogHeader 
        title="Blog i porady"
        description="Najnowsze artykuły, porady i case studies z zakresu projektowania stron internetowych, SEO i strategii cyfrowych."
        imageSrc="/images/blog/blog-header.jpg"
      />

      {/* Blog posts grid */}
      <section className="py-16 md:py-24 relative z-10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => {
              const postStyle = categoryStyles[post.category];
              
              return (
                <article 
                  key={post.id}
                  className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 flex flex-col group"
                >
                  <div className="relative aspect-w-16 aspect-h-9">
                    <Image
                      src={post.imageSrc}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      style={{ objectFit: 'cover', objectPosition: 'center' }}
                      className="transform group-hover:scale-105 transition-transform duration-500 rounded-t-xl"
                    />
                    <div className="absolute top-4 right-4 z-10">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white shadow-md ${postStyle.tagBg}`}>
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center space-x-3 text-xs text-gray-500 mb-3">
                      <span>{post.date}</span>
                      <span className="text-gray-300">•</span>
                      <span>{post.readTime} min czytania</span>
                    </div>
                    <h2 className={`text-xl font-bold text-gray-900 mb-2 font-heading group-hover:${postStyle.text} transition-colors`}>
                      <Link href={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h2>
                    <p className="text-gray-600 text-sm mb-4 flex-grow">
                      {post.excerpt}
                    </p>
                    <Link
                      href={`/blog/${post.slug}`}
                      className={`inline-flex items-center text-sm ${postStyle.text} hover:underline font-medium mt-auto`}
                    >
                      Czytaj więcej
                      <svg
                        className="w-3.5 h-3.5 ml-1.5 transform group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
