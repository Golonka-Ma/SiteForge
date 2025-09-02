'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Footer() {
  // Linki do sekcji
  const serviceLinks = [
    // Fundamenty Cyfrowe
    { label: 'Profesjonalne Strony Internetowe', href: '#oferta' },
    { label: 'Kompleksowy Start w Online', href: '#oferta' },
    { label: 'Strony Konwertujące (Landing Pages)', href: '#oferta' },
    // Wzrost i Zaangażowanie
    { label: 'Marketing w Social Media', href: '#oferta' },
    { label: 'Kampanie Reklamowe (Google & Social Ads)', href: '#oferta' },
    { label: 'Produkcja Kreatywna (Wideo i Animacje)', href: '#oferta' },
    // Innowacje i Automatyzacja
    { label: 'Automatyzacja Procesów Biznesowych', href: '#oferta' },
    { label: 'Dedykowane Aplikacje Webowe z AI', href: '#oferta' },
    { label: 'System AI dla Branży Medycznej', href: '#oferta' },
  ];
  
  const companyLinks = [
    { label: 'O nas', href: '/o-nas' },
    { label: 'Realizacje', href: '#realizacje' },
    { label: 'Blog', href: '#blog' },
    { label: 'Kariera', href: '/kariera' },
    { label: 'Kontakt', href: '#kontakt' }
  ];
  
  const socialLinks = [
    { icon: 'facebook-f', href: 'https://facebook.com/serviceflow' },
    { icon: 'twitter', href: 'https://twitter.com/serviceflow' },
    { icon: 'instagram', href: 'https://instagram.com/serviceflow.agency' },
    { icon: 'linkedin-in', href: 'https://linkedin.com/company/serviceflow-agency' }
  ];

  return (
    <footer className="bg-primary-900/95 backdrop-blur-xl text-gray-300 pt-12 pb-6 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary-900/50 to-primary-900/95"></div>
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-1"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 mb-8">
          {/* About section - Full width on mobile, 4 columns on desktop */}
          <div className="lg:col-span-4">
            <Link href="/" className="flex items-center mb-4 group">
              <span className="text-xl font-bold font-heading transition-all duration-300 group-hover:scale-105">
                <span className="text-white">Service</span>
                <span className="text-accent-400">Flow</span>
                <span className="text-white/80 text-sm">.agency</span>
              </span>
            </Link>
            <p className="mb-6 text-sm text-gray-400">Tworzymy kompleksowe rozwiązania cyfrowe - od nowoczesnych stron i aplikacji, przez strategię marketingową, aż po automatyzację procesów - które realnie rozwijają Twój biznes i zwiększają jego wartość.</p>
            <div className="flex space-x-3 mb-6 md:mb-0">
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
          
          {/* Services section - Full width on mobile, 4 columns on desktop */}
          <div className="lg:col-span-4">
            <h4 className="text-base font-bold text-white mb-4 font-heading">Usługi</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Fundamenty Cyfrowe */}
              <div>
                <h5 className="text-xs font-semibold text-primary-400 mb-3">Fundamenty Cyfrowe</h5>
                <ul className="space-y-2">
                  {serviceLinks.slice(0, 3).map((link, index) => (
                    <li key={index}>
                      <Link 
                        href={link.href} 
                        className="text-sm text-gray-400 hover:text-primary-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-400/50 focus:ring-offset-2 focus:ring-offset-primary-900 rounded-lg px-1.5 py-0.5 inline-block hover:bg-white/5"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Wzrost i Zaangażowanie */}
              <div>
                <h5 className="text-xs font-semibold text-secondary-400 mb-3">Wzrost i Zaangażowanie</h5>
                <ul className="space-y-2">
                  {serviceLinks.slice(3, 6).map((link, index) => (
                    <li key={index}>
                      <Link 
                        href={link.href} 
                        className="text-sm text-gray-400 hover:text-secondary-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-secondary-400/50 focus:ring-offset-2 focus:ring-offset-primary-900 rounded-lg px-1.5 py-0.5 inline-block hover:bg-white/5"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Innowacje i Automatyzacja */}
              <div className="sm:col-span-2">
                <h5 className="text-xs font-semibold text-accent-400 mb-3">Innowacje i Automatyzacja</h5>
                <ul className="space-y-2">
                  {serviceLinks.slice(6).map((link, index) => (
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
          
          {/* Company section - Full width on mobile, 4 columns on desktop */}
          <div className="lg:col-span-4">
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
        
        {/* Contact section - Improved mobile layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="flex items-center group p-3 rounded-lg hover:bg-white/5 transition-colors">
            <i className="fas fa-map-marker-alt mr-3 text-accent-400 group-hover:text-accent-500 transition-colors"></i>
            <span className="text-sm group-hover:text-white transition-colors">Zdalnie z Polski — na cały świat</span>
          </div>
          <div className="flex items-center group p-3 rounded-lg hover:bg-white/5 transition-colors">
            <i className="fas fa-phone mr-3 text-accent-400 group-hover:text-accent-500 transition-colors"></i>
            <span className="text-sm group-hover:text-white transition-colors">+48 731 098 854</span>
          </div>
          <div className="flex items-center group p-3 rounded-lg hover:bg-white/5 transition-colors">
            <i className="fas fa-envelope mr-3 text-accent-400 group-hover:text-accent-500 transition-colors"></i>
            <span className="text-sm group-hover:text-white transition-colors">contact@serviceflow.agency</span>
          </div>
          <div className="flex items-center group p-3 rounded-lg hover:bg-white/5 transition-colors">
            <i className="fas fa-clock mr-3 text-accent-400 group-hover:text-accent-500 transition-colors"></i>
            <span className="text-sm group-hover:text-white transition-colors">Pon-Pt: 9:00-17:00</span>
          </div>
        </div>
        
        {/* Bottom section with copyright and legal links - Improved mobile layout */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-gray-400 text-center md:text-left">&copy; {new Date().getFullYear()} ServiceFlow Agency. Wszelkie prawa zastrzeżone.</p>
          <div className="flex flex-wrap justify-center md:justify-end gap-4">
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

