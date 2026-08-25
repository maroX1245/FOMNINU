'use client';

// Admin Dashboard Page
// Developer: Mohamed Magdy - 5th Year Medical Student at FOMSCU

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Complaint {
  id: string;
  studentName: string;
  studentId: string;
  issueType: string;
  message: string;
  status: string;
  adminReply?: string;
  createdAt: string;
}

interface GuideContent {
  id: string;
  sectionKey: string;
  sectionTitle: string;
  sectionContent: string;
  orderIndex: number;
}

type TabType = 'complaints' | 'content' | 'electives';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>('complaints');
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [guideContent, setGuideContent] = useState<GuideContent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [replyText, setReplyText] = useState('');
  const [selectedComplaint, setSelectedComplaint] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      if (activeTab === 'complaints') {
        const res = await fetch('/api/complaints');
        const data = await res.json();
        setComplaints(data.complaints || []);
      } else if (activeTab === 'content') {
        const res = await fetch('/api/guide');
        const data = await res.json();
        setGuideContent(Array.isArray(data.content) ? data.content : [data.content].filter(Boolean));
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateComplaintStatus = async (id: string, status: string, reply?: string) => {
    try {
      await fetch(`/api/complaints/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, adminReply: reply }),
      });
      fetchData();
      setSelectedComplaint(null);
      setReplyText('');
    } catch (error) {
      console.error('Error updating complaint:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING': return 'bg-yellow-500/20 text-yellow-400';
      case 'IN_PROGRESS': return 'bg-blue-500/20 text-blue-400';
      case 'RESOLVED': return 'bg-green-500/20 text-green-400';
      case 'REJECTED': return 'bg-red-500/20 text-red-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'PENDING': return 'قيد الانتظار';
      case 'IN_PROGRESS': return 'قيد المراجعة';
      case 'RESOLVED': return 'تم الحل';
      case 'REJECTED': return 'مرفوض';
      default: return status;
    }
  };

  const tabs = [
    { id: 'complaints', label: 'الشكاوى', icon: '📬' },
    { id: 'content', label: 'المحتوى', icon: '📝' },
  ] as const;

  return (
    <div>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold neon-text mb-2">لوحة التحكم</h1>
        <p className="text-white/60">مرحباً بك في لوحة تحكم الدليل الطلابي</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/50 text-sm">إجمالي الشكاوى</p>
              <p className="text-3xl font-bold">{complaints.length}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center text-2xl">
              📬
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/50 text-sm">شكاوى معلقة</p>
              <p className="text-3xl font-bold">
                {complaints.filter(c => c.status === 'PENDING').length}
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-yellow-500/20 flex items-center justify-center text-2xl">
              ⏳
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/50 text-sm">شكاوى تم حلها</p>
              <p className="text-3xl font-bold">
                {complaints.filter(c => c.status === 'RESOLVED').length}
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center text-2xl">
              ✅
            </div>
          </div>
        </motion.div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-6 border-b border-white/10 pb-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
              activeTab === tab.id
                ? 'bg-medical-cyan/20 text-medical-cyan border border-medical-cyan'
                : 'bg-white/5 text-white/70 hover:bg-white/10 border border-transparent'
            }`}
          >
            <span className="ml-2">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-12 h-12 border-4 border-medical-cyan border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <>
          {/* Complaints Tab */}
          {activeTab === 'complaints' && (
            <div className="space-y-4">
              {complaints.length === 0 ? (
                <div className="glass-card text-center py-12">
                  <p className="text-white/50">لا توجد شكاوى حالياً</p>
                </div>
              ) : (
                complaints.map((complaint, index) => (
                  <motion.div
                    key={complaint.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="glass-card"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                      <div>
                        <h3 className="font-bold text-lg">{complaint.studentName}</h3>
                        <p className="text-white/50 text-sm">الرقم الجامعي: {complaint.studentId}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(complaint.status)}`}>
                        {getStatusLabel(complaint.status)}
                      </span>
                    </div>

                    <div className="mb-4">
                      <span className="text-medical-cyan text-sm">نوع المشكلة: </span>
                      <span className="text-white/80">{complaint.issueType}</span>
                    </div>

                    <p className="text-white/70 mb-4 p-4 bg-white/5 rounded-xl">
                      {complaint.message}
                    </p>

                    {complaint.adminReply && (
                      <div className="mb-4 p-4 bg-green-500/10 rounded-xl border border-green-500/30">
                        <p className="text-green-400 text-sm mb-1">رد الإدارة:</p>
                        <p className="text-white/80">{complaint.adminReply}</p>
                      </div>
                    )}

                    {selectedComplaint === complaint.id ? (
                      <div className="space-y-4">
                        <textarea
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          placeholder="اكتب ردك هنا..."
                          className="w-full bg-white/5 border border-white/20 rounded-xl p-4 text-white placeholder-white/40
                                     focus:outline-none focus:border-medical-cyan"
                          rows={3}
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={() => updateComplaintStatus(complaint.id, 'RESOLVED', replyText)}
                            className="px-4 py-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors"
                          >
                            تم الحل
                          </button>
                          <button
                            onClick={() => updateComplaintStatus(complaint.id, 'IN_PROGRESS')}
                            className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors"
                          >
                            قيد المراجعة
                          </button>
                          <button
                            onClick={() => setSelectedComplaint(null)}
                            className="px-4 py-2 bg-white/10 text-white/70 rounded-lg hover:bg-white/20 transition-colors"
                          >
                            إلغاء
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <button
                          onClick={() => setSelectedComplaint(complaint.id)}
                          className="px-4 py-2 bg-medical-cyan/20 text-medical-cyan rounded-lg hover:bg-medical-cyan/30 transition-colors"
                        >
                          الرد والشطب
                        </button>
                        <button
                          onClick={() => updateComplaintStatus(complaint.id, 'REJECTED')}
                          className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
                        >
                          رفض
                        </button>
                      </div>
                    )}

                    <p className="text-white/30 text-xs mt-4">
                      {new Date(complaint.createdAt).toLocaleDateString('ar-EG')}
                    </p>
                  </motion.div>
                ))
              )}
            </div>
          )}

          {/* Content Tab */}
          {activeTab === 'content' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {guideContent.map((content, index) => (
                <motion.div
                  key={content.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card"
                >
                  <h3 className="font-bold text-lg mb-2 neon-text">{content.sectionTitle}</h3>
                  <p className="text-white/50 text-sm mb-4">المفتاح: {content.sectionKey}</p>
                  <p className="text-white/70 whitespace-pre-line">
                    {content.sectionContent}
                  </p>
                  <button className="mt-4 px-4 py-2 bg-medical-cyan/20 text-medical-cyan rounded-lg hover:bg-medical-cyan/30 transition-colors">
                    تعديل
                  </button>
                </motion.div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
