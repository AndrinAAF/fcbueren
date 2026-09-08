import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    const title = formData.get('title') as string;
    const author = formData.get('author') as string;
    const photographer = formData.get('photographer') as string;
    const content = formData.get('content') as string;
    const tags = formData.get('tags') as string;
    const images = formData.get('images') as string;
    const imageUrl = formData.get('imageUrl') as string;

    if (!title || !content) {
      return NextResponse.json({ success: false, message: 'Missing fields' }, { status: 400 });
    }

    const newId = crypto.randomUUID();
    
    await prisma.news.create({
      data: {
        id: newId,
        title,
        content,
        author: author || null,
        photographer: photographer || null,
        tags: tags || '[]',
        images: images || '[]',
        imageUrl: imageUrl || null
      }
    });

    revalidatePath('/admin/news');
    revalidatePath('/');
    revalidatePath('/news');

    return NextResponse.json({ success: true, news: { id: newId } });
  } catch (error) {
    console.error("Error creating news:", error);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    const id = formData.get('id') as string;
    const title = formData.get('title') as string;
    const author = formData.get('author') as string;
    const photographer = formData.get('photographer') as string;
    const content = formData.get('content') as string;
    const tags = formData.get('tags') as string;
    const images = formData.get('images') as string;
    const imageUrl = formData.get('imageUrl') as string;

    if (!id || !title || !content) {
      return NextResponse.json({ success: false, message: 'Missing fields' }, { status: 400 });
    }

    await prisma.news.update({
      where: { id },
      data: {
        title,
        content,
        author: author || null,
        photographer: photographer || null,
        tags: tags || '[]',
        images: images || '[]',
        imageUrl: imageUrl || null
      }
    });

    revalidatePath('/admin/news');
    revalidatePath(`/admin/news/${id}`);
    revalidatePath('/');
    revalidatePath('/news');
    revalidatePath(`/news/${id}`);

    return NextResponse.json({ success: true, news: { id } });
  } catch (error) {
    console.error("Error updating news:", error);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}
