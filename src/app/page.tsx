'use client';

// Main Page Component - Complete FOMNINU Guide
// Developer: Mohamed Magdy - 5th Year Medical Student at FOMNINU
// New Ismailia Al-Ahlieh University - Faculty of Medicine

import { useRef, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Navigation, GlassCard, ComplaintForm, Accordion, AnimatedPieChart, Section, Footer } from '@/components/ui';

// Dynamically import 3D components (client-side only)
const DNAHelix = dynamic(() => import('@/components/3d/DNAHelix'), { ssr: false });
const ParticleBackground = dynamic(() => import('@/components/3d/ParticleBackground'), { ssr: false });
const Timeline3D = dynamic(() => import('@/components/3d/Timeline3D'), { ssr: false });
const StrategyIcons3D = dynamic(() => import('@/components/3d/AnimatedIcons'), { ssr: false });

// FOMNINU System Data from PDF
const modulesData = [
  {
    name: 'How to Learn',
    duration: 'أسبوعين',
    subjects: ['PBL System', 'Study Skills'],
    description: 'موديول تعريفي بسيط بيعرّفك على الكلية ونظامها.'
  },
  {
    name: 'Foundation 1',
    duration: '7 أسابيع',
    subjects: ['Anatomy', 'Biochemistry', 'Histology', 'Genetics', 'Physiology', 'Ethics'],
    description: '6 مواد - مدته 6 أسابيع دراسة + أسبوع امتحانات.'
  },
  {
    name: 'Foundation 2',
    duration: '7 أسابيع',
    subjects: ['+ Parasitology', '+ Microbiology', '+ Pharmacology', '+ Pathology'],
    description: 'هتتعمق في المواد الأساسية + 4 مواد جديدة.'
  },
  {
    name: 'Foundation 3',
    duration: '9 أسابيع',
    subjects: ['+ Community Medicine', '+ Research Project'],
    description: '9 مواد مع بعض - محتاج تهتم بيه جداً.'
  },
  {
    name: 'Musculoskeletal',
    duration: '6 أسابيع',
    subjects: ['Systemic Module', 'Anatomy + Physio + Path + Pharma'],
    description: 'أول موديول Systemic - أسهل موديول في السنة.'
  },
];

const examData = [
  { label: 'امتحان الميد MCQ', value: 10, color: '#06b6d4' },
  { label: 'امتحان OSPE العملي', value: 40, color: '#005b96' },
  { label: 'الفاينال MCQ', value: 15, color: '#0891b2' },
  { label: 'الفاينال MEQ', value: 15, color: '#22d3ee' },
  { label: 'ملف الإنجاز', value: 20, color: '#14b8a6' },
];

const gradingData = [
  { label: 'النظري (MCQ + MEQ)', value: 30, color: '#f43f5e' },
  { label: 'العملي (OSPE)', value: 40, color: '#06b6d4' },
  { label: 'ملف الإنجاز', value: 30, color: '#8b5cf6' },
];

const weeklyScheduleA = [
  { day: 'الثلاثاء', activity: 'الندوة + الكلاسات', attendance: true, note: 'بداية أسبوعك' },
  { day: 'الأربعاء', activity: 'جروب B تنزل', attendance: false, note: 'يومك فاضي' },
  { day: 'السبت/الخميس', activity: 'محاضرات', attendance: false, note: 'غالباً أونلاين' },
  { day: 'الأحد', activity: 'Skill Lab', attendance: true, note: 'معمل مهارات' },
  { day: 'الاثنين', activity: 'سكانشن', attendance: true, note: 'في المعامل' },
];

const weeklyScheduleB = [
  { day: 'الثلاثاء', activity: 'يومك فاضي', attendance: false, note: 'جروب A تبدأ' },
  { day: 'الأربعاء', activity: 'الندوة + الكلاسات', attendance: true, note: 'بداية أسبوعك' },
  { day: 'السبت/الخميس', activity: 'محاضرات', attendance: false, note: 'غالباً أونلاين' },
  { day: 'الأحد', activity: 'سكانشن', attendance: true, note: 'في المعامل' },
  { day: 'الاثنين', activity: 'Skill Lab', attendance: true, note: 'معمل مهارات' },
];

