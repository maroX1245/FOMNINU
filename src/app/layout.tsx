// Root Layout - FOMNINU Student Guide
// Developer: Mohamed Magdy - 5th Year Medical Student at FOMNINU
// New Ismailia National University

import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'نظامك في كبسولة - كلية الطب البشري - جامعة الإسماعيلية الوطنية الجديدة | FOMNINU 2026-2031',
  description: 'الدليل الرسمي للطالب في كلية الطب البشري بجامعة الإسماعيلية الوطنية الجديدة FOMNINU - دليل شامل للبرامج التعليمية والاستراتيجيات والتقييمات',
  keywords: ['FOMNINU', 'جامعة الإسماعيلية الوطنية الجديدة', 'كلية الطب', 'دليل الطالب', 'طب بشري', 'New Ismailia National University'],
  authors: [{ name: 'Mohamed Magdy' }],
  openGraph: {
    title: 'نظامك في كبسولة - كلية الطب البشري - FOMNINU',
    description: 'الدليل الرسمي للطالب 2026-2031',
    locale: 'ar_EG',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-arabic antialiased">
        {children}
      </body>
    </html>
  );
}
