"use server";

import prisma from '@/lib/prisma';

export async function getNewsPage(page: number) {
  const NEWS_PER_PAGE = 6;
  const skip = (page - 1) * NEWS_PER_PAGE;

  const newsRaw = await prisma.news.findMany({
    orderBy: { createdAt: 'desc' },
    take: NEWS_PER_PAGE,
    skip: skip,
    include: {
      _count: { select: { comments: true } }
    }
  });
  
  const news = newsRaw.map(n => ({
    ...n,
    commentCount: n._count?.comments || 0
  }));

  // Serialize Date objects and ensure plain JSON
  return JSON.parse(JSON.stringify(news));
}

export async function incrementViews(id: string) {
  try {
    await prisma.news.update({
      where: { id },
      data: { views: { increment: 1 } }
    });
    return true;
  } catch (error) {
    console.error('Failed to increment views:', error);
    return false;
  }
}

export async function addComment(newsId: string, authorName: string, authorEmail: string | null, content: string, parentId: string | null = null) {
  try {
    const id = crypto.randomUUID();
    const now = new Date();
    
    const comment = await prisma.comment.create({
      data: {
        id,
        newsId,
        authorName,
        authorEmail,
        content,
        likes: 0,
        parentId,
        createdAt: now
      }
    });
    
    return { 
      success: true, 
      comment: {
        ...comment,
        createdAt: comment.createdAt.toISOString()
      } 
    };
  } catch (error) {
    console.error('Failed to add comment:', error);
    return { success: false, error: 'Konnte den Kommentar nicht speichern.' };
  }
}

export async function getComments(newsId: string) {
  try {
    const comments = await prisma.comment.findMany({
      where: { newsId },
      orderBy: { createdAt: 'asc' }
    });
    return JSON.parse(JSON.stringify(comments));
  } catch (error) {
    console.error('Failed to fetch comments:', error);
    return [];
  }
}

export async function likeComment(commentId: string) {
  try {
    await prisma.comment.update({
      where: { id: commentId },
      data: { likes: { increment: 1 } }
    });
    return { success: true };
  } catch (error) {
    console.error('Failed to like comment:', error);
    return { success: false };
  }
}

export async function likeNews(newsId: string) {
  try {
    await prisma.news.update({
      where: { id: newsId },
      data: { likes: { increment: 1 } }
    });
    return { success: true };
  } catch (error) {
    console.error('Failed to like news:', error);
    return { success: false };
  }
}

export async function unlikeComment(commentId: string) {
  try {
    await prisma.$executeRaw`
      UPDATE "Comment" 
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
      UPDATE "News" 
      SET likes = CASE WHEN likes > 0 THEN likes - 1 ELSE 0 END
      WHERE id = ${newsId}
    `;
    return { success: true };
  } catch (error) {
    console.error('Failed to unlike news:', error);
    return { success: false };
  }
}
