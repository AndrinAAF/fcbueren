import prisma from '@/lib/prisma';
import NewsFormClient from '../NewsFormClient';
import { notFound } from 'next/navigation';

export const metadata = {
  title: 'Beitrag Bearbeiten',
};

export default async function EditNewsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const newsList = await prisma.$queryRaw<any[]>`
    SELECT id, title, content, author, photographer, tags, images, imageUrl, createdAt
    FROM News 
    WHERE id = ${id}
    LIMIT 1
  `;

  if (!newsList || newsList.length === 0) {
    notFound();
  }

  const news = newsList[0];

  return <NewsFormClient initialData={news} />;
}
