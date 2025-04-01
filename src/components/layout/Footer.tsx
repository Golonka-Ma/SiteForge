'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function Footer() {
  // Linki do sekcji
  const serviceLinks = [
    { label: 'Strony wizytówki', href: '#oferta' },
    { label: 'Landing Pages', href: '#oferta' },
    { label: 'Aplikacje webowe', href: '#oferta' },
    { label: 'Automatyzacja marketingu', href: '#oferta' },
    { label: 'Optymalizacja SEO', href: '#oferta' }
  ];
  
  const companyLinks = [
    { label: 'O nas', href: '/o-nas' },
    { label: 'Realizacje', href: '#realizacje' },
    { label: 'Blog', href: '#blog' },
    { label: 'Kariera', href: '/kariera' },
    { label: 'Kontakt', href: '#kontakt' }
  ];
  
  const socialLinks = [
    { icon: 'facebook-f', href: 'https://facebook.com/siteforge' },
    { icon: 'twitter', href: 'https://twitter.com/siteforge' },
    { icon: 'instagram', href: 'https://instagram.com/siteforge.pl' },
    { icon: 'linkedin-in', href: 'https://linkedin.com/company/siteforge-pl' }
  ];

  return (
    <footer className="bg-gray-900 text-gray-400 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* About section */}
          <div>
            <Link href="/" className="flex items-center mb-6">
              <span className="text-2xl font-bold font-heading">
                <span className="text-accent-400">Site</span>
                <span className="text-white">Forge</span>
                <span className="text-white/80 text-base">.pl</span>
              </span>
            </Link>
            <p className="mb-6 text-gray-400">Tworzymy nowoczesne strony internetowe i aplikacje webowe, które zwiększają sprzedaż i budują wizerunek Twojej firmy.</p>
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <motion.a 
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-accent-400 transition-colors focus:outline-none focus:ring-2 focus:ring-accent-400/50 focus:ring-offset-2 focus:ring-offset-gray-900 rounded-full p-2"
                  whileHover={{ y: -3 }}
                >
                  <i className={`fab fa-${link.icon}`}></i>
                </motion.a>
              ))}
            </div>
          </div>
          
          {/* Services section */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6 font-heading">Usługi</h4>
            <ul className="space-y-4">
              {serviceLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href} 
                    className="text-gray-400 hover:text-accent-400 transition-colors focus:outline-none focus:ring-2 focus:ring-accent-400/50 focus:ring-offset-2 focus:ring-offset-gray-900 rounded-lg px-2 py-1 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Company section */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6 font-heading">Firma</h4>
            <ul className="space-y-4">
              {companyLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href} 
                    className="text-gray-400 hover:text-accent-400 transition-colors focus:outline-none focus:ring-2 focus:ring-accent-400/50 focus:ring-offset-2 focus:ring-offset-gray-900 rounded-lg px-2 py-1 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact section */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6 font-heading">Kontakt</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <i className="fas fa-map-marker-alt mt-1 mr-3 text-secondary"></i>
                <span>ul. Przykładowa 123, 00-001 Warszawa</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-phone mt-1 mr-3 text-secondary"></i>
                <span>+48 123 456 789</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-envelope mt-1 mr-3 text-secondary"></i>
                <span>kontakt@siteforge.pl</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-clock mt-1 mr-3 text-secondary"></i>
                <span>Pon-Pt: 9:00-17:00</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom section with copyright and legal links */}
        <div className="border-t border-gray-800 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center">
          <p>&copy; {new Date().getFullYear()} SiteForge.pl. Wszelkie prawa zastrzeżone.</p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <Link href="/polityka-prywatnosci" className="hover:text-secondary transition-colors">
              Polityka prywatności
            </Link>
            <Link href="/regulamin" className="hover:text-secondary transition-colors">
              Regulamin
            </Link>
            <Link href="/cookies" className="hover:text-secondary transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
      
      {/* Back to top button */}
      <BackToTopButton />
    </footer>
  );
}
// Back to top button component
function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Show button when page is scrolled down
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  return (
    <motion.button
      onClick={scrollToTop}
      initial={{ opacity: 0, y: 10 }}
      animate={{ 
        opacity: isVisible ? 1 : 0,
        y: isVisible ? 0 : 10
      }}
      transition={{ duration: 0.3 }}
      className={`fixed bottom-8 right-8 bg-secondary text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-secondary-dark focus:outline-none z-50 ${
        isVisible ? 'visible' : 'invisible'
      }`}
      aria-label="Powrót na górę strony"
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-6 w-6" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M5 15l7-7 7 7" 
        />
      </svg>
    </motion.button>
  );
}

