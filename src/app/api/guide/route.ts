// Guide Content API Route
// Developer: Mohamed Magdy - 5th Year Medical Student at FOMNINU
// New Ismailia Al-Ahlieh University

import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET - Fetch all guide content
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sectionKey = searchParams.get('sectionKey');

    let content;
    
    if (sectionKey) {
      content = await prisma.guideContent.findUnique({
        where: { sectionKey },
      });
    } else {
      content = await prisma.guideContent.findMany({
        orderBy: { orderIndex: 'asc' },
      });
    }

    return NextResponse.json({ content });
  } catch (error) {
    console.error('Error fetching guide content:', error);
    return NextResponse.json(
      { error: 'فشل في جلب المحتوى' },
      { status: 500 }
    );
  }
}

// POST - Create or update guide content (Admin only)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { sectionKey, sectionTitle, sectionContent, orderIndex } = body;

    if (!sectionKey || !sectionTitle || !sectionContent) {
      return NextResponse.json(
        { error: 'جميع الحقول مطلوبة' },
        { status: 400 }
      );
    }

    const content = await prisma.guideContent.upsert({
      where: { sectionKey },
      update: { sectionTitle, sectionContent, orderIndex },
      create: { sectionKey, sectionTitle, sectionContent, orderIndex: orderIndex || 0 },
    });

    return NextResponse.json(
      { success: true, content },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error saving guide content:', error);
    return NextResponse.json(
      { error: 'فشل في حفظ المحتوى' },
      { status: 500 }
    );
  }
}
