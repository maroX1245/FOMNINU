'use client';

// Student Complaint Form Component - Static Version
// Developer: Mohamed Magdy - 5th Year Medical Student at FOMNINU

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function ComplaintForm() {
  const [formData, setFormData] = useState({
    studentName: '',
    studentId: '',
    issueType: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'success'>('idle');

  const issueTypes = [
    { value: 'academic', label: 'أكاديمي' },
    { value: 'administrative', label: 'إداري' },
    { value: 'facilities', label: 'مرافق' },
    { value: 'other', label: 'أخرى' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('success');
    setFormData({ studentName: '', studentId: '', issueType: '', message: '' });
    
    // Reset after 5 seconds
    setTimeout(() => setStatus('idle'), 5000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-6"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      {/* Student Name */}
      <div>
        <label className="block text-sm font-medium mb-2 text-white/80">
          اسم الطالب <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          name="studentName"
          value={formData.studentName}
          onChange={handleChange}
          required
          className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40
                     focus:outline-none focus:border-medical-cyan focus:ring-1 focus:ring-medical-cyan
                     transition-all duration-300"
          placeholder="أدخل اسمك الكامل"
        />
      </div>

      {/* Student ID */}
      <div>
        <label className="block text-sm font-medium mb-2 text-white/80">
          الرقم الجامعي <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          name="studentId"
          value={formData.studentId}
          onChange={handleChange}
          required
          className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40
                     focus:outline-none focus:border-medical-cyan focus:ring-1 focus:ring-medical-cyan
                     transition-all duration-300"
          placeholder="مثال: 2026001"
        />
      </div>

      {/* Issue Type */}
      <div>
        <label className="block text-sm font-medium mb-2 text-white/80">
          نوع المشكلة <span className="text-red-400">*</span>
        </label>
        <select
          name="issueType"
          value={formData.issueType}
          onChange={handleChange}
          required
          className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white
                     focus:outline-none focus:border-medical-cyan focus:ring-1 focus:ring-medical-cyan
                     transition-all duration-300 appearance-none cursor-pointer"
        >
          <option value="" className="bg-slate-800">اختر نوع المشكلة</option>
          {issueTypes.map((type) => (
            <option key={type.value} value={type.value} className="bg-slate-800">
              {type.label}
            </option>
          ))}
        </select>
      </div>

      {/* Message */}
      <div>
        <label className="block text-sm font-medium mb-2 text-white/80">
          نص الشكوى <span className="text-red-400">*</span>
        </label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          minLength={10}
          rows={5}
          className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40
                     focus:outline-none focus:border-medical-cyan focus:ring-1 focus:ring-medical-cyan
                     transition-all duration-300 resize-none"
          placeholder="اكتب تفاصيل شكواك هنا... (١٠ أحرف على الأقل)"
        />
      </div>

      {/* Success Message */}
      {status === 'success' && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-green-500/20 border border-green-500/30 rounded-xl text-green-300"
        >
          ✅ تم إرسال شكواك بنجاح! سنتواصل معك قريباً عبر الجرروب الرسمية.
        </motion.div>
      )}

      {/* Submit Button */}
      <motion.button
        type="submit"
        className="w-full glass-button flex items-center justify-center gap-2"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
        </svg>
        إرسال الشكوى
      </motion.button>
    </motion.form>
  );
}
