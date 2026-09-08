import prisma from '@/lib/prisma';
import NewsListClient from './NewsListClient';

import { revalidatePath } from 'next/cache';

export const metadata = {
  title: 'News Verwalten',
};

export default async function AdminNewsPage() {
  const newsList = await prisma.$queryRaw<any[]>`
    SELECT id, title, author, tags, createdAt 
    FROM News 
    ORDER BY createdAt DESC
  `;

  async function deleteNews(formData: FormData) {
    'use server';
    const id = formData.get('id') as string;
    if (id) {
      await prisma.news.delete({ where: { id } });
      revalidatePath('/admin/news');
      revalidatePath('/');
      revalidatePath('/news');
    }
  }

  return (
    <NewsListClient initialNews={newsList} deleteAction={deleteNews} />
  );
}
