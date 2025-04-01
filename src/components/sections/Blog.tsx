'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  category: keyof typeof categoryColors;
  slug: string;
  imageSrc: string;
  readTime: number;
}

interface BlogPostCardProps {
  post: BlogPost;
  variants: {
    hidden: { opacity: number; y: number };
    visible: { opacity: number; y: number; transition: { duration: number } };
  };
}

// Mapowanie kategorii do kolorów
const categoryColors = {
  'UX/UI': 'cyan',
  'SEO': 'amber',
  'Performance': 'green',
  'Development': 'blue',
  'Marketing': 'purple'
} as const;

// Przykładowe dane blogowe
const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'Jak skuteczna strona internetowa zwiększa sprzedaż?',
    excerpt: 'Poznaj 7 kluczowych elementów, które sprawiają, że strona internetowa staje się maszyną do generowania leadów i zwiększania sprzedaży.',
    date: '12 marca 2025',
    category: 'UX/UI',
    slug: 'jak-skuteczna-strona-zwieksza-sprzedaz',
    imageSrc: '/images/blog/post-1.jpg',
    readTime: 5
  },
  {
    id: 2,
    title: '5 najczęstszych błędów na stronach firmowych',
    excerpt: 'Poznaj typowe błędy, które mogą kosztować Twoją firmę utratę klientów i dowiedz się, jak ich uniknąć, aby zwiększyć konwersję.',
    date: '28 lutego 2025',
    category: 'SEO',
    slug: 'najczestsze-bledy-na-stronach-firmowych',
    imageSrc: '/images/blog/post-2.jpg',
    readTime: 7
  },
  {
    id: 3,
    title: 'Dlaczego Core Web Vitals są kluczowe dla Twojego SEO',
    excerpt: 'Jak metryki wydajności wpływają na pozycję Twojej strony w Google i co zrobić, aby osiągnąć maksymalny wynik 100/100.',
    date: '15 lutego 2025',
    category: 'Performance',
    slug: 'core-web-vitals-seo',
    imageSrc: '/images/blog/post-3.jpg',
    readTime: 6
  }
];

export default function Blog() {
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

  const featuredPost = blogPosts[0];
  const recentPosts = blogPosts.slice(1);

  return (
    <section id="blog" className="py-20 bg-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-500/5 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary-500/5 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-accent-500/5 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-4000"></div>
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-white/90 to-white"></div>

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
            Blog i porady
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Sprawdź nasze najnowsze artykuły i dowiedz się więcej o tworzeniu stron internetowych
          </p>
        </motion.div>

        {/* Featured post */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mb-16"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <motion.div variants={itemVariants} className="relative">
              <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden">
                <Image
                  src={featuredPost.imageSrc}
                  alt={featuredPost.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{ objectFit: 'cover' }}
                  className="transform hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="absolute top-4 left-4">
                <span className="bg-accent-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                  {featuredPost.category}
                </span>
              </div>
            </motion.div>
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span>{featuredPost.date}</span>
                <span>•</span>
                <span>{featuredPost.readTime} min czytania</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 font-heading">
                {featuredPost.title}
              </h3>
              <p className="text-gray-600">
                {featuredPost.excerpt}
              </p>
              <Link
                href={`/blog/${featuredPost.slug}`}
                className="inline-flex items-center text-accent-500 hover:text-accent-600 font-medium group"
              >
                Czytaj więcej
                <svg
                  className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform"
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
            </motion.div>
          </div>
        </motion.div>

        {/* Recent posts grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {recentPosts.map((post) => (
            <BlogCard key={post.id} post={post} variants={itemVariants} />
          ))}
        </motion.div>

        {/* View all posts button */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center mt-12"
        >
          <Link
            href="/blog"
            className="inline-flex items-center px-8 py-4 bg-accent-500 text-white rounded-full font-medium hover:bg-accent-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2"
          >
            Zobacz wszystkie artykuły
            <svg
              className="w-5 h-5 ml-2"
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
        </motion.div>
      </div>
    </section>
  );
}

function BlogCard({ post, variants }: BlogPostCardProps) {
  return (
    <motion.article
      variants={variants}
      className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
    >
      <div className="relative aspect-w-16 aspect-h-9">
        <Image
          src={post.imageSrc}
          alt={post.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{ objectFit: 'cover' }}
          className="transform hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-accent-500 text-white px-4 py-1 rounded-full text-sm font-medium">
            {post.category}
          </span>
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
          <span>{post.date}</span>
          <span>•</span>
          <span>{post.readTime} min czytania</span>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-3 font-heading">
          {post.title}
        </h3>
        <p className="text-gray-600 mb-4">
          {post.excerpt}
        </p>
        <Link
          href={`/blog/${post.slug}`}
          className="inline-flex items-center text-accent-500 hover:text-accent-600 font-medium group"
        >
          Czytaj więcej
          <svg
            className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform"
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
    </motion.article>
  );
}