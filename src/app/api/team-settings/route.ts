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

    // Workaround for locked Prisma Client generation: Use raw queries.
    // Check if it exists
    const existing: any[] = await prisma.$queryRaw`SELECT * FROM TeamSettings WHERE teamSlug = ${teamSlug} LIMIT 1`;
    
    if (existing.length > 0) {
      // Update
      await prisma.$executeRaw`UPDATE TeamSettings SET imageUrl = ${imageUrl}, updatedAt = ${new Date().toISOString()} WHERE teamSlug = ${teamSlug}`;
    } else {
      // Insert
      const id = crypto.randomUUID();
      await prisma.$executeRaw`INSERT INTO TeamSettings (id, teamSlug, imageUrl, updatedAt) VALUES (${id}, ${teamSlug}, ${imageUrl}, ${new Date().toISOString()})`;
    }

    return NextResponse.json({ success: true, message: 'Gespeichert' });
  } catch (error: any) {
    console.error('Error saving team settings:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
