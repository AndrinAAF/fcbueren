"use server";

import prisma from '@/lib/prisma';

export async function getNewsPage(page: number) {
  const NEWS_PER_PAGE = 6;
  const skip = (page - 1) * NEWS_PER_PAGE;

  // Use raw SQL to bypass Prisma schema locks for recently added fields and subqueries
  const newsRaw = await prisma.$queryRaw<any[]>`
    SELECT n.*, (SELECT COUNT(*) FROM Comment c WHERE c.newsId = n.id) as commentCount
    FROM News n
    ORDER BY createdAt DESC
    LIMIT ${NEWS_PER_PAGE} OFFSET ${skip}
  `;
  
  const news = newsRaw.map(n => ({
    ...n,
    commentCount: Number(n.commentCount || 0)
  }));

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

export async function addComment(newsId: string, authorName: string, authorEmail: string | null, content: string, parentId: string | null = null) {
  try {
    const id = crypto.randomUUID();
    const now = new Date().toISOString();
    
    await prisma.$executeRaw`
      INSERT INTO Comment (id, newsId, authorName, authorEmail, content, likes, parentId, createdAt)
      VALUES (${id}, ${newsId}, ${authorName}, ${authorEmail}, ${content}, 0, ${parentId}, ${now})
    `;
    
    return { 
      success: true, 
      comment: {
        id,
        newsId,
        authorName,
        authorEmail,
        content,
        likes: 0,
        parentId,
        createdAt: now
      } 
    };
  } catch (error) {
    console.error('Failed to add comment:', error);
    return { success: false, error: 'Konnte den Kommentar nicht speichern.' };
  }
}

export async function getComments(newsId: string) {
  try {
    const comments = await prisma.$queryRaw<any[]>`
      SELECT * FROM Comment
      WHERE newsId = ${newsId}
      ORDER BY createdAt ASC
    `;
    return JSON.parse(JSON.stringify(comments));
  } catch (error) {
    console.error('Failed to fetch comments:', error);
    return [];
  }
}

export async function likeComment(commentId: string) {
  try {
    await prisma.$executeRaw`
      UPDATE Comment 
      SET likes = likes + 1 
      WHERE id = ${commentId}
    `;
    return { success: true };
  } catch (error) {
    console.error('Failed to like comment:', error);
    return { success: false };
  }
}

export async function likeNews(newsId: string) {
  try {
    await prisma.$executeRaw`
      UPDATE News 
      SET likes = likes + 1 
      WHERE id = ${newsId}
    `;
    return { success: true };
  } catch (error) {
    console.error('Failed to like news:', error);
    return { success: false };
  }
}

export async function unlikeComment(commentId: string) {
  try {
    await prisma.$executeRaw`
      UPDATE Comment 
      SET likes = CASE WHEN likes > 0 THEN likes - 1 ELSE 0 END
      WHERE id = ${commentId}
    `;
    return { success: true };
  } catch (error) {
    console.error('Failed to unlike comment:', error);
    return { success: false };
  }
}

export async function unlikeNews(newsId: string) {
  try {
    await prisma.$executeRaw`
      UPDATE News 
      SET likes = CASE WHEN likes > 0 THEN likes - 1 ELSE 0 END
      WHERE id = ${newsId}
    `;
    return { success: true };
  } catch (error) {
    console.error('Failed to unlike news:', error);
    return { success: false };
  }
}
