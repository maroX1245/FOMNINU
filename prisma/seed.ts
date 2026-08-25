// FOMNINU Student Guide - Database Seed Script
// Developer: Mohamed Magdy - 5th Year Medical Student at FOMNINU
// New Ismailia Al-Ahlieh University (FOMNINU)

import { PrismaClient, ComplaintStatus, ModuleType, ResourceType } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding FOMNINU Student Guide database...');

  // ─────────────────────────────────────────────
  // 1. Admin user (credentials from environment)
  // ─────────────────────────────────────────────
  const adminUsername = process.env.ADMIN_USERNAME ?? 'admin';
  const adminPassword = process.env.ADMIN_PASSWORD ?? 'admin123';
  const passwordHash = await bcrypt.hash(adminPassword, 12);

  const admin = await prisma.admin.upsert({
    where: { username: adminUsername },
    update: { passwordHash },
    create: {
      username: adminUsername,
      name: 'Mohamed Magdy',
      passwordHash,
    },
  });
  console.log(`✅ Admin user ready: ${admin.username}`);

  // ─────────────────────────────────────────────
  // 2. Academic modules (FOMNINU integrated program)
  // ─────────────────────────────────────────────
  const modules = [
    {
      title: 'How to Learn - كيف تتعلم',
      description: 'موديول تمهيدي لتعلم مهارات التعلم الذاتي والتعلم القائم على حل المشكلات',
      type: ModuleType.SYSTEM,
      orderIndex: 1,
      durationWeeks: 2,
    },
    {
      title: 'Foundation 1 - التأسيس ١',
      description: '٧ أسابيع - ٦ مواد أساسية للعلوم الطبية',
      type: ModuleType.SYSTEM,
      orderIndex: 2,
      durationWeeks: 7,
    },
    {
      title: 'Foundation 2 - التأسيس ٢',
      description: '٧ أسابيع - ٩ مواد أساسية للعلوم الطبية',
      type: ModuleType.SYSTEM,
      orderIndex: 3,
      durationWeeks: 7,
    },
    {
      title: 'Foundation 3 - التأسيس ٣',
      description: '٩ أسابيع - ٩ مواد أساسية + البحث العلمي',
      type: ModuleType.SYSTEM,
      orderIndex: 4,
      durationWeeks: 9,
    },
    {
      title: 'Musculoskeletal - الجهاز العضلي الهيكلي',
      description: '٦ أسابيع - موديول جهازي متكامل',
      type: ModuleType.SYSTEM,
      orderIndex: 5,
      durationWeeks: 6,
    },
  ];

  // Idempotent: rebuild the module catalog on every seed
  await prisma.resource.deleteMany({});
  await prisma.module.deleteMany({});

  const createdModules = [];
  for (const moduleData of modules) {
    const created = await prisma.module.create({ data: moduleData });
    createdModules.push(created);
  }
  console.log(`✅ Created ${createdModules.length} modules`);

  // ─────────────────────────────────────────────
  // 3. Learning resources per module
  // ─────────────────────────────────────────────
  const foundation1 = createdModules[1];
  const musculoskeletal = createdModules[4];

  await prisma.resource.createMany({
    data: [
      {
        title: 'محاضرات التشريح الأساسي',
        type: ResourceType.LECTURE,
        moduleId: foundation1.id,
      },
      {
        title: 'معمل الهيستولوجي',
        type: ResourceType.LAB,
        moduleId: foundation1.id,
      },
      {
        title: 'مهارات الفحص السريري للعظام والمفاصل',
        type: ResourceType.CLINICAL_SKILL,
        moduleId: musculoskeletal.id,
      },
      {
        title: 'معمل التشريح - Upper Limb',
        type: ResourceType.LAB,
        moduleId: musculoskeletal.id,
      },
    ],
  });
  console.log('✅ Created learning resources');

  // ─────────────────────────────────────────────
  // 4. Sample complaint (optional demo data)
  // ─────────────────────────────────────────────
  const existingComplaints = await prisma.complaint.count();
  if (existingComplaints === 0) {
    await prisma.complaint.create({
      data: {
        studentName: 'طالب تجريبي',
        studentId: '2026001',
        issueType: 'academic',
        message: 'شكوى تجريبية للتأكد من عمل نظام الشكاوى بشكل صحيح.',
        status: ComplaintStatus.PENDING,
      },
    });
    console.log('✅ Created sample complaint');
  }

  console.log('🎉 Seeding completed successfully!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error('❌ Seeding failed:', error);
    await prisma.$disconnect();
    process.exit(1);
  });
