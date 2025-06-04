'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// SVG Icons
const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
  </svg>
);

const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 6.75z" />
  </svg>
);

const LocationIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
  </svg>
);

const FacebookIcon = () => <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/></svg>;
const LinkedinIcon = () => <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.97v16h4.97v-7.934c0-2.022.984-3.493 2.865-3.493 2.248 0 2.455 1.857 2.455 3.615v7.812h4.97v-9.043c0-4.188-1.622-6.467-5.445-6.467-3.262 0-4.342 1.989-4.342 1.989v-1.479h-4.51v16h4.51z"/></svg>;
const InstagramIcon = () => <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.059 1.689.073 4.948.073 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948s-.014-3.667-.072-4.947c-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.948-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>;

interface FormData {
  name: string;
  email: string;
  phone: string;
  service_type: string;
  message: string;
  terms: boolean;
}

interface FormStatus {
  submitting: boolean;
  success: boolean;
  error: string | null;
}

const contactDetails = [
  {
    icon: <MailIcon />,
    title: "Email",
    value: "kontakt@serviceflow.agency",
    href: "mailto:kontakt@serviceflow.agency"
  },
  {
    icon: <PhoneIcon />,
    title: "Telefon",
    value: "+48 731 098 854",
    href: "tel:+48731098854"
  },
  {
    icon: <LocationIcon />,
    title: "Lokalizacja",
    value: "Zdalnie z Polski — na cały świat",
    href: "#"
  }
];

