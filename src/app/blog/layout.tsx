import React from 'react';
import BlogNavbar from '@/components/layout/BlogNavbar';
import './blog.css';

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BlogNavbar />
      {children}
    </>
  );
}
