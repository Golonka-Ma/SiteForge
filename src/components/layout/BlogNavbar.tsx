'use client';

import React, { useState, useEffect } from 'react';
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
  // Special case for logo item
  if (item.id === 'logo') {
    return (
      <Link href={item.href} passHref>
        <div className="flex items-center px-3 py-1.5">
          {item.icon}
        </div>
      </Link>
    );
  }
  
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
    // Special case for "Strona główna" which needs more space
    if (isMobile && isActive && isExpanded && item.id === 'home') return 130;
    if (!isMobile && isActive && isExpanded && item.id === 'home') return 140;
    
    if (isMobile && isActive && isExpanded) return 100; // Increased width for mobile when expanded
    if (isActive && isExpanded) return 120; // Fixed width when expanded
    return isMobile ? 36 : 44; // Default inactive width
  };
  
  const handleClick = (e: React.MouseEvent) => {
    if (item.id === 'back') {
      e.preventDefault();
      window.history.back();
    }
    
    if (onClick) {
      onClick();
    }
  };
  
  return (
    <Link href={item.href} passHref>
      <motion.div
        onClick={handleClick}
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
              className={`text-xs font-medium text-gray-800 whitespace-nowrap overflow-hidden ${
                isMobile 
                  ? item.id === 'home' 
                    ? 'max-w-[110px] text-[10px]' 
                    : 'max-w-[80px] text-[10px]'
                  : 'max-w-[120px]'
              }`}
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

const BackIcon = () => (
  <div className="flex items-center">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full">
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
    </svg>
  </div>
);

export default function BlogNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeItem, setActiveItem] = useState<string>('home');

  const scrollThreshold = 50;
  const mobileBreakpoint = 768;

  const pillNavItems = [
    { id: 'back', label: 'Wstecz', icon: <BackIcon />, href: '#' },
    { 
      id: 'logo', 
      label: '', 
      icon: (
        <div className="flex items-center justify-center">
          <span className="text-sm font-semibold text-gray-600">Service</span>
          <span className="text-sm font-semibold text-accent-600">Flow</span>
          <span className="text-gray-400/90 text-[8px] font-medium">.agency</span>
        </div>
      ), 
      href: '/' 
    },
    { id: 'home', label: 'Strona główna', icon: <HomeIcon />, href: '/' },
  ];

  useEffect(() => {
    setIsMounted(true);
    
    const handleResize = () => {
      setIsMobile(window.innerWidth < mobileBreakpoint);
    };
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > scrollThreshold);
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
  }, []);

  // Podstawowy widok podczas ładowania
  if (!isMounted) {
    return null;
  }

  const commonFloatingTransition = { type: 'spring', stiffness: 200, damping: 30, mass: 0.9 }; 
  const floatingElementEntryDelay = 0.3; 

  return (
    <>
      {/* Floating Logo and Pill Menu - zawsze widoczne na desktopie */}
      <div className="fixed top-0 left-0 right-0 z-50 px-4 py-4 flex justify-between items-center pointer-events-none">
        <AnimatePresence mode="wait">
          {!isMobile && (
            <motion.div
              key="floating-logo"
              className="pointer-events-auto"
              initial={{ opacity: 0, x: -80, scale: 0.6 }}
              animate={{ opacity: 1, x: 0, scale: 1, transition: { ...commonFloatingTransition, delay: floatingElementEntryDelay } }}
              exit={{ opacity: 0, x: -80, scale: 0.6, transition: { duration: 0.2, ease: "easeOut" } }}
            >
              <div className="navbar-logo-container">
                <Link href="/" className="flex items-center bg-white rounded-full px-3 py-1.5 md:px-4 md:py-2 z-20 relative">
                  <span className="text-lg font-semibold text-gray-600">Service</span>
                  <span className="text-lg font-semibold text-accent-400">Flow</span>
                  <span className="text-gray-400/90 text-xs font-medium">.agency</span>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <AnimatePresence mode="wait">
          {!isMobile && (
            <motion.div
              key="floating-pill-menu"
              className="pointer-events-auto"
              initial={{ opacity: 0, x: 80, scale: 0.6 }}
              animate={{ opacity: 1, x: 0, scale: 1, transition: { ...commonFloatingTransition, delay: floatingElementEntryDelay } }}
              exit={{ opacity: 0, x: 80, scale: 0.6, transition: { duration: 0.2, ease: "easeOut" } }}
            >
              <div className="navbar-pill-container desktop-pill-menu">
                <div className="flex items-center bg-white/95 backdrop-blur-md rounded-full p-1.5 space-x-1 relative z-10">
                  {/* Use only back and home buttons for desktop */}
                  <PillNavItem 
                    item={pillNavItems[0]} 
                    isActive={activeItem === pillNavItems[0].id} 
                    onClick={() => {
                      setActiveItem(pillNavItems[0].id);
                    }} 
                  />
                  <div className="h-5 w-px bg-gray-200" />
                  <PillNavItem 
                    item={pillNavItems[2]} 
                    isActive={activeItem === pillNavItems[2].id} 
                    onClick={() => {
                      setActiveItem(pillNavItems[2].id);
                    }} 
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Mobile Pill Menu - zawsze widoczne dla ekranów mobilnych, wycentrowane */}
      <AnimatePresence mode="wait">
        {isMobile && (
          <motion.div
            key="mobile-pill-menu"
            className="fixed top-3 left-0 right-0 z-50 flex justify-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0, transition: { ...commonFloatingTransition, delay: 0.1 } }}
            exit={{ opacity: 0, y: -20, transition: { duration: 0.2, ease: "easeOut" } }}
          >
            <div className="navbar-pill-container mobile-pill-menu">
              <div className="flex items-center bg-white/95 backdrop-blur-md rounded-full p-1 space-x-0.5 relative z-10 overflow-x-auto no-scrollbar">
                {pillNavItems.map((navItem, index) => (
                  <React.Fragment key={navItem.id}>
                    <PillNavItem 
                      item={navItem} 
                      isActive={activeItem === navItem.id}
                      isMobile={true}
                      onClick={() => {
                        setActiveItem(navItem.id);
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