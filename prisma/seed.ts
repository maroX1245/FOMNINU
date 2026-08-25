// FOMSCU Student Guide - Comprehensive Database Seed
// Developer: Mohamed Magdy - 5th Year Medical Student at FOMSCU
// Version: 2026-2031

import { PrismaClient, ComplaintStatus, ModuleType, ResourceType } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌟 Seeding FOMSCU Student Guide Database (2026-2031)...');

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
    {
      sectionKey: 'system_intro',
      sectionTitle: 'نظرة عامة على النظام',
      sectionContent: `نظام الدراسة في الكلية يعتمد على نظام الموديول (Module)
الوديول هو مجموعة مواد بتدرسها مع بعض في فترة زمنية محددة.
المواد في الموديول الواحد مترابطة وتخدم بعضها.
`,
      orderIndex: 4,
    },
    {
      sectionKey: 'compassion_policy',
      sectionTitle: 'سياسة الرأفة',
      sectionContent: `⚠️ معلومات مهمة عن الرأفة:

- الرأفة في الامتحان النظري: ❌ غير موجودة
- الرأفة في الامتحان العملي: ✅ موجودة

يعني لو جبت أقل من 40% في النظري (MCQ أو MEQ) هتسقط نظري حتى لو المجموع 60%.

ولو جبت في العملي أقل من الحد المطلوب، ممكن تاخد رأفة في الع marks.`,
      orderIndex: 5,
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

  // Seed Modules
  const modules = [
    {
      name: 'How to Learn',
      nameAr: 'كيف تتعلم',
      type: ModuleType.FOUNDATION,
      year: 1,
      semester: 1,
      duration: 'أسبوعين',
      subjects: ['Introduction to Medical Education', 'PBL System', 'Study Skills'],
      description: 'موديول تعريفي بسيط جداً بيعرّفك على الكلية ونظامها وطريقة التعلم. بتبدأ تتعلم إنك تمسك Case وتتناقش فيها مع زمايلك.',
      orderIndex: 1,
    },
    {
      name: 'Foundation 1',
      nameAr: 'فاونديشن 1',
      type: ModuleType.FOUNDATION,
      year: 1,
      semester: 1,
      duration: '7 أسابيع (6 دراسة + 1 امتحان)',
      subjects: ['Anatomy - علم التشريح', 'Biochemistry - الكيمياء الحيوية', 'Histology - علم الأنسجة', 'Genetics - علم الوراثة', 'Physiology - علم وظائف الأعضاء', 'Ethics - أخلاقيات المهنة'],
      description: 'هتتعرف على المواد الأساسية في الطب. مدته 6 أسابيع دراسة وأسبوع امتحانات.',
      orderIndex: 2,
    },
    {
      name: 'Foundation 2',
      nameAr: 'فاونديشن 2',
      type: ModuleType.FOUNDATION,
      year: 1,
      semester: 1,
      duration: '7 أسابيع (6 دراسة + 1 امتحان)',
      subjects: ['Anatomy - علم التشريح', 'Biochemistry - الكيمياء الحيوية', 'Histology - علم الأنسجة', 'Genetics - علم الوراثة', 'Physiology - علم وظائف الأعضاء', 'Parasitology - علم الطفيليات', 'Microbiology - علم الأحياء الدقيقة', 'Pharmacology - علم الأدوية', 'Pathology - علم الأمراض'],
      description: 'هتتعمق في المواد اللي خدتها في Foundation 1 وهيزيد معاك بقية المواد. مدته 7 أسابيع.',
      orderIndex: 3,
    },
    {
      name: 'Foundation 3',
      nameAr: 'فاونديشن 3',
      type: ModuleType.FOUNDATION,
      year: 1,
      semester: 2,
      duration: '9 أسابيع (8 دراسة + 1 امتحان)',
      subjects: ['Community Medicine - طب المجتمع', 'Research/Project - البحث العلمي', 'Pathology - علم الأمراض', 'Pharmacology - علم الأدوية', 'Microbiology - علم الأحياء الدقيقة', 'Physiology - علم وظائف الأعضاء', 'Anatomy - علم التشريح', 'Biochemistry - الكيمياء الحيوية', 'Histology - علم الأنسجة'],
      description: 'أول موديول هتدورس فيه 9 مواد مع بعض. محتاج تهتم بيه جداً ومتخبصش فيه.',
      orderIndex: 4,
    },
    {
      name: 'Musculoskeletal System',
      nameAr: 'الجهاز العضلي والعظمي',
      type: ModuleType.SYSTEMIC,
      year: 1,
      semester: 2,
      duration: '6 أسابيع (5 دراسة + 1 امتحان)',
      subjects: ['Anatomy - علم التشريح', 'Physiology - علم وظائف الأعضاء', 'Pathology - علم الأمراض', 'Pharmacology - علم الأدوية', 'Microbiology - علم الأحياء الدقيقة'],
      description: 'آخر موديول في السنة وأول موديول Systemic. المواد كلها مترابطة وبتتكلم في نفس الاتجاه. يعتبر من أسهل الموديولات.',
      orderIndex: 5,
    },
  ];

  for (const module of modules) {
    await prisma.module.create({ data: module });
  }
  console.log('✅ Modules seeded');

  // Seed Exam Types
  const examTypes = [
    {
      name: 'امتحان الميد موديول (MCQ 10%)',
      code: 'MCQ_MID',
      percentage: 10,
      description: 'امتحان بيكون في نص الموديول، عبارة عن أسئلة MCQ من محاضرات الاسبوع اللي فات.',
      hasCompassion: false,
      orderIndex: 1,
    },
    {
      name: 'امتحان OSPE العملي (40%)',
      code: 'OSPE',
      percentage: 40,
      description: 'امتحان عملي في المعامل. الدفعة بتتقسم على البينشات، كل بينش فيه سؤال أو سؤالين.',
      hasCompassion: true,
      orderIndex: 2,
    },
    {
      name: 'امتحان الفاينال MCQ (15%)',
      code: 'MCQ_FINAL',
      percentage: 15,
      description: 'امتحان MCQ في آخر الموديول، أسئلة من كل المحاضرات.',
      hasCompassion: false,
      orderIndex: 3,
    },
    {
      name: 'امتحان MEQ المقالي (15%)',
      code: 'MEQ',
      percentage: 15,
      description: 'امتحان مقالي في المدرجات، حوالي 10 أسئلة.',
      hasCompassion: false,
      orderIndex: 4,
    },
    {
      name: 'ملف الإنجاز / البورتفوليو (20%)',
      code: 'PORTFOLIO',
      percentage: 20,
      description: 'ملف إنجاز بتعمل فيه شوية حاجات وتسلمه في نهاية الموديول.',
      hasCompassion: false,
      orderIndex: 5,
    },
  ];

  for (const exam of examTypes) {
    await prisma.examType.create({ data: exam });
  }
  console.log('✅ Exam types seeded');

  // Seed Student Groups
  const groups = [
    {
      name: 'Group A',
      description: 'الدفعة الأولى - أسبوعك بيبدأ يوم الثلاثاء',
      startDay: 'الثلاثاء',
      orderIndex: 1,
    },
    {
      name: 'Group B',
      description: 'الدفعة الثانية - أسبوعك بيبدأ يوم الأربعاء',
      startDay: 'الأربعاء',
      orderIndex: 2,
    },
  ];

  for (const group of groups) {
    await prisma.studentGroup.create({ data: group });
  }
  console.log('✅ Student groups seeded');

  // Seed Attendance Rules
  const attendanceRules = [
    {
      activityType: 'practical',
      maxAbsence: 25,
      penalty: 'حرمان من دخول امتحان العملي + حرمان من السكاشن في الموديول',
      description: 'غياب العملي بيتحسب على السكاشن لوحدها. لو غبت أكثر من 5 سكاشن (25% من 20 سكاشن مثلاً) هتتحرم.',
    },
    {
      activityType: 'class',
      maxAbsence: 25,
      penalty: 'لم يحدد بعد - يتم الإبلاغ عن كل طالب يقترب من نسبة الغياب القصوى',
      description: 'غياب الكلاسات بيتحسب بيومين في الأسبوع. عدد الأسابيع = عدد أسابيع الموديول ما عدا أول وأخر أسبوع.',
    },
    {
      activityType: 'seminar',
      maxAbsence: 25,
      penalty: 'يحسب مع غياب الكلاسات',
      description: 'الندوة بيكون فيها غياب ومهمة جداً تحضرها.',
    },
    {
      activityType: 'skill_lab',
      maxAbsence: 25,
      penalty: 'لم يحدد - يتم الإبلاغ',
      description: 'غياب Skill Lab بيكون بالترم ككل مش بكل موديول.',
    },
  ];

  for (const rule of attendanceRules) {
    await prisma.attendanceRule.create({ data: rule });
  }
  console.log('✅ Attendance rules seeded');

  // Seed Study Resources
  const resources = [
    {
      name: 'محاضرات الكلية (PDF)',
      type: ResourceType.PDF,
      description: 'محاضرات الكلية PDF مع ريكورد المحاضرة المشروحة في الكلية.',
      isRecommended: true,
    },
    {
      name: 'قنوات الدفعات السابقة (Telegram)',
      type: ResourceType.TELEGRAM,
      description: 'من أكتر المصادر اللي هتفيدك - قنوات الدفعات الأكبر منك (2025, 2024, 2023...) Government و Al-Ahly. فيها Data في كل الموديولات وملخصات وأسئلة.',
      isRecommended: true,
    },
    {
      name: 'يوتيوب - دكاترة معتمدين',
      type: ResourceType.VIDEO,
      description: 'في دكاترة معينين فيهم ممتازين على اليوتيوب في مواد زي الإناتومي والهستو والفيسيو والفارما.',
      isRecommended: true,
    },
    {
      name: 'أدوات الذكاء الاصطناعي (ChatGPT, Claude, Gemini)',
      type: ResourceType.AI_TOOL,
      description: 'AI ممكن يساعدك في شرح المحاضرات والفهم. تمسك المحاضرة PDF وتخلي AI يشرحلك اللي انت عاوزه.',
      isRecommended: true,
    },
    {
      name: 'الملخصات القصيرة العينية',
      type: ResourceType.BOOK,
      description: 'خيار لكن مش أفضل - الاختيارات التانية كافية.',
      isRecommended: false,
    },
  ];

  for (const resource of resources) {
    await prisma.studyResource.create({ data: resource });
  }
  console.log('✅ Study resources seeded');

  // Seed Timeline Milestones
  const milestones = [
    { year: 2026, title: 'عامك الأول', description: 'بدايتك في كلية الطب - Foundation Modules', orderIndex: 1 },
    { year: 2027, title: 'الانتقال للسنة التانية', description: 'Systemic Modules - التدريب السريري المبدئي', orderIndex: 2 },
    { year: 2028, title: 'السنة التانية', description: 'Clinical Training - التدريب السريري', orderIndex: 3 },
    { year: 2029, title: 'السنة التالتة', description: 'Advanced Clinical Skills', orderIndex: 4 },
    { year: 2030, title: 'السنة الرابعة', description: 'Specialty Rotations', orderIndex: 5 },
    { year: 2031, title: 'التخرج', description: 'دكتور في الطب -Bachelor of Medicine, MBBS', orderIndex: 6 },
  ];

  for (const milestone of milestones) {
    await prisma.timelineMilestone.create({ data: milestone });
  }
  console.log('✅ Timeline milestones seeded');

  // Seed Program Phases
  const phases = [
    {
      phaseNumber: 1,
      title: 'سنة أولى - Foundation (المواد الأساسية)',
      description: `سنة أولى بتدرس فيها المواد الأساسية في الطب:

الفاونديشن 1: 6 مواد - 7 أسابيع
الفاونديشن 2: 9 مواد - 7 أسابيع  
الفاونديشن 3: 9 مواد + بحث علمي - 9 أسابيع
Musculoskeletal: 5 مواد - 6 أسابيع

كل موديول ليه امتحانه الخاص.`,
      duration: 'سنة واحدة',
      orderIndex: 1,
    },
    {
      phaseNumber: 2,
      title: 'سنة تانية - Systemic (الأنظمة)',
      description: `هتدرس الأنظمة المختلفة في الجسم:
Cardiovascular, Respiratory, GIT, Renal, Endocrine...

كل نظام فيه الموديول بتاعه مع المواد المرتبطة بيه.`,
      duration: 'سنة واحدة',
      orderIndex: 2,
    },
    {
      phaseNumber: 3,
      title: 'سنة ثالثة ورابعة - Clinical Training',
      description: `التدريب السريري في المستشفيات التعليمية:
طب باطنة، جراحة، أطفال، نساء وولادة، طوارئ...`,
      duration: 'سنتان',
      orderIndex: 3,
    },
  ];

  for (const phase of phases) {
    await prisma.programPhase.create({ data: phase });
  }
  console.log('✅ Program phases seeded');

  // Seed sample complaints
  const sampleComplaints = [
    {
      studentName: 'أحمد محمد',
      studentId: '2026034',
      issueType: 'أكاديمي',
      message: 'محتاج مساعدة في مادة التشريح - محاضرات كتير متفهمتهاش',
      status: ComplaintStatus.PENDING,
    },
    {
      studentName: 'سارة أحمد',
      studentId: '2026012',
      issueType: 'إداري',
      message: 'مشكلة في الجدول - فيه محاضرات متكررة',
      status: ComplaintStatus.IN_PROGRESS,
    },
  ];

  for (const complaint of sampleComplaints) {
    await prisma.studentComplaint.create({ data: complaint });
  }
  console.log('✅ Sample complaints seeded');

  console.log('🎉 Database seeding completed successfully!');
  console.log('');
  console.log('📚 ملخص البيانات المضافة:');
  console.log('   - 5 موديولات تفصيلية');
  console.log('   - 5 أنواع امتحانات مع النسب');
  console.log('   - 2 مجموعات (A و B)');
  console.log('   - 4 قواعد غياب');
  console.log('   - 5 مصادر دراسة');
  console.log('   - 6 محطات زمنية');
  console.log('   - 3 مراحل برنامج');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
