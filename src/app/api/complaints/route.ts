// Student Complaints API Route
// Developer: Mohamed Magdy - 5th Year Medical Student at FOMSCU

import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET - Fetch all complaints (Admin only)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    const where = status ? { status: status as any } : {};

    const [complaints, total] = await Promise.all([
      prisma.studentComplaint.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.studentComplaint.count({ where }),
    ]);

    return NextResponse.json({
      complaints,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching complaints:', error);
    return NextResponse.json(
      { error: 'فشل في جلب الشكاوى' },
      { status: 500 }
    );
  }
}

// POST - Submit new complaint
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { studentName, studentId, issueType, message } = body;

    // Validation
    if (!studentName || !studentId || !issueType || !message) {
      return NextResponse.json(
        { error: 'جميع الحقول مطلوبة' },
        { status: 400 }
      );
    }

    if (message.length < 10) {
      return NextResponse.json(
        { error: 'يجب أن يكون نص الشكوى ١٠ أحرف على الأقل' },
        { status: 400 }
      );
    }

    const complaint = await prisma.studentComplaint.create({
      data: {
        studentName,
        studentId,
        issueType,
        message,
      },
    });

    return NextResponse.json(
      { 
        success: true, 
        message: 'تم إرسال شكواك بنجاح',
        complaint 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating complaint:', error);
    return NextResponse.json(
      { error: 'فشل في إرسال الشكوى' },
      { status: 500 }
    );
  }
}
