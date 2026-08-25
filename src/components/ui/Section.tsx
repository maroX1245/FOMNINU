'use client';

// Section Wrapper Component
// Developer: Mohamed Magdy - 5th Year Medical Student at FOMNINU

import { motion } from 'framer-motion';

interface SectionProps {
  id: string;
  children: React.ReactNode;
  className?: string;
  fullHeight?: boolean;
}

export default function Section({ id, children, className = '', fullHeight = false }: SectionProps) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6 }}
      className={`relative py-20 md:py-32 ${fullHeight ? 'min-h-screen' : ''} ${className}`}
    >
      <div className="container mx-auto px-4">
        {children}
      </div>
    </motion.section>
  );
}
