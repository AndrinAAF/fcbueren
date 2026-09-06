"use server";

import prisma from '@/lib/prisma';

export async function getNewsPage(page: number) {
  const NEWS_PER_PAGE = 6;
  const skip = (page - 1) * NEWS_PER_PAGE;

  // Use raw SQL to bypass Prisma schema locks for recently added fields
  const news = await prisma.$queryRaw`
    SELECT * FROM News
    ORDER BY createdAt DESC
    LIMIT ${NEWS_PER_PAGE} OFFSET ${skip}
  `;

  // Serialize Date objects and ensure plain JSON
  return JSON.parse(JSON.stringify(news));
}

export async function incrementViews(id: string) {
  try {
    await prisma.$executeRaw`
      UPDATE News 
      SET views = views + 1 
      WHERE id = ${id}
    `;
    return true;
  } catch (error) {
    console.error('Failed to increment views:', error);
    return false;
  }
}
