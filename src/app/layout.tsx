import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import './globals.css';
import NavbarWrapper from '@/components/layout/NavbarWrapper';
import Footer from '@/components/layout/Footer';
import BackToTop from '@/components/layout/BackToTop';

const inter = Inter({ 
  subsets: ['latin', 'latin-ext'],
  variable: '--font-inter',
  display: 'swap',
});

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin', 'latin-ext'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'SiteForge.pl | Profesjonalne strony i aplikacje internetowe',
  description: 'Tworzymy nowoczesne strony internetowe i aplikacje webowe, które zwiększają sprzedaż i budują wizerunek Twojej firmy.',
  keywords: ['strony internetowe', 'aplikacje webowe', 'web development', 'agencja interaktywna'],
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html 
      lang="pl" 
      className={`scroll-smooth ${inter.variable} ${poppins.variable}`}
    >
      <head>
        <link rel="icon" href="/favicon.ico" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              "name": "SiteForge.pl",
              "image": "https://siteforge.pl/images/logo.png",
              "url": "https://siteforge.pl",
              "telephone": "+48123456789",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Warszawa",
                "addressRegion": "Mazowieckie",
                "postalCode": "00-001",
                "addressCountry": "PL"
              },
              "priceRange": "$",
              "description": "Tworzymy nowoczesne strony internetowe i aplikacje webowe dla firm."
            })
          }}
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-gray-50">
        <NavbarWrapper />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <BackToTop />
      </body>
    </html>
  );
}