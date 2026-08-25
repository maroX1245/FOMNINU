'use client';

// Animated Pie Chart Component
// Developer: Mohamed Magdy - 5th Year Medical Student at FOMSCU

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface ChartData {
  label: string;
  value: number;
  color: string;
}

export default function AnimatedPieChart({ data, title }: { data: ChartData[]; title: string }) {
  const [animatedData, setAnimatedData] = useState<typeof data>([]);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedData(data);
    }, 100);
    return () => clearTimeout(timer);
  }, [data]);

  const total = data.reduce((sum, item) => sum + item.value, 0);
  
  // Calculate stroke-dasharray for each segment
  const segments = animatedData.reduce((acc: { dashArray: string; dashOffset: number }[], item, index) => {
    const percentage = (item.value / total) * 100;
    const circumference = 2 * Math.PI * 45;
    const dashArray = `${percentage} ${100 - percentage}`;
    const dashOffset = acc.length > 0 
      ? acc[index - 1].dashOffset - (data[index - 1].value / total) * circumference
      : 0;
    
    acc.push({ dashArray, dashOffset });
    return acc;
  }, []);

  return (
    <div className="flex flex-col items-center">
      <h4 className="text-lg font-bold mb-6 text-center">{title}</h4>
      
      <div className="relative w-48 h-48">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="10"
          />
          
          {/* Animated segments */}
          {animatedData.map((item, index) => (
            <motion.circle
              key={item.label}
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke={item.color}
              strokeWidth="10"
              strokeDasharray={segments[index]?.dashArray || '0 100'}
              strokeDashoffset={segments[index]?.dashOffset || 0}
              strokeLinecap="round"
              initial={{ strokeDasharray: '0 100' }}
              animate={{ strokeDasharray: segments[index]?.dashArray || '0 100' }}
              transition={{ duration: 1, delay: index * 0.2 }}
            />
          ))}
        </svg>
        
        {/* Center text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <span className="text-3xl font-bold neon-text">{total}%</span>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-6 space-y-3">
        {data.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + index * 0.1 }}
            className="flex items-center gap-3"
          >
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-sm text-white/80">
              {item.label}: {item.value}%
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
