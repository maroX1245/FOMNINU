// Elective Courses API Route
// Developer: Mohamed Magdy - 5th Year Medical Student at FOMSCU

import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET - Fetch all elective courses
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const year = searchParams.get('year');
    const department = searchParams.get('department');

    const where: any = { isActive: true };
    
    if (year) {
      where.year = parseInt(year);
    }
    if (department) {
      where.department = department;
    }

    const electives = await prisma.electiveCourse.findMany({
      where,
      orderBy: [{ year: 'asc' }, { semester: 'asc' }],
    });

    return NextResponse.json({ electives });
  } catch (error) {
    console.error('Error fetching electives:', error);
    return NextResponse.json(
      { error: 'فشل في جلب المقررات الاختيارية' },
      { status: 500 }
    );
  }
}

// POST - Create new elective course (Admin only)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, year, semester, department, credits } = body;

    if (!title || !description || !year || !semester) {
      return NextResponse.json(
        { error: 'جميع الحقول مطلوبة' },
        { status: 400 }
      );
    }

    const elective = await prisma.electiveCourse.create({
      data: {
        title,
        description,
        year,
        semester,
        department,
        credits: credits || 2,
      },
    });

    return NextResponse.json(
      { success: true, elective },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating elective:', error);
    return NextResponse.json(
      { error: 'فشل في إضافة المقرر الاختياري' },
      { status: 500 }
    );
  }
}
