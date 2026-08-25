// Timeline Milestones API Route
// Developer: Mohamed Magdy - 5th Year Medical Student at FOMNINU

import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET - Fetch all timeline milestones
export async function GET() {
  try {
    const milestones = await prisma.timelineMilestone.findMany({
      orderBy: { year: 'asc' },
    });

    return NextResponse.json({ milestones });
  } catch (error) {
    console.error('Error fetching milestones:', error);
    return NextResponse.json(
      { error: 'فشل في جلب محطات الزمن' },
      { status: 500 }
    );
  }
}