const socialLinks = [
  { name: "Facebook", icon: <FacebookIcon />, href: "#" },
  { name: "LinkedIn", icon: <LinkedinIcon />, href: "#" },
  { name: "Instagram", icon: <InstagramIcon />, href: "#" },
];

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: '', email: '', phone: '', service_type: '', message: '', terms: false
  });
  
  const [status, setStatus] = useState<FormStatus>({
    submitting: false, success: false, error: null
  });
  
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: "-100px 0px"
  });

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, duration: 0.5 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };
  
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };
  
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status.submitting) return;
    
    setStatus({ submitting: true, success: false, error: null });
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Coś poszło nie tak. Spróbuj ponownie.');
      }
      
      setStatus({ submitting: false, success: true, error: null });
      setFormData({
        name: '', email: '', phone: '', service_type: '', message: '', terms: false
      });
      
      setTimeout(() => {
        setStatus(prev => ({ ...prev, success: false }));
      }, 5000);

    } catch (error) {
      setStatus({ 
        submitting: false, 
        success: false, 
        error: error instanceof Error ? error.message : 'Wystąpił nieoczekiwany błąd'
      });
    }
  };

  return (
    <section id="kontakt" className="py-24 sm:py-32 bg-gray-100 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-80 -right-80 w-[50rem] h-[50rem] bg-gradient-to-br from-accent-500/10 to-secondary-500/5 rounded-full filter blur-3xl opacity-50 animate-pulse"></div>
        <div className="absolute -bottom-80 -left-80 w-[50rem] h-[50rem] bg-gradient-to-tr from-primary-500/10 to-accent-500/5 rounded-full filter blur-3xl opacity-50 animate-pulse animation-delay-2000"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          ref={ref}
          variants={sectionVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.div
            variants={itemVariants}
            className="text-center mb-16 md:mb-20"
          >
            <span className="inline-block px-4 py-1.5 rounded-lg bg-accent-100 text-accent-700 text-sm font-semibold mb-4 tracking-wider">
              ZACZNIJMY WSPÓŁPRACĘ
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-heading">
              Gotowy na <span className="text-accent-600">Twój Nowy Projekt</span>?
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Opowiedz nam o swoich pomysłach i potrzebach. Wspólnie znajdziemy rozwiązania, które przeniosą Twój biznes na wyższy poziom.
            </p>
          </motion.div>
          
          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch bg-white rounded-3xl p-8 sm:p-10 lg:p-16 shadow-xl border border-gray-200/80"
          >
            <div className="lg:col-span-5 flex flex-col">
              <h3 className="text-3xl font-bold text-gray-900 mb-3 font-heading">Napisz do nas</h3>
              <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                Wypełnij formularz lub skorzystaj z poniższych danych. Odpowiemy w ciągu 24h.
              </p>
              
              <div className="space-y-6 mb-10">
                {contactDetails.map((detail, index) => (
                  <motion.a 
                    key={index}
                    href={detail.href}
                    className="flex items-start group"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-accent-500 text-white flex items-center justify-center mr-4 transition-all duration-300 group-hover:bg-accent-600 group-hover:shadow-lg">
                      {detail.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 text-lg transition-colors duration-300 group-hover:text-accent-600">{detail.title}</h4>
                      <p className="text-gray-600">{detail.value}</p>
                    </div>
                  </motion.a>
                ))}
              </div>
              
              <div className="mt-auto pt-8 border-t border-gray-200">
                <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Znajdziesz nas na:</h4>
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => (
                    <motion.a 
                      key={index} 
                      href={social.href} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-xl bg-gray-100 text-gray-500 flex items-center justify-center transition-all duration-300 hover:bg-accent-500 hover:text-white hover:shadow-md transform hover:scale-110"
                      title={social.name}
                      aria-label={social.name}
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-6">
              {status.success && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-green-50 border-l-4 border-green-400 text-green-700 px-4 py-3 rounded-md shadow-sm"
                >
                  <span className="block sm:inline">Dziękujemy! Wiadomość została wysłana. Skontaktujemy się wkrótce.</span>
                </motion.div>
              )}
              
              {status.error && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-50 border-l-4 border-red-400 text-red-700 px-4 py-3 rounded-md shadow-sm"
                >
                  <span className="block sm:inline">{status.error}</span>
                </motion.div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div variants={itemVariants}>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">Imię i nazwisko</label>
                  <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required
                    className="w-full px-4 py-3.5 rounded-xl border border-gray-300 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/50 transition-all duration-200 bg-white shadow-sm placeholder-gray-400 text-gray-900"
                  />
                </motion.div>
                <motion.div variants={itemVariants}>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                  <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required
                    className="w-full px-4 py-3.5 rounded-xl border border-gray-300 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/50 transition-all duration-200 bg-white shadow-sm placeholder-gray-400 text-gray-900"
                  />
                </motion.div>
              </div>
              
              <motion.div variants={itemVariants}>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1.5">Telefon (opcjonalnie)</label>
                <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange}
                  className="w-full px-4 py-3.5 rounded-xl border border-gray-300 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/50 transition-all duration-200 bg-white shadow-sm placeholder-gray-400 text-gray-900"
                />
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <label htmlFor="service_type" className="block text-sm font-medium text-gray-700 mb-1.5">Jaki jest główny cel Twojego projektu?</label>
                <select id="service_type" name="service_type" value={formData.service_type} onChange={handleChange} required
                  className="w-full px-4 py-3.5 rounded-xl border border-gray-300 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/50 transition-all duration-200 bg-white shadow-sm appearance-none text-gray-900"
                >
                  <option value="">Wybierz z listy...</option>
                  <optgroup label="Fundamenty Cyfrowe">
                    <option value="website">Profesjonalne Strony Internetowe</option>
                    <option value="digital-start">Kompleksowy Start w Online</option>
                    <option value="landing-pages">Strony Konwertujące (Landing Pages)</option>
                  </optgroup>
                  <optgroup label="Wzrost i Zaangażowanie">
                    <option value="social-media">Marketing w Social Media</option>
                    <option value="ads">Kampanie Reklamowe (Google & Social Ads)</option>
                    <option value="creative">Produkcja Kreatywna (Wideo i Animacje)</option>
                  </optgroup>
                  <optgroup label="Innowacje i Automatyzacja">
                    <option value="automation">Automatyzacja Procesów Biznesowych</option>
                    <option value="ai-apps">Dedykowane Aplikacje Webowe z AI</option>
                    <option value="medical-ai">System AI dla Branży Medycznej</option>
                  </optgroup>
                  <option value="other">Inne (opisz poniżej)</option>
                </select>
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1.5">Opisz swoje potrzeby (im więcej szczegółów, tym lepiej)</label>
                <textarea id="message" name="message" value={formData.message} onChange={handleChange} required rows={5}
                  className="w-full px-4 py-3.5 rounded-xl border border-gray-300 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/50 transition-all duration-200 bg-white shadow-sm placeholder-gray-400 text-gray-900"
                  placeholder="Opowiedz nam o swoim projekcie, celach, oczekiwaniach..."
                ></textarea>
              </motion.div>
              
              <motion.div variants={itemVariants} className="flex items-start">
                <input type="checkbox" id="terms" name="terms" checked={formData.terms} onChange={handleChange} required
                  className="h-5 w-5 mt-0.5 rounded border-gray-300 text-accent-600 focus:ring-accent-500 shadow-sm"
                />
                <label htmlFor="terms" className="ml-3 text-sm text-gray-600">
                  Wyrażam zgodę na przetwarzanie moich danych osobowych zgodnie z <a href="/polityka-prywatnosci" target="_blank" rel="noopener noreferrer" className="text-accent-600 hover:text-accent-700 underline">Polityką Prywatności</a> w celu odpowiedzi na moje zapytanie.
                </label>
              </motion.div>
              
              <motion.button 
                variants={itemVariants}
                type="submit" 
                disabled={status.submitting || !formData.terms}
                className="w-full bg-gradient-to-r from-accent-500 to-accent-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-accent-600 hover:to-accent-700 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2 focus:ring-offset-white transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed transform hover:scale-[1.02] hover:shadow-xl active:scale-[0.98]"
              >
                {status.submitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Wysyłanie...
                  </span>
                ) : 'Wyślij zapytanie i zacznijmy działać!'}
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}