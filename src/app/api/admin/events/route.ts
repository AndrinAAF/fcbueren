import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    const title = formData.get('title') as string;
    const dateStr = formData.get('date') as string;
    const description = formData.get('description') as string;
    const content = formData.get('content') as string;
    const address = formData.get('address') as string;
    const imageUrl = formData.get('imageUrl') as string;
    const linkUrl = formData.get('linkUrl') as string;

    if (!title || !dateStr) {
      return NextResponse.json({ success: false, message: 'Missing fields' }, { status: 400 });
    }

    const newId = crypto.randomUUID();
    const dateStrIso = new Date(dateStr).toISOString();
    
    await prisma.$executeRaw`
      INSERT INTO Event (id, title, date, description, content, address, imageUrl, linkUrl, createdAt, updatedAt)
      VALUES (${newId}, ${title}, ${dateStrIso}, ${description || null}, ${content || ''}, ${address || null}, ${imageUrl || null}, ${linkUrl || null}, datetime('now'), datetime('now'))
    `;

    revalidatePath('/admin/events');
    revalidatePath('/');
    revalidatePath('/events');

    return NextResponse.json({ success: true, event: { id: newId } });
  } catch (error) {
    console.error("Error creating event:", error);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    const id = formData.get('id') as string;
    const title = formData.get('title') as string;
    const dateStr = formData.get('date') as string;
    const description = formData.get('description') as string;
    const content = formData.get('content') as string;
    const address = formData.get('address') as string;
    const imageUrl = formData.get('imageUrl') as string;
    const linkUrl = formData.get('linkUrl') as string;

    if (!id || !title || !dateStr) {
      return NextResponse.json({ success: false, message: 'Missing fields' }, { status: 400 });
    }
    
    const dateStrIso = new Date(dateStr).toISOString();

    await prisma.$executeRaw`
      UPDATE Event 
      SET title = ${title}, date = ${dateStrIso}, description = ${description || null}, content = ${content || ''}, address = ${address || null}, imageUrl = ${imageUrl || null}, linkUrl = ${linkUrl || null}, updatedAt = datetime('now')
      WHERE id = ${id}
    `;

    revalidatePath('/admin/events');
    revalidatePath(`/admin/events/${id}`);
    revalidatePath('/');
    revalidatePath('/events');
    revalidatePath(`/events/${id}`);

    return NextResponse.json({ success: true, event: { id } });
  } catch (error) {
    console.error("Error updating event:", error);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}
