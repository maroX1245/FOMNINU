// Complaint Detail API Route
// Developer: Mohamed Magdy - 5th Year Medical Student at FOMNINU

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import prisma from '@/lib/prisma';
import { authOptions } from '@/lib/auth';

interface RouteParams {
  params: { id: string };
}

// GET - Fetch single complaint
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { error: 'غير مصرح' },
        { status: 401 }
      );
    }

    const complaint = await prisma.studentComplaint.findUnique({
      where: { id: params.id },
    });

    if (!complaint) {
      return NextResponse.json(
        { error: 'الشكوى غير موجودة' },
        { status: 404 }
      );
    }

    return NextResponse.json({ complaint });
  } catch (error) {
    console.error('Error fetching complaint:', error);
    return NextResponse.json(
      { error: 'فشل في جلب الشكوى' },
      { status: 500 }
    );
  }
}

// PATCH - Update complaint status/reply
export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { error: 'غير مصرح' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { status, adminReply } = body;

    const complaint = await prisma.studentComplaint.update({
      where: { id: params.id },
      data: {
        ...(status && { status }),
        ...(adminReply !== undefined && { adminReply }),
      },
    });

    return NextResponse.json({ success: true, complaint });
  } catch (error) {
    console.error('Error updating complaint:', error);
    return NextResponse.json(
      { error: 'فشل في تحديث الشكوى' },
      { status: 500 }
    );
  }
}

// DELETE - Delete complaint
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { error: 'غير مصرح' },
        { status: 401 }
      );
    }

    await prisma.studentComplaint.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting complaint:', error);
    return NextResponse.json(
      { error: 'فشل في حذف الشكوى' },
      { status: 500 }
    );
  }
}
