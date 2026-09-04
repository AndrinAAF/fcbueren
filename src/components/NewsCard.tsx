"use client";

import React, { useState } from 'react';

interface NewsCardProps {
  title: string;
  content: string;
  author: string;
  date: string;
  views: number;
  initialLikes: number;
}

export default function NewsCard({ title, content, author, date, views, initialLikes }: NewsCardProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isLiked) {
      setLikes(likes - 1);
      setIsLiked(false);
    } else {
      setLikes(likes + 1);
      setIsLiked(true);
    }
  };

  return (
    <a href="#" className="news-card animate-on-scroll">
      <div className="news-image">
        BILD
      </div>
      <div className="news-content">
        <div className="news-header">
          <span>{author || 'Redaktion'}</span>
          <span>{date}</span>
        </div>
        <div className="news-title">{title}</div>
        <div className="news-body">
          {content.length > 150 ? content.substring(0, 150) + '...' : content}
        </div>
        <div className="news-footer">
          <div className="news-stats">
            <span>{views} Ansichten</span>
            <span>0 Kommentare</span>
          </div>
          <div className="news-like" onClick={handleLike} style={{ cursor: 'pointer' }}>
            {likes}
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill={isLiked ? "var(--clr-primary)" : "none"} stroke={isLiked ? "var(--clr-primary)" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'fill 0.2s, stroke 0.2s' }}>
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </div>
        </div>
      </div>
    </a>
  );
}
