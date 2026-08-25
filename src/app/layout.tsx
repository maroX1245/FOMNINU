// Root Layout
// Developer: Mohamed Magdy - 5th Year Medical Student at FOMSCU

import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'دليل الطالب - كلية الطب البشري - جامعة قناة السويس | FOMSCU 2023-2024',
  description: 'الدليل الرسمي للطالب في كلية الطب البشري بجامعة قناة السويس - دليل شامل للبرامج التعليمية والاستراتيجيات والتقييمات',
  keywords: ['FOMSCU', 'جامعة قناة السويس', 'كلية الطب', 'دليل الطالب', 'طب بشري'],
  authors: [{ name: 'Mohamed Magdy' }],
  openGraph: {
    title: 'دليل الطالب - كلية الطب البشري - جامعة قناة السويس',
    description: 'الدليل الرسمي للطالب 2023-2024',
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
