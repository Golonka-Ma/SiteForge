'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Footer() {
  // Linki do sekcji
  const serviceLinks = [
    { label: 'Strony wizytówki', href: '#oferta' },
    { label: 'Pakiet startowy dla biznesu', href: '#oferta' },
    { label: 'Landing Pages', href: '#oferta' },
    { label: 'Aplikacje webowe AI', href: '#oferta' },
    { label: 'System AI dla klinik', href: '#oferta' },
    { label: 'Systemy dla lokalnych biznesów', href: '#oferta' }
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
    <footer className="bg-primary-900/95 backdrop-blur-xl text-gray-300 pt-12 pb-6 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary-900/50 to-primary-900/95"></div>
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-1"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About section */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center mb-4 group">
              <span className="text-xl font-bold font-heading transition-all duration-300 group-hover:scale-105">
                <span className="text-accent-400">Site</span>
                <span className="text-white">Forge</span>
                <span className="text-white/80 text-sm">.pl</span>
              </span>
            </Link>
            <p className="mb-4 text-sm text-gray-400">Tworzymy nowoczesne strony internetowe i aplikacje webowe, które zwiększają sprzedaż i budują wizerunek Twojej firmy.</p>
            <div className="flex space-x-3">
              {socialLinks.map((link, index) => (
                <motion.a 
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-accent-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent-400/50 focus:ring-offset-2 focus:ring-offset-primary-900 rounded-full p-1.5 hover:bg-white/5"
                  whileHover={{ y: -2 }}
                >
                  <i className={`fab fa-${link.icon}`}></i>
                </motion.a>
              ))}
            </div>
          </div>
          
          {/* Services and Company section */}
          <div className="md:col-span-2 grid grid-cols-2 gap-8">
            {/* Services section */}
            <div>
              <h4 className="text-base font-bold text-white mb-4 font-heading">Usługi</h4>
              <div className="grid grid-cols-2 gap-4">
                {/* Standard Services */}
                <div>
                  <h5 className="text-xs font-semibold text-accent-400 mb-2">Rozwiązania standardowe</h5>
                  <ul className="space-y-2">
                    {serviceLinks.slice(0, 3).map((link, index) => (
                      <li key={index}>
                        <Link 
                          href={link.href} 
                          className="text-sm text-gray-400 hover:text-accent-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent-400/50 focus:ring-offset-2 focus:ring-offset-primary-900 rounded-lg px-1.5 py-0.5 inline-block hover:bg-white/5"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Premium Services */}
                <div>
                  <h5 className="text-xs font-semibold text-accent-400 mb-2">Rozwiązania premium</h5>
                  <ul className="space-y-2">
                    {serviceLinks.slice(3).map((link, index) => (
                      <li key={index}>
                        <Link 
                          href={link.href} 
                          className="text-sm text-gray-400 hover:text-accent-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent-400/50 focus:ring-offset-2 focus:ring-offset-primary-900 rounded-lg px-1.5 py-0.5 inline-block hover:bg-white/5"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Company section */}
            <div>
              <h4 className="text-base font-bold text-white mb-4 font-heading">Firma</h4>
              <ul className="space-y-2">
                {companyLinks.map((link, index) => (
                  <li key={index}>
                    <Link 
                      href={link.href} 
                      className="text-sm text-gray-400 hover:text-accent-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent-400/50 focus:ring-offset-2 focus:ring-offset-primary-900 rounded-lg px-1.5 py-0.5 inline-block hover:bg-white/5"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        
        {/* Contact section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="flex items-center group">
            <i className="fas fa-map-marker-alt mr-2 text-accent-400 group-hover:text-accent-500 transition-colors"></i>
            <span className="text-sm group-hover:text-white transition-colors">ul. Przykładowa 123, 00-001 Warszawa</span>
          </div>
          <div className="flex items-center group">
            <i className="fas fa-phone mr-2 text-accent-400 group-hover:text-accent-500 transition-colors"></i>
            <span className="text-sm group-hover:text-white transition-colors">+48 123 456 789</span>
          </div>
          <div className="flex items-center group">
            <i className="fas fa-envelope mr-2 text-accent-400 group-hover:text-accent-500 transition-colors"></i>
            <span className="text-sm group-hover:text-white transition-colors">kontakt@siteforge.pl</span>
          </div>
          <div className="flex items-center group">
            <i className="fas fa-clock mr-2 text-accent-400 group-hover:text-accent-500 transition-colors"></i>
            <span className="text-sm group-hover:text-white transition-colors">Pon-Pt: 9:00-17:00</span>
          </div>
        </div>
        
        {/* Bottom section with copyright and legal links */}
        <div className="border-t border-white/10 pt-4 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">&copy; {new Date().getFullYear()} SiteForge.pl. Wszelkie prawa zastrzeżone.</p>
          <div className="mt-2 md:mt-0 flex space-x-4">
            <Link href="/polityka-prywatnosci" className="text-sm text-gray-400 hover:text-accent-400 transition-colors">
              Polityka prywatności
            </Link>
            <Link href="/regulamin" className="text-sm text-gray-400 hover:text-accent-400 transition-colors">
              Regulamin
            </Link>
            <Link href="/cookies" className="text-sm text-gray-400 hover:text-accent-400 transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