const attendanceRules = [
  {
    type: 'غياب العملي',
    rule: '25% من السكاشن',
    penalty: 'حرمان من امتحان العملي + حرمان من السكاشن'
  },
  {
    type: 'غياب الكلاسات',
    rule: '2 غياب في أسبوع الموديول',
    penalty: 'لم يحدد - معاك إنذار'
  },
  {
    type: 'غياب الندوة',
    rule: 'مع الكلاسات',
    penalty: 'بيدور على الكلاسات'
  },
  {
    type: 'غياب Skill Lab',
    rule: 'مرة أو مرتين في الترم',
    penalty: 'لم يحدد - يتم الإبلاغ'
  },
];

const resources = [
  { name: 'محاضرات الكلية PDF', icon: '📄', desc: 'الأهم - مع ريكورد المحاضرات' },
  { name: 'قنوات الدفعات (Telegram)', icon: '📱', desc: 'الكنز - فيها Data وملخصات وأسئلة' },
  { name: 'يوتيوب - دكاترة', icon: '🎬', desc: 'شرح من دكاترة معتمدين' },
  { name: 'AI (ChatGPT, Claude)', icon: '🤖', desc: 'ساعدك في الفهم والتلخيص' },
  { name: 'الملخصات', icon: '📚', desc: 'مش أفضل خيار لكن موجود' },
];

const timelineData = [
  { year: 2026, title: 'عامك الأول', description: 'Foundation Modules - المواد الأساسية' },
  { year: 2027, title: 'سنة تانية', description: 'Systemic Modules - الأنظمة' },
  { year: 2028, title: 'سنة ثالثة', description: 'Clinical Training - التدريب السريري' },
  { year: 2029, title: 'سنة رابعة', description: 'Advanced Clinical - تدريب متقدم' },
  { year: 2030, title: 'سنة خامسة', description: 'Specialty Rotations - التخصصات' },
  { year: 2031, title: 'التخرج! 🎓', description: 'دكتور في الطب - MBBS' },
];

const strategyData = [
  { title: 'PBL - التعلم بالمشاكل', icon: 'pbl' },
  { title: 'Self Learning', icon: 'hybrid' },
  { title: 'التدريب السريري', icon: 'clinical' },
  { title: 'البحث العلمي', icon: 'research' },
];

