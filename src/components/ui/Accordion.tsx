'use client';

// Animated Accordion Component
// Developer: Mohamed Magdy - 5th Year Medical Student at FOMNINU

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AccordionItemProps {
  title: string;
  content: string;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}

function AccordionItem({ title, content, isOpen, onToggle, index }: AccordionItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="mb-4"
    >
      <motion.button
        onClick={onToggle}
        className={`w-full text-right p-5 rounded-xl flex items-center justify-between gap-4
                   transition-all duration-300 ${
                     isOpen 
                       ? 'bg-gradient-to-r from-medical-blue/40 to-medical-cyan/40 border-medical-cyan' 
                       : 'bg-white/5 border-white/10 hover:bg-white/10'
                   } border`}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        <span className="font-bold text-lg">{title}</span>
        <motion.svg
          className="w-6 h-6 text-medical-cyan"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          animate={{ rotate: isOpen ? 180 : 0 }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </motion.svg>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-5 bg-white/5 rounded-b-xl border-x border-b border-white/10">
              <p className="text-white/80 leading-relaxed whitespace-pre-line">
                {content}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

interface AccordionProps {
  items: { title: string; content: string }[];
}

export default function Accordion({ items }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-2">
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          title={item.title}
          content={item.content}
          isOpen={openIndex === index}
          onToggle={() => setOpenIndex(openIndex === index ? null : index)}
          index={index}
        />
      ))}
    </div>
  );
}
