'use client';

// Main Page Component
// Developer: Mohamed Magdy - 5th Year Medical Student at FOMSCU

import { useRef, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { Navigation, GlassCard, ComplaintForm, Accordion, AnimatedPieChart, Section, Footer } from '@/components/ui';

// Dynamically import 3D components (client-side only)
const DNAHelix = dynamic(() => import('@/components/3d/DNAHelix'), { ssr: false });
const ParticleBackground = dynamic(() => import('@/components/3d/ParticleBackground'), { ssr: false });
const Timeline3D = dynamic(() => import('@/components/3d/Timeline3D'), { ssr: false });
const StrategyIcons3D = dynamic(() => import('@/components/3d/AnimatedIcons'), { ssr: false });

// Mock data - in production, this would come from API/database
const timelineData = [
  { year: 1977, title: 'تأسيس الكلية', description: 'تأسست كلية الطب البشري بجامعة قناة السويس' },
  { year: 1980, title: 'أول دفعة خريجة', description: 'تخرجت أول دفعة من طلاب الكلية' },
  { year: 2000, title: 'التطوير الشامل', description: 'إطلاق برنامج التطوير الشامل للمناهج' },
  { year: 2010, title: 'نظام PBL', description: 'اعتماد نظام التعلم المبني على حل المشكلات' },
  { year: 2021, title: 'الاعتماد الدولي', description: 'الحصول على الاعتماد الدولي' },
  { year: 2023, title: 'التحديث الحديث', description: 'إطلاق الدليل الطلابي المحدث' },
];

const strategyData = [
  { title: 'التعلم المبني على حل المشكلات', icon: 'pbl' },
  { title: 'التعلم الهجين', icon: 'hybrid' },
  { title: 'التدريب السريري', icon: 'clinical' },
  { title: 'البحث العلمي', icon: 'research' },
];

const programPhases = [
  {
    title: 'المرحلة الأساسية (سنتان)',
    content: `تغطي هذه المرحلة العلوم الأساسية:
• التشريح وعلم الأنسجة
• علم وظائف الأعضاء
• الكيمياء الحيوية
• علم الأجنة
• الفيزياء الحيوية
• لغة إنجليزية طبية`
  },
  {
    title: 'مرحلة ما قبل السريرية (سنة)',
    content: `تشمل:
• الفسيولوجيا المرضية العامة
• علم الأحياء الدقيقة والمناعة
• علم الأدوية الأساسي
• ربط العلوم الأساسية بالأمراض`
  },
  {
    title: 'المرحلة السريرية (ثلاث سنوات)',
    content: `التدريب العملي في:
• الطب الباطني
• الجراحة العامة
• طب الأطفال
• النساء والولادة
• طب الطوارئ
• الطب الوقائي والمجتمع`
  },
];

const evaluationData = [
  { label: 'امتحانات شفهية', value: 30, color: '#06b6d4' },
  { label: 'امتحانات تحريرية', value: 40, color: '#005b96' },
  { label: 'تقييم سريري', value: 20, color: '#0891b2' },
  { label: 'متابعة مستمرة', value: 10, color: '#22d3ee' },
];

export default function Home() {
  const sectionRefs = {
    home: useRef<HTMLDivElement>(null),
    about: useRef<HTMLDivElement>(null),
    timeline: useRef<HTMLDivElement>(null),
    strategy: useRef<HTMLDivElement>(null),
    program: useRef<HTMLDivElement>(null),
    complaints: useRef<HTMLDivElement>(null),
  };

  const [activeTimeline, setActiveTimeline] = useState(0);
  const [activeStrategy, setActiveStrategy] = useState(0);

  const scrollToSection = (sectionId: string) => {
    const section = sectionRefs[sectionId as keyof typeof sectionRefs]?.current;
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Auto-rotate for 3D components
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTimeline((prev) => (prev + 1) % timelineData.length);
      setActiveStrategy((prev) => (prev + 1) % strategyData.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="relative min-h-screen">
      {/* 3D Background */}
      <ParticleBackground />
      <DNAHelix />

      {/* Navigation */}
      <Navigation scrollToSection={scrollToSection} />

      {/* Hero Section */}
      <Section id="home" fullHeight className="flex items-center justify-center">
        <div className="text-center z-10 px-4" ref={sectionRefs.home}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6">
              <span className="neon-text">دليل الطالب</span>
            </h1>
            <h2 className="text-xl md:text-2xl text-white/80 mb-4">
              كلية الطب البشري - جامعة قناة السويس
            </h2>
            <motion.p
              className="text-3xl md:text-5xl font-bold text-white/90 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              ٢٠٢٣ - ٢٠٢٤
            </motion.p>

            <motion.div
              className="flex flex-wrap justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <button
                onClick={() => scrollToSection('about')}
                className="glass-button"
              >
                استكشف الدليل
              </button>
              <button
                onClick={() => scrollToSection('complaints')}
                className="px-8 py-3 rounded-xl border border-medical-cyan text-medical-cyan
                           hover:bg-medical-cyan/10 transition-all duration-300"
              >
                صندوق الشكاوى
              </button>
            </motion.div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <svg className="w-8 h-8 text-medical-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </div>
      </Section>

      {/* About Section */}
      <Section id="about" className="bg-slate-900/50 backdrop-blur-sm">
        <div ref={sectionRefs.about}>
          <h2 className="section-title neon-text">عن الكلية</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            <GlassCard delay={0.1}>
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-bold mb-3">الرؤية</h3>
              <p className="text-white/70">
                أن تكون الكلية رائدة محلياً وإقليمياً في التعليم الطبي والبحث العلمي وخدمة المجتمع.
              </p>
            </GlassCard>

            <GlassCard delay={0.2}>
              <div className="text-4xl mb-4">📜</div>
              <h3 className="text-xl font-bold mb-3">الرسالة</h3>
              <p className="text-white/70">
                تخرج أطباء متميزين قادرين على التعامل مع المشاكل الصحية للمجتمع مع الالتزام بأخلاقيات المهنة.
              </p>
            </GlassCard>

            <GlassCard delay={0.3}>
              <div className="text-4xl mb-4">⭐</div>
              <h3 className="text-xl font-bold mb-3">الأهداف</h3>
              <p className="text-white/70">
                تخريج أطباء أكفاء، تنمية البحث العلمي، وتقديم خدمات صحية متميزة للمجتمع المصري.
              </p>
            </GlassCard>
          </div>
        </div>
      </Section>

      {/* Timeline Section */}
      <Section id="timeline" className="bg-slate-900/50 backdrop-blur-sm">
        <div ref={sectionRefs.timeline}>
          <h2 className="section-title neon-text">نشأة الكلية</h2>
          
          <GlassCard className="max-w-4xl mx-auto mt-12" hover={false}>
            <Timeline3D
              milestones={timelineData}
              activeIndex={activeTimeline}
              onNodeClick={setActiveTimeline}
            />
            
            <div className="mt-8 text-center">
              <motion.h3
                key={activeTimeline}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-2xl font-bold text-medical-cyan mb-2"
              >
                {timelineData[activeTimeline].year}
              </motion.h3>
              <motion.p
                key={`title-${activeTimeline}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xl font-bold mb-2"
              >
                {timelineData[activeTimeline].title}
              </motion.p>
              <motion.p
                key={`desc-${activeTimeline}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-white/70"
              >
                {timelineData[activeTimeline].description}
              </motion.p>
            </div>
          </GlassCard>
        </div>
      </Section>

      {/* Strategy Section */}
      <Section id="strategy" className="bg-slate-900/50 backdrop-blur-sm">
        <div ref={sectionRefs.strategy}>
          <h2 className="section-title neon-text">الاستراتيجيات التعليمية</h2>
          
          <GlassCard className="max-w-4xl mx-auto mt-12" hover={false}>
            <StrategyIcons3D
              strategies={strategyData}
              activeIndex={activeStrategy}
            />
            
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
              {strategyData.map((strategy, index) => (
                <motion.div
                  key={strategy.title}
                  className={`p-4 rounded-xl text-center cursor-pointer transition-all duration-300 ${
                    activeStrategy === index 
                      ? 'bg-medical-cyan/20 border border-medical-cyan' 
                      : 'bg-white/5 border border-white/10 hover:border-white/30'
                  }`}
                  onClick={() => setActiveStrategy(index)}
                  whileHover={{ scale: 1.05 }}
                >
                  <p className={`text-sm font-medium ${
                    activeStrategy === index ? 'text-medical-cyan' : 'text-white/70'
                  }`}>
                    {strategy.title}
                  </p>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </div>
      </Section>

      {/* Program Structure Section */}
      <Section id="program" className="bg-slate-900/50 backdrop-blur-sm">
        <div ref={sectionRefs.program}>
          <h2 className="section-title neon-text">هيكل البرنامج</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto mt-12">
            <GlassCard delay={0.1}>
              <h3 className="text-xl font-bold mb-6 neon-text">مراحل البرنامج</h3>
              <Accordion items={programPhases} />
            </GlassCard>

            <GlassCard delay={0.2}>
              <h3 className="text-xl font-bold mb-6 neon-text">التقييم والامتحانات</h3>
              <div className="flex justify-center">
                <AnimatedPieChart data={evaluationData} title="نسب التقييم" />
              </div>
            </GlassCard>
          </div>
        </div>
      </Section>

      {/* Complaints Section */}
      <Section id="complaints" className="bg-slate-900/50 backdrop-blur-sm">
        <div ref={sectionRefs.complaints}>
          <h2 className="section-title neon-text">صندوق الشكاوى</h2>
          
          <div className="max-w-2xl mx-auto mt-12">
            <GlassCard>
              <div className="text-center mb-8">
                <div className="text-5xl mb-4">📬</div>
                <h3 className="text-xl font-bold mb-2">قدم شكواك</h3>
                <p className="text-white/60">
                  نسعد بتلقي ملاحظاتكم ومساعدتكم. جميع الشكاوى يتم التعامل معها بسرية تامة.
                </p>
              </div>
              
              <ComplaintForm />
            </GlassCard>
          </div>
        </div>
      </Section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
