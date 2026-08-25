// FOMSCU Student Guide - Database Seed
// Developer: Mohamed Magdy - 5th Year Medical Student at FOMSCU

import { PrismaClient, ComplaintStatus } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌟 Seeding FOMSCU Student Guide Database...');

  // Create default admin
  const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'admin123', 12);
  
  await prisma.admin.upsert({
    where: { username: process.env.ADMIN_USERNAME || 'admin' },
    update: {},
    create: {
      username: process.env.ADMIN_USERNAME || 'admin',
      passwordHash: hashedPassword,
      name: 'مدير النظام',
    },
  });
  console.log('✅ Admin account created');

  // Seed Guide Content
  const guideContents = [
    {
      sectionKey: 'vision',
      sectionTitle: 'الرؤية',
      sectionContent: 'أن تكون الكلية رائدة محلياً وإقليمياً في التعليم الطبي والبحث العلمي وخدمة المجتمع.',
      orderIndex: 1,
    },
    {
      sectionKey: 'mission',
      sectionTitle: 'الرسالة',
      sectionContent: 'تخرج أطباء متميزين قادرين على التعامل مع المشاكل الصحية للمجتمع المصري مع الالتزام بأخلاقيات المهنة والتطوير المهني المستمر.',
      orderIndex: 2,
    },
    {
      sectionKey: 'goals',
      sectionTitle: 'الأهداف',
      sectionContent: `- تخريج أطباء ذوي كفاءة عالية في التشخيص والعلاج
- تنمية البحث العلمي في المجال الطبي
- تقديم خدمات صحية متميزة للمجتمع
- تطوير مستمر في البرامج التعليمية
- الالتزام بمعايير الجودة والاعتماد`,
      orderIndex: 3,
    },
  ];

  for (const content of guideContents) {
    await prisma.guideContent.upsert({
      where: { sectionKey: content.sectionKey },
      update: { sectionContent: content.sectionContent },
      create: content,
    });
  }
  console.log('✅ Guide content seeded');

  // Seed Timeline Milestones
  const milestones = [
    { year: 1977, title: 'تأسيس الكلية', description: 'تأسست كلية الطب البشري بجامعة قناة السويس', orderIndex: 1 },
    { year: 1980, title: 'أول دفعة خريجة', description: 'تخرجت أول دفعة من طلاب الكلية', orderIndex: 2 },
    { year: 2000, title: 'التطوير الشامل', description: 'إطلاق برنامج التطوير الشامل للمناهج', orderIndex: 3 },
    { year: 2010, title: 'نظام PBL', description: 'اعتماد نظام التعلم المبني على حل المشكلات', orderIndex: 4 },
    { year: 2021, title: 'الاعتماد الدولي', description: 'الحصول على الاعتماد الدولي من EAACI', orderIndex: 5 },
    { year: 2023, title: 'التحديث الحديث', description: 'إطلاق الدليل الطلابي المحدث 2023-2024', orderIndex: 6 },
  ];

  for (const milestone of milestones) {
    await prisma.timelineMilestone.create({ data: milestone });
  }
  console.log('✅ Timeline milestones seeded');

  // Seed Program Phases
  const phases = [
    {
      phaseNumber: 1,
      title: 'المرحلة الأساسية',
      description: 'تغطي هذه المرحلة العلوم الأساسية مثل التشريح وعلم الأنسجة وعلم وظائف الأعضاء والكيمياء الحيوية',
      duration: 'سنتان (الفصول 1-4)',
      orderIndex: 1,
    },
    {
      phaseNumber: 2,
      title: 'مرحلة ما قبل السريرية',
      description: 'تشمل دراسة الأمراض وعلاقتها بالعلوم الأساسية، مع التركيز على الفسيولوجيا المرضية',
      duration: 'سنة واحدة (الفصول 5-6)',
      orderIndex: 2,
    },
    {
      phaseNumber: 3,
      title: 'المرحلة السريرية',
      description: 'التدريب العملي في المستشفيات التعليمية في جميع التخصصات الطبية الأساسية',
      duration: 'ثلاث سنوات (الفصول 7-12)',
      orderIndex: 3,
    },
  ];

  for (const phase of phases) {
    await prisma.programPhase.create({ data: phase });
  }
  console.log('✅ Program phases seeded');

  // Seed Elective Courses
  const electives = [
    { title: 'البحث العلمي الطبي', description: 'أساسيات البحث العلمي والتصميم التجريبي', year: 3, semester: 1, department: 'قسم البحث العلمي', credits: 2 },
    { title: 'المعلوماتية الصحية', description: 'استخدام التقنيات المعلوماتية في المجال الصحي', year: 2, semester: 2, department: 'قسم الطب الوقائي', credits: 2 },
    { title: 'أخلاقيات المهنة الطبية', description: 'المبادئ الأخلاقية في الممارسة الطبية', year: 1, semester: 1, department: 'قسم طب المجتمع', credits: 1 },
    { title: 'الطب الإبداعي', description: 'أساليب التفكير الإبداعي في حل المشكلات الطبية', year: 4, semester: 1, department: 'قسم التعليم الطبي', credits: 2 },
  ];

  for (const elective of electives) {
    await prisma.electiveCourse.create({ data: elective });
  }
  console.log('✅ Elective courses seeded');

  // Seed sample complaints
  const sampleComplaints = [
    {
      studentName: 'أحمد محمد',
      studentId: '2021001',
      issueType: 'أكاديمي',
      message: 'أحتاج إلى مساعدة في مادة التشريح العصبي',
      status: ComplaintStatus.PENDING,
    },
    {
      studentName: 'سارة أحمد',
      studentId: '2020034',
      issueType: 'إداري',
      message: 'مشكلة في جدول المحاضرات للفصل الدراسي الجديد',
      status: ComplaintStatus.IN_PROGRESS,
    },
  ];

  for (const complaint of sampleComplaints) {
    await prisma.studentComplaint.create({ data: complaint });
  }
  console.log('✅ Sample complaints seeded');

  console.log('🎉 Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
