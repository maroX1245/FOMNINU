'use client';

// Footer Component
// Developer: Mohamed Magdy - 5th Year Medical Student at FOMNINU

import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="relative py-12 border-t border-white/10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                   {/* About */}
          <div>
            <h4 className="font-bold text-lg mb-4 neon-text">عن الدليل</h4>
            <p className="text-white/60 text-sm leading-relaxed">
              دليل الطالب الرسمي لكلية الطب البشري - جامعة الإسماعيلية الوطنية الجديدة FOMNINU
              للعام الجامعي ٢٠٢٦-٢٠٣١
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-4 neon-text">روابط سريعة</h4>
            <ul className="space-y-2 text-white/60 text-sm">
              <li><a href="#home" className="hover:text-medical-cyan transition-colors">الرئيسية</a></li>
              <li><a href="#about" className="hover:text-medical-cyan transition-colors">عن الكلية</a></li>
              <li><a href="#program" className="hover:text-medical-cyan transition-colors">البرنامج</a></li>
              <li><a href="#complaints" className="hover:text-medical-cyan transition-colors">صندوق الشكاوى</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-lg mb-4 neon-text">تواصل معنا</h4>
            <ul className="space-y-2 text-white/60 text-sm">
              <li>📍 الإسماعيلية، مصر</li>
              <li>🏥 كلية الطب البشري - جامعة قناة السويس</li>
              <li>📧 info@fomscu.edu.eg</li>
            </ul>
          </div>
        </div>

        {/* Developer Credit */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="pt-8 border-t border-white/10 text-center"
        >
          <p className="text-white/50 text-sm mb-2">
            © ٢٠٢٦ جميع الحقوق محفوظة - كلية الطب البشري - جامعة الإسماعيلية الوطنية الجديدة FOMNINU
          </p>
          <p className="text-medical-cyan font-medium">
            🎓 تم التطوير Full-Stack بواسطة:{' '}
            <a 
              href="https://github.com/marox1245" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:underline"
            >
              محمد مجدي
            </a>
            {' '} - طالب طب بشري سنة خامسة - FOMNINU
          </p>
          <p className="text-white/40 text-xs mt-2">
            Built with Next.js, React Three Fiber, and Prisma
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
