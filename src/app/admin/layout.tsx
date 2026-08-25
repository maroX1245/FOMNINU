// Admin Root Layout with Session Provider
// Developer: Mohamed Magdy - 5th Year Medical Student at FOMSCU

import './globals.css';
import Providers from './providers';

export const metadata = {
  title: 'لوحة التحكم - FOMSCU Student Guide Admin',
  description: 'Admin Dashboard for FOMSCU Student Guide',
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
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
