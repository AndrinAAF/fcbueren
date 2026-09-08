"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { likeNews, unlikeNews } from '@/app/actions/news';

interface NewsCardProps {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  views: number;
  initialLikes: number;
  imageUrl?: string | null;
  commentCount: number;
}

export default function NewsCard({ id, title, content, author, date, views, initialLikes, imageUrl, commentCount }: NewsCardProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(false);
  
  useEffect(() => {
    // Check local storage on mount
    const liked = localStorage.getItem(`liked_news_${id}`);
    if (liked) {
      setIsLiked(true);
    }
  }, [id]);

  const handleLike = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (isLiked) {
      // Optimistic update for unlike
      setLikes(prev => prev > 0 ? prev - 1 : 0);
      setIsLiked(false);
      localStorage.removeItem(`liked_news_${id}`);
      // Server action
      await unlikeNews(id);
    } else {
      // Optimistic update for like
      setLikes(prev => prev + 1);
      setIsLiked(true);
      localStorage.setItem(`liked_news_${id}`, 'true');
      // Server action
      await likeNews(id);
    }
  };

  return (
    <Link href={`/news/${id}`} className="news-card">
      <div className="news-image">
        {imageUrl ? (
          <img src={imageUrl} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <div style={{ width: '100%', height: '100%', backgroundColor: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#999' }}>
            Kein Bild
          </div>
        )}
      </div>
      <div className="news-content">
        <div className="news-header">
          <span>{author || 'Redaktion'}</span>
          <span suppressHydrationWarning>{date}</span>
        </div>
        <div className="news-title" style={{ wordBreak: 'break-word', overflowWrap: 'anywhere' }}>{title}</div>
        <div className="news-body" style={{ wordBreak: 'break-word', overflowWrap: 'anywhere' }}>
          {content.replace(/<[^>]+>/g, '').length > 150 ? content.replace(/<[^>]+>/g, '').substring(0, 150) + '...' : content.replace(/<[^>]+>/g, '')}
        </div>
        <div className="news-footer">
          <div className="news-stats">
            <span>{views} Ansichten</span>
            <span>{commentCount} Kommentare</span>
          </div>
          <div className="news-like" onClick={handleLike} style={{ cursor: isLiked ? 'default' : 'pointer' }}>
            {likes}
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill={isLiked ? "var(--clr-primary)" : "none"} stroke={isLiked ? "var(--clr-primary)" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'fill 0.2s, stroke 0.2s' }}>
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}
