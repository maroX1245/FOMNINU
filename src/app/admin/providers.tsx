'use client';

// Session Provider
// Developer: Mohamed Magdy - 5th Year Medical Student at FOMNINU

import { SessionProvider } from 'next-auth/react';

export default function Providers({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}
