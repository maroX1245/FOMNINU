'use client';

// Glassmorphism Navigation Component
// Developer: Mohamed Magdy - 5th Year Medical Student at FOMNINU

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavProps {
  scrollToSection: (section: string) => void;
}

export default function Navigation({ scrollToSection }: NavProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'الرئيسية' },
    { id: 'about', label: 'عن الكلية' },
    { id: 'timeline', label: 'النشأة' },
    { id: 'strategy', label: 'الاستراتيجيات' },
    { id: 'program', label: 'البرنامج' },
    { id: 'complaints', label: 'صندوق الشكاوى' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass-nav py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <motion.div 
          className="flex items-center gap-3"
          whileHover={{ scale: 1.05 }}
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-medical-cyan to-medical-blue flex items-center justify-center">
            <span className="text-white font-bold text-lg">F</span>
          </div>
<span className="font-bold text-lg hidden md:block neon-text">
              دليل FOMNINU
            </span>
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <motion.button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className="text-white/80 hover:text-medical-cyan transition-colors duration-300 font-medium"
              whileHover={{ y: -2 }}
            >
              {link.label}
            </motion.button>
          ))}
        </div>

        {/* Admin Link */}
        <motion.a
          href="/admin"
          className="hidden md:flex items-center gap-2 glass-button text-sm"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          لوحة التحكم
        </motion.a>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-white p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass-nav mt-3 mx-4 rounded-2xl overflow-hidden"
          >
            <div className="p-4 space-y-4">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => {
                    scrollToSection(link.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className="block w-full text-right text-white/80 hover:text-medical-cyan transition-colors py-2"
                >
                  {link.label}
                </button>
              ))}
              <a
                href="/admin"
                className="block w-full text-center glass-button mt-4"
              >
                لوحة التحكم
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
