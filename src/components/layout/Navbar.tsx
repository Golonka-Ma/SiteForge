'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

interface PillNavItemProps {
  item: {
    id: string;
    label: string;
    icon: JSX.Element;
    href: string;
  };
  isActive: boolean;
  onClick?: () => void;
  isMobile?: boolean;
}

const PillNavItem: React.FC<PillNavItemProps> = ({ item, isActive, onClick, isMobile = false }) => {
  const [isIconShifted, setIsIconShifted] = useState(isActive);
  const [isExpanded, setIsExpanded] = useState(isActive);
  
  // Use useEffect to create a sequence: first shift the icon and expand, then show the text
  useEffect(() => {
    let shiftTimeoutId: NodeJS.Timeout;
    let textTimeoutId: NodeJS.Timeout;
    
    if (isActive) {
      // First shift the icon to make room
      setIsIconShifted(true);
      
      // Then after a small delay, expand the container
      shiftTimeoutId = setTimeout(() => {
        setIsExpanded(true);
      }, 150);
    } else if (!isActive) {
      // When becoming inactive, first hide the text and collapse
      setIsExpanded(false);
      
      // Then after a delay, shift the icon back
      textTimeoutId = setTimeout(() => {
        setIsIconShifted(false);
      }, 300);
    }
    
    return () => {
      if (shiftTimeoutId) clearTimeout(shiftTimeoutId);
      if (textTimeoutId) clearTimeout(textTimeoutId);
    };
  }, [isActive]);
  
  // Calculate the padding based on active state and mobile status
  const getPadding = () => {
    if (isMobile) {
      return isIconShifted ? { paddingLeft: 10, paddingRight: 12 } : { paddingLeft: 8, paddingRight: 8 };
    }
    
    if (isIconShifted) {
      return { paddingLeft: 12, paddingRight: 14 };
    }
    
    return { paddingLeft: 10, paddingRight: 10 };
  };

  // Fixed width for expanded state
  const getWidth = () => {
    // Special case for "Realizacje" which needs more space on mobile
    if (isMobile && isActive && isExpanded && item.id === 'realizacje') return 100;
    if (isMobile && isActive && isExpanded) return 90; // Smaller width for mobile when expanded
    if (isActive && isExpanded) return 120; // Fixed width when expanded
    return isMobile ? 36 : 44; // Default inactive width
  };
  
  return (
    <Link href={item.href} passHref>
      <motion.div
        onClick={onClick}
        className={`flex items-center justify-center ${isMobile ? 'p-2' : 'p-2.5'} rounded-full cursor-pointer transition-colors duration-200 ease-in-out ${isActive ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
        animate={{ 
          width: getWidth(),
          ...getPadding()
        }}
        transition={{ duration: 0.4, ease: [0.4, 0.0, 0.2, 1] }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div 
          className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'} ${isActive ? 'text-gray-800' : 'text-gray-600'}`}
          animate={{ 
            marginRight: isActive && isIconShifted ? (isMobile ? 6 : 8) : 0
          }}
          transition={{ duration: 0.35, ease: [0.9, 0.0, 0.2, 1] }}
        >
          {item.icon}
        </motion.div>
        <AnimatePresence>
          {isActive && isExpanded && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ 
                duration: 0.25,
                ease: [0.4, 0.0, 0.2, 1],
                delay: 0.1
              }}
              className={`text-xs font-medium text-gray-800 whitespace-nowrap overflow-hidden ${isMobile ? 'max-w-[60px] text-[10px]' : ''}`}
            >
              {item.label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </Link>
  );
};

// --- SVG Icon Components ---
const HomeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
  </svg>
);

const ServicesIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
  </svg>
);

const ProjectsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
  </svg>
);

const BlogIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
  </svg>
);

const FAQIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
  </svg>
);

const ContactIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
  </svg>
);

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isTopBarTransparent, setIsTopBarTransparent] = useState(true);
  const [activePillItem, setActivePillItem] = useState<string | null>('home');
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const prevActiveItemRef = useRef<string | null>(null);

  const scrollThreshold = 180;
  const topBarBgThreshold = 20;
  const mobileBreakpoint = 768;
  const mobileNavThreshold = 100; // Threshold for showing mobile nav

  const mainNavItems = [
    { label: 'Oferta', href: '#oferta' },
    { label: 'Realizacje', href: '#realizacje' },
    { label: 'Blog', href: '#blog' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Kontakt', href: '#kontakt' },
  ];

  const pillNavItems = [
    { id: 'home', label: 'Strona główna', icon: <HomeIcon />, href: '#' },
    { id: 'oferta', label: 'Oferta', icon: <ServicesIcon />, href: '#oferta' },
    { id: 'realizacje', label: 'Realizacje', icon: <ProjectsIcon />, href: '#realizacje' },
    { id: 'blog', label: 'Blog', icon: <BlogIcon />, href: '#blog' },
    { id: 'faq', label: 'FAQ', icon: <FAQIcon />, href: '#faq' },
    { id: 'kontakt', label: 'Kontakt', icon: <ContactIcon />, href: '#kontakt' },
  ];

  // Function to determine active section based on scroll position
  const determineActiveSection = () => {
    // If at the top of the page, we're in the home section
    if (window.scrollY < 100) {
      return 'home';
    }
    
    // Get all section elements with their IDs
    const sections = pillNavItems
      .filter(item => item.id !== 'home') // Exclude home from this calculation
      .map(item => ({
        id: item.id,
        element: document.getElementById(item.id)
      }))
      .filter(section => section.element);
    
    // Sort sections by their position in the document (top to bottom)
    sections.sort((a, b) => {
      const rectA = a.element!.getBoundingClientRect();
      const rectB = b.element!.getBoundingClientRect();
      return rectA.top - rectB.top;
    });
    
    // Find the first section that is currently visible or just past the top of the viewport
    // with a small buffer to prevent flickering
    const buffer = 100; // pixels
    
    for (const section of sections) {
      const rect = section.element!.getBoundingClientRect();
      // If the top of the section is above the buffer point and
      // the bottom is still in view, this is our active section
      if (rect.top <= buffer && rect.bottom > 0) {
        return section.id;
      }
    }
    
    // If no section is currently visible in the buffer zone,
    // find the section closest to the top of the viewport
    let closestSection = null;
    let closestDistance = Infinity;
    
    for (const section of sections) {
      const rect = section.element!.getBoundingClientRect();
      const distance = Math.abs(rect.top);
      
      if (distance < closestDistance) {
        closestDistance = distance;
        closestSection = section.id;
      }
    }
    
    return closestSection || 'home';
  };

  useEffect(() => {
    setIsMounted(true);
    
    const handleResize = () => {
      setIsMobile(window.innerWidth < mobileBreakpoint);
    };
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > scrollThreshold);
      setIsTopBarTransparent(currentScrollY <= topBarBgThreshold);

      // Skip active section updates during navigation
      if (isNavigating) return;

      // Update active pill based on scroll position with smoother transitions
      const currentSection = determineActiveSection();
      
      if (currentSection && prevActiveItemRef.current !== currentSection) {
        setActivePillItem(currentSection);
        prevActiveItemRef.current = currentSection;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);
    
    // Initial checks
    handleResize();
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [isNavigating]);

  const handleNavClick = (navItem: string) => {
    setIsNavigating(true);
    setActivePillItem(navItem);
    prevActiveItemRef.current = navItem;
    
    const element = document.querySelector(navItem === 'home' ? '#hero' : `#${navItem}`);
    if (element) {
      // Smooth scroll to element
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
      
      // Reset the navigation flag after animation completes
      setTimeout(() => {
        setIsNavigating(false);
      }, 1000); // Adjust timing based on your scroll animation duration
    } else {
      // If element not found, reset the flag immediately
      setIsNavigating(false);
    }
  };

  // Podstawowy widok podczas ładowania
  if (!isMounted) {
    return (
      <div className="fixed top-0 left-0 right-0 z-40 h-20 flex justify-center bg-transparent">
        <div className="container mx-auto px-4 md:px-6 h-full flex items-center justify-between my-2.5 rounded-full">
          <Link href="/" className="flex items-center group pl-4">
            <span className="text-2xl font-semibold text-white">Site</span>
            <span className="text-2xl font-semibold text-accent-400">Forge</span>
            <span className="text-lg font-medium text-gray-400/90">.pl</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-1 pr-1">
            {mainNavItems.map((item) => (
              <Link key={item.href} href={item.href} className="px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white">
                {item.label}
              </Link>
            ))}
            <Link href="#kontakt" className="px-4 py-2 rounded-full text-base font-medium bg-white/10 text-white hover:bg-white/20">
              Kontakt
            </Link>
          </nav>
        </div>
      </div>
    );
  }

  const commonFloatingTransition = { type: 'spring', stiffness: 200, damping: 30, mass: 0.9 }; 
  const expandedBarExitTransition = { duration: 0.45, ease: "easeOut" }; 
  const floatingElementEntryDelay = 0.3; 

  return (
    <>
      {/* Expanded Top Bar - widoczny tylko na górze i na większych ekranach */}
      <AnimatePresence mode="wait">
        {!isScrolled && !isMobile && (
          <motion.div
            key="expanded-top-bar"
            className="fixed top-0 left-0 right-0 z-40 h-20 flex justify-center bg-transparent"
            initial={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40, transition: expandedBarExitTransition }}
          >
            <div className="container mx-auto px-4 md:px-6 h-full flex items-center justify-between my-2.5 rounded-full">
              <Link href="/" className="flex items-center group pl-4">
                <span className="text-2xl font-semibold text-white">Site</span>
                <span className="text-2xl font-semibold text-accent-400">Forge</span>
                <span className="text-lg font-medium text-gray-400/90">.pl</span>
              </Link>
              <nav className="flex items-center space-x-1 pr-1">
                {mainNavItems.map((item) => (
                  <Link 
                    key={item.href} 
                    href={item.href} 
                    className="px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white"
                    onClick={(e) => {
                      e.preventDefault();
                      const sectionId = item.href.replace('#', '');
                      handleNavClick(sectionId);
                    }}
                  >
                    {item.label}
                  </Link>
                ))}
                <Link 
                  href="#kontakt" 
                  className="px-4 py-2 rounded-full text-base font-medium bg-white/10 text-white hover:bg-white/20"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('kontakt');
                  }}
                >
                  Kontakt
                </Link>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
          
      {/* Logo dla widoku mobilnego - zawsze na górze */}
      {/* Usunięte z Navbar - logo będzie statycznym elementem w Hero.tsx */}
          
      {/* Floating Logo - pojawia się po przewinięciu, tylko na większych ekranach */}
      <AnimatePresence mode="wait">
        {isScrolled && !isMobile && (
          <motion.div
            key="floating-logo"
            className="fixed top-4 left-4 z-50 flex items-center floating-logo-wrapper"
            initial={{ opacity: 0, x: -80, scale: 0.6 }}
            animate={{ opacity: 1, x: 0, scale: 1, transition: { ...commonFloatingTransition, delay: floatingElementEntryDelay } }}
            exit={{ opacity: 0, x: -80, scale: 0.6, transition: { duration: 0.2, ease: "easeOut" } }}
          >
            <div className="navbar-logo-container">
              <Link href="/" className="flex items-center bg-white rounded-full px-3 py-1.5 md:px-4 md:py-2 z-20 relative">
                <span className="text-lg font-semibold text-gray-600">Site</span>
                <span className="text-lg font-semibold text-accent-400">Forge</span>
                <span className="text-gray-400/90 text-xs font-medium">.pl</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
        
      {/* Mobile Pill Menu - pojawia się tylko po przewinięciu dla ekranów mobilnych */}
      <AnimatePresence mode="wait">
        {isMobile && window.scrollY > mobileNavThreshold && (
          <motion.div
            key="mobile-pill-menu"
            className="fixed top-3 left-0 right-0 z-50 flex justify-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0, transition: { ...commonFloatingTransition, delay: 0.1 } }}
            exit={{ opacity: 0, y: -20, transition: { duration: 0.2, ease: "easeOut" } }}
          >
            <div className="navbar-pill-container mobile-pill-menu">
              <div className="flex items-center bg-white/95 backdrop-blur-md rounded-full p-1 space-x-0.5 mx-auto relative z-10 overflow-x-auto no-scrollbar max-w-[95vw]">
                {pillNavItems.map((navItem, index) => (
                  <React.Fragment key={navItem.id}>
                    <PillNavItem 
                      item={navItem} 
                      isActive={activePillItem === navItem.id}
                      isMobile={true}
                      onClick={() => {
                        handleNavClick(navItem.id);
                      }} 
                    />
                    {index < pillNavItems.length - 1 && <div className="h-4 w-px bg-gray-200 shrink-0" />}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Floating Pill Menu - pojawia się po przewinięciu, tylko na większych ekranach */}
      <AnimatePresence mode="wait">
        {isScrolled && !isMobile && (
          <motion.div
            key="floating-pill-menu"
            className="fixed top-4 right-4 z-50"
            initial={{ opacity: 0, x: 80, scale: 0.6 }}
            animate={{ opacity: 1, x: 0, scale: 1, transition: { ...commonFloatingTransition, delay: floatingElementEntryDelay } }}
            exit={{ opacity: 0, x: 80, scale: 0.6, transition: { duration: 0.2, ease: "easeOut" } }}
          >
            <div className="navbar-pill-container desktop-pill-menu">
              <div className="flex items-center bg-white/95 backdrop-blur-md rounded-full p-1.5 space-x-1 relative z-10">
                {pillNavItems.map((navItem, index) => (
                  <React.Fragment key={navItem.id}>
                    <PillNavItem 
                      item={navItem} 
                      isActive={activePillItem === navItem.id} 
                      onClick={() => {
                        handleNavClick(navItem.id);
                      }} 
                    />
                    {index < pillNavItems.length - 1 && <div className="h-5 w-px bg-gray-200" />}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        /* Shared glowing border styles for logo and pill menus */
        .navbar-logo-container,
        .navbar-pill-container {
          position: relative;
          border-radius: 9999px;
          box-shadow: 0 10px 25px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          padding: 3px;
        }
        
        /* No scrollbar for mobile menu */
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        
        .no-scrollbar {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
        
        /* Logo keeps the original rotating gradient effect */
        .navbar-logo-container::before,
        .navbar-logo-container::after {
          content: '';
          position: absolute;
          top: -8px;
          left: -8px;
          right: -8px;
          bottom: -8px;
          background: linear-gradient(45deg, #3b82f6, #8b5cf6, #ec4899, #3b82f6);
          border-radius: 9999px;
          z-index: -1;
        }
        
        .navbar-logo-container::before {
          animation: animateNavbarBorder 8s linear infinite;
        }
        
        .navbar-logo-container::after {
          filter: blur(10px);
          opacity: 0.8;
          animation: animateNavbarBorder 8s linear infinite;
          animation-delay: -4s;
        }
        
        /* Navigation menus get the circulating color effect */
        .navbar-pill-container::before {
          content: '';
          position: absolute;
          top: -6px;
          left: -6px;
          right: -6px;
          bottom: -6px;
          z-index: -1;
          border-radius: 9999px;
          background: linear-gradient(90deg, 
            transparent, transparent, transparent, transparent,
            #3b82f6, #8b5cf6, #ec4899, #3b82f6,
            transparent, transparent, transparent, transparent
          );
          background-size: 400% 100%;
          animation: animateNavbarCirculate 8s linear infinite;
        }
        
        .navbar-pill-container::after {
          content: '';
          position: absolute;
          top: -6px;
          left: -6px;
          right: -6px;
          bottom: -6px;
          z-index: -2;
          border-radius: 9999px;
          filter: blur(10px);
          opacity: 0.7;
          background: linear-gradient(90deg, 
            transparent, transparent, transparent, transparent,
            #ec4899, #8b5cf6, #3b82f6, #ec4899,
            transparent, transparent, transparent, transparent
          );
          background-size: 400% 100%;
          animation: animateNavbarCirculate 8s linear infinite;
          animation-delay: -4s;
        }
        
        /* Mobile pill menu adjustments */
        .mobile-pill-menu::before,
        .mobile-pill-menu::after {
          top: -4px;
          left: -4px;
          right: -4px;
          bottom: -4px;
          filter: blur(8px);
          opacity: 0.7;
        }
        
        /* Desktop pill menu adjustments */
        .desktop-pill-menu::before,
        .desktop-pill-menu::after {
          top: -6px;
          left: -6px;
          right: -6px;
          bottom: -6px;
        }
        
        @keyframes animateNavbarBorder {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        
        @keyframes animateNavbarCirculate {
          0% {
            background-position: 0% 0%;
          }
          100% {
            background-position: 100% 0%;
          }
        }
        
        /* Hover effects */
        .floating-logo-wrapper:hover .navbar-logo-container::before,
        .floating-logo-wrapper:hover .navbar-logo-container::after {
          animation-duration: 2s; /* Faster animation on hover */
          filter: blur(8px);
          opacity: 1;
          top: -12px;
          left: -12px;
          right: -12px;
          bottom: -12px;
        }
        
        .desktop-pill-menu:hover::before,
        .desktop-pill-menu:hover::after {
          animation-duration: 4s; /* Faster animation on hover */
          filter: blur(8px);
          opacity: 1;
          background-size: 300% 100%; /* Tighter pattern on hover */
        }
      `}</style>
    </>
  );
}