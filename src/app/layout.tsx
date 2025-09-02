import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import { SpeedInsights } from "@vercel/speed-insights/next";
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
  title: 'ServiceFlow Agency | Agencja kreatywno-technologiczna: strony, aplikacje, automatyzacje',
  description: 'Łączymy kreatywność i technologię. Tworzymy nowoczesne strony internetowe, aplikacje webowe i automatyzacje dla firm, które chcą się wyróżnić i rozwijać.',
  keywords: ['strony internetowe', 'aplikacje webowe', 'automatyzacja', 'agencja kreatywna', 'agencja technologiczna', 'AI dla firm', 'video marketing'],
  metadataBase: new URL('https://serviceflow.agency'),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://serviceflow.agency',
  },
  openGraph: {
    type: 'website',
    locale: 'pl_PL',
    url: 'https://serviceflow.agency',
    siteName: 'ServiceFlow Agency',
    title: 'ServiceFlow Agency | Agencja kreatywno-technologiczna',
    description: 'Łączymy kreatywność i technologię. Tworzymy nowoczesne strony internetowe, aplikacje webowe i automatyzacje dla firm.',
    images: [
      {
        url: 'https://serviceflow.agency/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'ServiceFlow Agency',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ServiceFlow Agency | Agencja kreatywno-technologiczna',
    description: 'Łączymy kreatywność i technologię. Tworzymy nowoczesne strony internetowe, aplikacje webowe i automatyzacje dla firm.',
    images: ['https://serviceflow.agency/images/og-image.jpg'],
  },
  verification: {
    google: 'your-google-site-verification',
  },
  other: {
    'meta-description': 'Łączymy kreatywność i technologię. Tworzymy nowoczesne strony internetowe, aplikacje webowe i automatyzacje dla firm, które chcą się wyróżnić i rozwijać.',
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
        {/* Meta tags */}
        <meta name="description" content="Łączymy kreatywność i technologię. Tworzymy nowoczesne strony internetowe, aplikacje webowe i automatyzacje dla firm, które chcą się wyróżnić i rozwijać." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Favicon */}
        <link rel="icon" type="image/png" sizes="128x128" href="/images/favicon/favicon-128x128.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/images/favicon/favicon-96x96.png" />
        <link rel="icon" type="image/png" sizes="64x64" href="/images/favicon/favicon-64x64.png" />
        <link rel="icon" type="image/png" sizes="48x48" href="/images/favicon/favicon-48x48.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/images/favicon/apple-touch-icon.png" />
        <link rel="manifest" href="/images/favicon/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />

        {/* Schema.org markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              "name": "ServiceFlow Agency",
              "image": "https://www.serviceflow.agency/images/logo.png",
              "url": "https://www.serviceflow.agency",
              "telephone": "+48731098854",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Zalipie",
                "addressRegion": "Małopolskie",
                "postalCode": "33-263",
                "addressCountry": "PL"
              },
              "priceRange": "$",
              "description": "Łączymy kreatywność i technologię. Tworzymy nowoczesne strony internetowe, aplikacje webowe i automatyzacje dla firm, które chcą się wyróżnić i rozwijać."
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
        <SpeedInsights />
      </body>
    </html>
  );
}