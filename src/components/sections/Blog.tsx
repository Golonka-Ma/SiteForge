'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { getAllPosts, categoryStyles, BlogPost } from '@/app/data/blogPosts';

interface BlogPostCardProps {
  post: BlogPost;
  variants: {
    hidden: { opacity: number; y: number };
    visible: { opacity: number; y: number; transition: { duration: number } };
  };
}

export default function Blog() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  
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

  useEffect(() => {
    async function fetchPosts() {
      try {
        const posts = await getAllPosts();
        setBlogPosts(posts);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchPosts();
  }, []);
  
  if (loading || blogPosts.length === 0) {
    return (
      <section id="blog" className="py-20 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-heading">
            Blog i porady
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Ładowanie artykułów...
          </p>
        </div>
      </section>
    );
  }

  const featuredPost = blogPosts[0];
  const recentPosts = blogPosts.slice(1);
  const featuredPostStyle = categoryStyles[featuredPost.category];

  return (
    <section id="blog" className="py-20 bg-white relative overflow-hidden">
      {/* Background decorative elements (bez zmian) */}
      <div className="absolute inset-0 overflow-hidden -z-10"> {/* Dodano -z-10 dla pewności, że jest pod gradientem */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-500/5 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary-500/5 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-accent-500/5 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-4000"></div>
      </div>

      {/* Gradient overlay (bez zmian, ale upewnijmy się, że jest nad blobami, a pod treścią) */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-white/80 to-white z-0"></div>


      {/* Content (z-10 dla kontenera, aby był nad gradientem i blobami) */}
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
        {featuredPost && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="mb-16"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center p-6 rounded-xl shadow-soft border border-gray-100 bg-white/70 backdrop-blur-sm"> {/* Subtelne tło dla wyróżnionego posta */}
              <motion.div variants={itemVariants} className="relative">
                <div className="relative w-full h-64 sm:h-80 rounded-xl overflow-hidden"> {/* Zmieniam rounded-lg na rounded-xl dla lepszej spójności */}
                  <Image
                    src={featuredPost.imageSrc}
                    alt={featuredPost.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    style={{ objectFit: 'cover', objectPosition: 'center' }}
                    className="transition-transform duration-500 hover:scale-105 rounded-xl"
                    priority={true}
                    loading="eager"
                    quality={100}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/images/blog/placeholder.jpg';
                    }}
                  />
                </div>
                <div className="absolute top-4 right-4 sm:right-4 z-10"> {/* Poprawione pozycjonowanie etykiety dla wersji mobilnej */}
                  <span className={`px-3 py-1 rounded-full text-sm font-medium text-white shadow-md ${featuredPostStyle.tagBg}`}>
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
                <h3 className={`text-2xl font-bold text-gray-900 font-heading hover:${featuredPostStyle.text} transition-colors`}>
                  <Link href={`/blog/${featuredPost.slug}`}>
                    {featuredPost.title}
                  </Link>
                </h3>
                <p className="text-gray-600">
                  {featuredPost.excerpt}
                </p>
                <Link
                  href={`/blog/${featuredPost.slug}`}
                  className={`inline-flex items-center ${featuredPostStyle.text} hover:underline font-medium group`}
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
        )}

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
        {blogPosts.length > 0 && ( // Pokaż przycisk tylko jeśli są posty
            <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: recentPosts.length * 0.1 + 0.5 }}
            className="text-center mt-16"
            >
            <Link
                href="/blog"
                className="inline-flex items-center bg-gradient-to-r from-accent-500 to-accent-600 text-white px-8 py-3 rounded-xl font-medium hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2"
            >
                Zobacz wszystkie artykuły
                <svg
                className="w-5 h-5 ml-2 transition-transform duration-200 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                ></path>
                </svg>
            </Link>
            </motion.div>
        )}
      </div>
    </section>
  );
}

function BlogCard({ post, variants }: BlogPostCardProps) {
  const postStyle = categoryStyles[post.category];

  return (
    <motion.article
      variants={variants}
      className={`bg-white rounded-xl overflow-hidden shadow-soft hover:shadow-lg transition-all duration-300 border border-gray-100 flex flex-col group ${postStyle.bg}_lighter`}
    >
      <div className="relative aspect-w-16 aspect-h-9">
        <Image
          src={post.imageSrc}
          alt={post.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          className="transform group-hover:scale-105 transition-transform duration-500 rounded-t-xl"
          loading="eager"
          quality={100}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/images/blog/placeholder.jpg';
          }}
        />
        <div className="absolute top-4 right-4 z-10">
          {/* Tag kategorii z dynamicznym kolorem tła */}
          <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white shadow-md ${postStyle.tagBg}`}>
            {post.category}
          </span>
        </div>
      </div>
      <div className="p-6 flex flex-col flex-grow"> {/* flex-grow aby zawartość wypełniła kartę */}
        <div className="flex items-center space-x-3 text-xs text-gray-500 mb-3"> {/* Zmniejszony rozmiar i margines */}
          <span>{post.date}</span>
          <span className="text-gray-300">•</span> {/* Jaśniejszy separator */}
          <span>{post.readTime} min czytania</span>
        </div>
        <h3 className={`text-lg font-bold text-gray-900 mb-2 font-heading group-hover:${postStyle.text} transition-colors`}>
           <Link href={`/blog/${post.slug}`}>
            {post.title}
          </Link>
        </h3>
        <p className="text-gray-600 text-sm mb-4 flex-grow"> {/* flex-grow dla excerptu */}
          {post.excerpt}
        </p>
        <Link
          href={`/blog/${post.slug}`}
          className={`inline-flex items-center text-sm ${postStyle.text} hover:underline font-medium mt-auto`} // mt-auto aby link był na dole
        >
          Czytaj więcej
          <svg
            className="w-3.5 h-3.5 ml-1.5 transform group-hover:translate-x-0.5 transition-transform" // Mniejsza strzałka
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