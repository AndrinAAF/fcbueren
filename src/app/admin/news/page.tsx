import prisma from '@/lib/prisma';
import NewsListClient from './NewsListClient';

export const metadata = {
  title: 'News Verwalten',
};

export default async function AdminNewsPage() {
  const newsList = await prisma.$queryRaw<any[]>`
    SELECT id, title, author, tags, createdAt 
    FROM News 
    ORDER BY createdAt DESC
  `;

  return (
    <NewsListClient initialNews={newsList} />
  );
}
