'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import { useEffect, useState } from 'react';

export default function NavbarWrapper() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // During SSR and initial mount, don't render anything to avoid hydration mismatch
  if (!mounted) {
    return null;
  }
  
  // Check if we're on a blog route
  const isBlogRoute = pathname?.startsWith('/blog');
  
  // Don't render the navbar on blog routes
  if (isBlogRoute) {
    return null;
  }
  
  return <Navbar />;
} 