export default function Home() {
  const sectionRefs = {
    home: useRef<HTMLDivElement>(null),
    about: useRef<HTMLDivElement>(null),
    modules: useRef<HTMLDivElement>(null),
    exams: useRef<HTMLDivElement>(null),
    schedule: useRef<HTMLDivElement>(null),
    resources: useRef<HTMLDivElement>(null),
    complaints: useRef<HTMLDivElement>(null),
  };

  const [activeTimeline, setActiveTimeline] = useState(0);
  const [activeStrategy, setActiveStrategy] = useState(0);
  const [showGroupA, setShowGroupA] = useState(true);

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
            {/* University Badge */}
            <motion.div
              className="mb-6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: 'spring' }}
            >
              <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-medical-cyan shadow-lg shadow-medical-cyan/30 bg-slate-800">
                <Image
                  src="/images/campus1.jpg"
                  alt="FOMNINU Campus"
                  width={128}
                  height={128}
                  className="object-cover w-full h-full"
                />
              </div>
            </motion.div>
            
            <div className="mb-4">
              <span className="inline-block px-4 py-2 rounded-full bg-medical-cyan/20 text-medical-cyan text-sm mb-4">
                🏥 FOMNINU 2026-2031
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6">
              <span className="neon-text">نظامك في كبسولة</span>
            </h1>
            <h2 className="text-xl md:text-2xl text-white/80 mb-4">
              كلية الطب البشري - جامعة الإسماعيلية الأهلية
            </h2>
            <motion.p
              className="text-3xl md:text-5xl font-bold text-white/90 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              FOMNINU
            </motion.p>

            <motion.div
              className="flex flex-wrap justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <button
                onClick={() => scrollToSection('modules')}
                className="glass-button"
              >
                📚 الموديولات
              </button>
              <button
                onClick={() => scrollToSection('exams')}
                className="glass-button"
              >
                📝 الامتحانات
              </button>
              <button
                onClick={() => scrollToSection('schedule')}
                className="glass-button"
              >
                📅 جدولك
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
          <h2 className="section-title neon-text">🎯 نظرة عامة على النظام</h2>
          
          {/* University Image */}
          <motion.div
            className="max-w-4xl mx-auto mb-12 rounded-2xl overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Image
              src="/images/campus2.jpg"
              alt="جامعة الإسماعيلية الأهلية"
              width={800}
              height={400}
              className="w-full h-64 object-cover"
            />
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 max-w-6xl mx-auto">
            <GlassCard delay={0.1}>
              <div className="text-4xl mb-4">📦</div>
              <h3 className="text-xl font-bold mb-3">نظام الموديول</h3>
              <p className="text-white/70">
                مجموعة مواد بتدرسها مع بعض في فترة زمنية محددة. المواد مترابطة وتخدم بعضها.
              </p>
            </GlassCard>

            <GlassCard delay={0.2}>
              <div className="text-4xl mb-4">👥</div>
              <h3 className="text-xl font-bold mb-3">تقسيم الدفعة</h3>
              <p className="text-white/70">
                الدفعة مقسومة نصين: Group A (يبدأ يوم الثلاثء) و Group B (يبدأ يوم الأربعاء)
              </p>
            </GlassCard>

            <GlassCard delay={0.3}>
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-bold mb-3">التقييم</h3>
              <p className="text-white/70">
                60% للنجاح في الموديول. الرأفة في العملي فقط - مش في النظري!
              </p>
            </GlassCard>
          </div>
        </div>
      </Section>

      {/* Modules Section */}
      <Section id="modules" className="bg-slate-900/50 backdrop-blur-sm">
        <div ref={sectionRefs.modules}>
          <h2 className="section-title neon-text">📚 الموديولات - سنة أولى</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto mt-12">
            {modulesData.map((module, index) => (
              <GlassCard key={module.name} delay={index * 0.1}>
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-bold text-medical-cyan">{module.name}</h3>
                  <span className="px-3 py-1 bg-white/10 rounded-full text-sm">
                    {module.duration}
                  </span>
                </div>
                <p className="text-white/70 mb-4">{module.description}</p>
                <div className="flex flex-wrap gap-2">
                  {module.subjects.map((subject, i) => (
                    <span key={i} className="px-2 py-1 bg-medical-blue/30 rounded text-xs">
                      {subject}
                    </span>
                  ))}
                </div>
              </GlassCard>
            ))}
          </div>

          {/* Types of Modules */}
          <div className="max-w-4xl mx-auto mt-12">
            <GlassCard hover={false}>
              <h3 className="text-xl font-bold mb-6 neon-text">🏷️ أنواع الموديولات</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-white/5 rounded-xl">
                  <h4 className="font-bold text-medical-cyan mb-2">Foundation (التأسيسية)</h4>
                  <p className="text-sm text-white/70">
                    المواد الأساسية - سنة أولى - 4 موديولات
                  </p>
                </div>
                <div className="p-4 bg-white/5 rounded-xl">
                  <h4 className="font-bold text-medical-cyan mb-2">Systemic (الجهازية)</h4>
                  <p className="text-sm text-white/70">
                    الأنظمة - المواد مترابطة مع بعض
                  </p>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </Section>

      {/* Exams Section */}
      <Section id="exams" className="bg-slate-900/50 backdrop-blur-sm">
        <div ref={sectionRefs.exams}>
          <h2 className="section-title neon-text">📝 الامتحانات والتقييم</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto mt-12">
            <GlassCard hover={false}>
              <h3 className="text-xl font-bold mb-6 neon-text">نسب الامتحانات</h3>
              <div className="flex justify-center">
                <AnimatedPieChart data={examData} title="توزيع درجات الموديول" />
              </div>
            </GlassCard>

            <GlassCard hover={false}>
              <h3 className="text-xl font-bold mb-6 neon-text">توزيع الدرجات</h3>
              <div className="flex justify-center">
                <AnimatedPieChart data={gradingData} title="الدور الأول" />
              </div>
            </GlassCard>
          </div>

          {/* Exam Details */}
          <div className="max-w-4xl mx-auto mt-12">
            <GlassCard hover={false}>
              <h3 className="text-xl font-bold mb-6 neon-text">تفاصيل كل امتحان</h3>
              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-r from-medical-blue/20 to-transparent rounded-xl border-r-4 border-medical-cyan">
                  <h4 className="font-bold text-lg mb-2">1️⃣ امتحان الميد MCQ (10%)</h4>
                  <p className="text-white/70 text-sm">
                    في نص الموديول - أسئلة MCQ من محاضرات الاسبوع اللي فات
                  </p>
                </div>
                
                <div className="p-4 bg-gradient-to-r from-medical-cyan/20 to-transparent rounded-xl border-r-4 border-medical-cyan">
                  <h4 className="font-bold text-lg mb-2">2️⃣ امتحان OSPE العملي (40%)</h4>
                  <p className="text-white/70 text-sm">
                    10-11 ستيشن - كل ستيشن فيه سؤال أو سؤالين - 3 دقائق لكل ستيشن
                  </p>
                </div>
                
                <div className="p-4 bg-gradient-to-r from-medical-blue/20 to-transparent rounded-xl border-r-4 border-medical-cyan">
                  <h4 className="font-bold text-lg mb-2">3️⃣ الفاينال MCQ (15%)</h4>
                  <p className="text-white/70 text-sm">
                    أسئلة MCQ من كل المحاضرات - 20 سؤال كل 30 دقيقة
                  </p>
                </div>
                
                <div className="p-4 bg-gradient-to-r from-medical-cyan/20 to-transparent rounded-xl border-r-4 border-medical-cyan">
                  <h4 className="font-bold text-lg mb-2">4️⃣ الفاينال MEQ المقالي (15%)</h4>
                  <p className="text-white/70 text-sm">
                    امتحان مقالي في المدرجات - حوالي 10 أسئلة - 2-3 ساعات
                  </p>
                </div>
                
                <div className="p-4 bg-gradient-to-r from-medical-blue/20 to-transparent rounded-xl border-r-4 border-medical-cyan">
                  <h4 className="font-bold text-lg mb-2">5️⃣ ملف الإنجاز (20%)</h4>
                  <p className="text-white/70 text-sm">
                    بورتفوليو - بتسلمه في نهاية كل موديول
                  </p>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Pass & Compassion */}
          <div className="max-w-4xl mx-auto mt-8">
            <GlassCard>
              <h3 className="text-xl font-bold mb-4 neon-text">⚠️ شروط النجاح والرأفة</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-green-500/10 rounded-xl border border-green-500/30">
                  <h4 className="font-bold text-green-400 mb-2">✅ النجاح</h4>
                  <p className="text-white/70 text-sm">
                    لازم تجيب 60% من درجة الموديول
                  </p>
                </div>
                <div className="p-4 bg-yellow-500/10 rounded-xl border border-yellow-500/30">
                  <h4 className="font-bold text-yellow-400 mb-2">💝 الرأفة</h4>
                  <p className="text-white/70 text-sm">
                    <span className="text-red-400">النظري:</span> لا يوجد رأفة
                    <br/>
                    <span className="text-green-400">العملي:</span> يوجد رأفة
                  </p>
                </div>
              </div>
              <p className="mt-4 p-4 bg-red-500/10 rounded-xl text-red-300 text-sm">
                ⚠️ مهم: لو جبت أقل من 40% في النظري هتسقط نظري حتى لو المجموع 60%!
              </p>
            </GlassCard>
          </div>
        </div>
      </Section>

      {/* Schedule Section */}
      <Section id="schedule" className="bg-slate-900/50 backdrop-blur-sm">
        <div ref={sectionRefs.schedule}>
          <h2 className="section-title neon-text">📅 جدولك في الكلية</h2>

          {/* Group Toggle */}
          <div className="flex justify-center gap-4 mb-8">
            <button
              onClick={() => setShowGroupA(true)}
              className={`px-6 py-3 rounded-xl font-medium transition-all ${
                showGroupA 
                  ? 'bg-medical-cyan/20 text-medical-cyan border border-medical-cyan' 
                  : 'bg-white/5 text-white/70 border border-transparent'
              }`}
            >
              Group A (الثلاثاء)
            </button>
            <button
              onClick={() => setShowGroupA(false)}
              className={`px-6 py-3 rounded-xl font-medium transition-all ${
                !showGroupA 
                  ? 'bg-medical-cyan/20 text-medical-cyan border border-medical-cyan' 
                  : 'bg-white/5 text-white/70 border border-transparent'
              }`}
            >
              Group B (الأربعاء)
            </button>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={showGroupA ? 'A' : 'B'}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-4xl mx-auto"
            >
              <GlassCard hover={false}>
                <h3 className="text-lg font-bold mb-4 text-medical-cyan">
                  {showGroupA ? 'Group A - أسبوعك يبدأ يوم الثلاثاء' : 'Group B - أسبوعك يبدأ يوم الأربعاء'}
                </h3>
                <div className="space-y-3">
                  {(showGroupA ? weeklyScheduleA : weeklyScheduleB).map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{item.attendance ? '✅' : '📚'}</span>
                        <div>
                          <span className="font-bold">{item.day}</span>
                          <p className="text-white/70 text-sm">{item.activity}</p>
                        </div>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded ${
                        item.attendance 
                          ? 'bg-yellow-500/20 text-yellow-400' 
                          : 'bg-white/10 text-white/50'
                      }`}>
                        {item.attendance ? 'عليه غياب' : 'بدون غياب'}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-sm text-white/50">
                  💡 {showGroupA 
                    ? 'الأسبوع التاني: جروب A تبدأ يوم الثلاثء (فاضي لجروب B)' 
                    : 'الأسبوع التاني: جروب B تبدأ يوم الأربعاء (فاضي لجروب A)'}
                </p>
              </GlassCard>
            </motion.div>
          </AnimatePresence>

          {/* Attendance Rules */}
          <div className="max-w-4xl mx-auto mt-12">
            <GlassCard hover={false}>
              <h3 className="text-xl font-bold mb-6 neon-text">⚖️ قواعد الغياب</h3>
              <div className="space-y-4">
                {attendanceRules.map((rule, index) => (
                  <div key={index} className="p-4 bg-white/5 rounded-xl">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-medical-cyan">{rule.type}</h4>
                      <span className="text-sm text-yellow-400">{rule.rule}</span>
                    </div>
                    <p className="text-white/70 text-sm">{rule.penalty}</p>
                  </div>
                ))}
              </div>
              <p className="mt-4 p-4 bg-blue-500/10 rounded-xl text-blue-300 text-sm">
                📢 كل أسبوع بينزل على الجرروب الرسمية في التيليجرام نسب الغياب
              </p>
            </GlassCard>
          </div>
        </div>
      </Section>

      {/* Resources Section */}
      <Section id="resources" className="bg-slate-900/50 backdrop-blur-sm">
        <div ref={sectionRefs.resources}>
          <h2 className="section-title neon-text">📖 مصادر المذاكرة</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mt-12">
            {resources.map((resource, index) => (
              <GlassCard key={resource.name} delay={index * 0.1}>
                <div className="text-4xl mb-4">{resource.icon}</div>
                <h3 className="text-lg font-bold mb-2">{resource.name}</h3>
                <p className="text-white/70 text-sm">{resource.desc}</p>
              </GlassCard>
            ))}
          </div>

          {/* Important Notice */}
          <div className="max-w-4xl mx-auto mt-12">
            <GlassCard>
              <h3 className="text-xl font-bold mb-4 text-yellow-400">⚠️ معلومات مهمة عن الكورسات</h3>
              <div className="space-y-3 text-white/80">
                <p>❌ الكورسات ممنوعة في الكلية - النظام بيقول Self Learning</p>
                <p>✅ الاعتماد على نفسك في المذاكرة هو الأساس</p>
                <p>📱 قنوات الدفعات السابقة هي الكنز الحقيقي - فيها كل حاجة</p>
                <p>💡 الكورسات اللي بتطلع من الكلية مش من الكلية نفسها</p>
              </div>
            </GlassCard>
          </div>

          {/* Timeline */}
          <div className="max-w-4xl mx-auto mt-12">
            <GlassCard className="text-center" hover={false}>
              <h3 className="text-xl font-bold mb-6 neon-text">🗓️ محطاتك في الكلية</h3>
              <Timeline3D
                milestones={timelineData}
                activeIndex={activeTimeline}
                onNodeClick={setActiveTimeline}
              />
            </GlassCard>
          </div>
        </div>
      </Section>

      {/* Strategy Section */}
      <Section id="strategy" className="bg-slate-900/50 backdrop-blur-sm">
        <h2 className="section-title neon-text">🎯 الاستراتيجيات التعليمية</h2>
        
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
      </Section>

      {/* Complaints Section */}
      <Section id="complaints" className="bg-slate-900/50 backdrop-blur-sm">
        <div ref={sectionRefs.complaints}>
          <h2 className="section-title neon-text">📬 صندوق الشكاوى</h2>
          
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
