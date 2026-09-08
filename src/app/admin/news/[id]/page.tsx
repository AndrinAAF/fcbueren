import prisma from '@/lib/prisma';
import NewsFormClient from '../NewsFormClient';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Beitrag Bearbeiten',
};

export default async function EditNewsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const newsItem = await prisma.news.findUnique({ where: { id } });
  const newsList = newsItem ? [newsItem] : [];

  if (!newsList || newsList.length === 0) {
    notFound();
  }

  const news = newsList[0];

  return <NewsFormClient initialData={news} />;
}
