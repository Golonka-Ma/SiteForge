'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

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

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    service_type: '',
    message: '',
    terms: false
  });
  
  const [status, setStatus] = useState<FormStatus>({
    submitting: false,
    success: false,
    error: null
  });
  
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
        name: '',
        email: '',
        phone: '',
        service_type: '',
        message: '',
        terms: false
      });
      
      // Auto-reset success message after 5 seconds
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
    <section id="kontakt" className="py-20 bg-gray-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-500/5 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary-500/5 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-accent-500/5 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-4000"></div>
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50/0 via-gray-50/90 to-gray-50"></div>

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
            Rozpocznij współpracę już dziś
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Skontaktuj się z nami, aby omówić szczegóły Twojego projektu i otrzymać bezpłatną wycenę.
          </p>
        </motion.div>
        
        {/* Contact Form */}
        <motion.div 
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start bg-white rounded-2xl p-8 lg:p-12 shadow-soft"
        >
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4 font-heading">Skontaktuj się z nami</h3>
            <p className="text-gray-600 mb-8">Wypełnij formularz, a nasz konsultant skontaktuje się z Tobą w ciągu 24 godzin, aby omówić szczegóły Twojego projektu.</p>
            
            <div className="space-y-6 mb-8">
              <div className="flex items-start">
                <div className="w-12 h-12 rounded-xl bg-accent-500/10 flex items-center justify-center mr-4 mt-1">
                  <i className="fas fa-envelope text-accent-500"></i>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Email</h4>
                  <p className="text-gray-600">kontakt@serviceflow.agency</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-12 h-12 rounded-xl bg-accent-500/10 flex items-center justify-center mr-4 mt-1">
                  <i className="fas fa-phone text-accent-500"></i>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Telefon</h4>
                  <p className="text-gray-600">+48 731 098 854</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-12 h-12 rounded-xl bg-accent-500/10 flex items-center justify-center mr-4 mt-1">
                  <i className="fas fa-map-marker-alt text-accent-500"></i>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Lokalizacja</h4>
                  <p className="text-gray-600">Zdalnie z Polski — na cały świat</p>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-4">
              <a href="#" className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-accent-500 hover:text-white transition-all duration-300 transform hover:-translate-y-1">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-accent-500 hover:text-white transition-all duration-300 transform hover:-translate-y-1">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-accent-500 hover:text-white transition-all duration-300 transform hover:-translate-y-1">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-accent-500 hover:text-white transition-all duration-300 transform hover:-translate-y-1">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {status.success && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl">
                <span className="block sm:inline">Dziękujemy! Wiadomość została wysłana. Skontaktujemy się wkrótce.</span>
              </div>
            )}
            
            {status.error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
                <span className="block sm:inline">{status.error}</span>
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Imię i nazwisko</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-accent-500 focus:ring focus:ring-accent-500 focus:ring-opacity-50 transition-colors bg-gray-50"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-accent-500 focus:ring focus:ring-accent-500 focus:ring-opacity-50 transition-colors bg-gray-50"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Telefon</label>
              <input 
                type="tel" 
                id="phone" 
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-accent-500 focus:ring focus:ring-accent-500 focus:ring-opacity-50 transition-colors bg-gray-50"
              />
            </div>
            
            <div>
              <label htmlFor="service_type" className="block text-sm font-medium text-gray-700 mb-1">Jaki jest główny cel Twojego projektu?</label>
              <select 
                id="service_type" 
                name="service_type"
                value={formData.service_type}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-accent-500 focus:ring focus:ring-accent-500 focus:ring-opacity-50 transition-colors bg-gray-50"
              >
                <option value="">Wybierz z listy</option>
                <option value="brand">Budowa marki i obecności online</option>
                <option value="leads">Generowanie leadów i sprzedaż</option>
                <option value="automation">Automatyzacja procesów biznesowych</option>
                <option value="ecommerce">Sklep internetowy</option>
                <option value="ai">Rozwiązania oparte o AI</option>
                <option value="other">Inne</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Opisz swoje potrzeby i cele biznesowe</label>
              <textarea 
                id="message" 
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-accent-500 focus:ring focus:ring-accent-500 focus:ring-opacity-50 transition-colors bg-gray-50"
                placeholder="Opisz, jak możemy pomóc Twojemu biznesowi..."
              ></textarea>
            </div>
            
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="terms" 
                name="terms"
                checked={formData.terms}
                onChange={handleChange}
                required
                className="rounded-xl border-gray-200 text-accent-500 focus:border-accent-500 focus:ring focus:ring-accent-500 focus:ring-opacity-50"
              />
              <label htmlFor="terms" className="ml-2 text-sm text-gray-600">Wyrażam zgodę na przetwarzanie moich danych osobowych w celu odpowiedzi na moje zapytanie.</label>
            </div>
            
            <button 
              type="submit" 
              disabled={status.submitting}
              className="w-full bg-gradient-to-r from-accent-500 to-accent-600 text-white px-6 py-4 rounded-xl font-medium hover:shadow-lg transition-all disabled:opacity-70 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2"
            >
              {status.submitting ? 'Wysyłanie...' : 'Wyślij wiadomość'}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}