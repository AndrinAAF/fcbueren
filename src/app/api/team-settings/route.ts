import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { teamSlug, imageUrl } = body;

    if (!teamSlug || !imageUrl) {
      return NextResponse.json({ error: 'Fehlende Parameter' }, { status: 400 });
    }

    await prisma.teamSettings.upsert({
      where: { teamSlug },
      update: { imageUrl },
      create: {
        teamSlug,
        imageUrl
      }
    });

    return NextResponse.json({ success: true, message: 'Gespeichert' });
  } catch (error: any) {
    console.error('Error saving team settings:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
