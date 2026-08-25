// Program Phases API Route
// Developer: Mohamed Magdy - 5th Year Medical Student at FOMNINU

import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET - Fetch all program phases
export async function GET() {
  try {
    const phases = await prisma.programPhase.findMany({
      orderBy: { orderIndex: 'asc' },
    });

    return NextResponse.json({ phases });
  } catch (error) {
    console.error('Error fetching phases:', error);
    return NextResponse.json(
      { error: 'فشل في جلب مراحل البرنامج' },
      { status: 500 }
    );
  }
}
