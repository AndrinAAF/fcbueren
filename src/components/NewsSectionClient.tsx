"use client";

import React, { useState, useEffect } from 'react';
import NewsCard from '@/components/NewsCard';
import { getNewsPage } from '@/app/actions/news';

interface NewsSectionClientProps {
  initialNews: any[];
  totalPages: number;
}

export default function NewsSectionClient({ initialNews, totalPages }: NewsSectionClientProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [news, setNews] = useState(initialNews);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isJumping, setIsJumping] = useState(false);
  const [slideDirection, setSlideDirection] = useState(0);
  const [errorMsg, setErrorMsg] = useState('');
  const containerRef = React.useRef<HTMLDivElement>(null);

  const handlePageChange = async (newPage: number) => {
    if (newPage < 1 || newPage > totalPages || newPage === currentPage || isAnimating) return;
    
    setErrorMsg(''); // clear previous errors
    
    // Scroll to the top of the news section so the user doesn't get lost
    if (containerRef.current) {
      const y = containerRef.current.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }

    // Determine direction for slide animation
    const direction = newPage > currentPage ? 1 : -1;
    setSlideDirection(direction);
    setIsAnimating(true);
    
    try {
      // Start fetching immediately
      let fetchedNewsPromise;
      if (newPage === 1) {
        fetchedNewsPromise = Promise.resolve(JSON.parse(JSON.stringify(initialNews)));
      } else {
        fetchedNewsPromise = getNewsPage(newPage);
      }
      
      // Wait for both fetch AND fade-out animation (300ms) to complete
      const [fetchedNews] = await Promise.all([
        fetchedNewsPromise,
        new Promise(resolve => setTimeout(resolve, 300))
      ]);
      
      // Ensure fetchedNews is always an array to prevent crashes
      const safeNews = Array.isArray(fetchedNews) ? fetchedNews : [];
      
      if (safeNews.length === 0) {
        setErrorMsg('Die Datenbank hat für diese Seite keine Beiträge zurückgegeben.');
      }
      
      // Swap data
      setNews(safeNews);
      setCurrentPage(newPage);
      
      // Disable transition and jump to the opposite side instantly
      setIsJumping(true);
      setSlideDirection(direction * -1);
      
      // Wait a tiny bit for the DOM to apply the jump without animation
      await new Promise(resolve => setTimeout(resolve, 30));
      
      // Re-enable transition and animate in to center
      setIsJumping(false);
      setIsAnimating(false);
      
      // After it slides in, reset the baseline transform
      setTimeout(() => {
        setSlideDirection(0);
      }, 300);
      
    } catch (error: any) {
      console.error("Failed to fetch news page", error);
      setErrorMsg("Fehler beim Laden der News: " + error?.message);
      setIsAnimating(false);
      setIsJumping(false);
      setSlideDirection(0);
    }
  };

  return (
    <div ref={containerRef}>
      {errorMsg && (
        <div style={{ backgroundColor: '#fee2e2', color: '#991b1b', padding: '1rem', borderRadius: '8px', marginBottom: '1rem', textAlign: 'center' }}>
          {errorMsg}
        </div>
      )}
      <div 
        className="news-section"
        style={{ 
          opacity: isAnimating ? 0 : 1, 
          transform: isAnimating || isJumping ? (slideDirection === 1 ? 'translateX(-50px)' : (slideDirection === -1 ? 'translateX(50px)' : 'translateX(0)')) : 'translateX(0)',
          transition: isJumping ? 'none' : 'opacity 0.3s ease, transform 0.3s ease'
        }}
      >
        {news && news.length > 0 ? news.map((item: any) => {
          let dateStr = '';
          try {
            dateStr = item.createdAt ? new Date(item.createdAt).toLocaleDateString('de-CH', { day: '2-digit', month: '2-digit', year: 'numeric' }) : '';
          } catch (e) { dateStr = 'Ungültiges Datum'; }
          
          return (
            <NewsCard 
              key={item.id} 
              id={item.id}
              title={item.title || 'Ohne Titel'}
              content={item.content || ''}
              author={item.author || 'Redaktion'}
              date={dateStr}
              views={item.views || 0}
              initialLikes={item.likes || 0}
              imageUrl={item.imageUrl}
            />
          );
        }) : (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '2rem', background: 'var(--clr-bg-alt)', borderRadius: '8px' }}>
            Aktuell gibt es keine News.
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 0 && (
        <div className="pagination">
          <button 
            onClick={(e) => { e.preventDefault(); handlePageChange(1); }} 
            className="page-nav" 
            disabled={currentPage <= 1}
            style={{ opacity: currentPage <= 1 ? 0.5 : 1, cursor: currentPage <= 1 ? 'default' : 'pointer' }}
          >
            &laquo;
          </button>
          
          <button 
            onClick={(e) => { e.preventDefault(); handlePageChange(currentPage - 1); }} 
            className="page-nav" 
            disabled={currentPage <= 1}
            style={{ opacity: currentPage <= 1 ? 0.5 : 1, cursor: currentPage <= 1 ? 'default' : 'pointer' }}
          >
            &lsaquo;
          </button>
          
          {Array.from({ length: totalPages }).map((_, i) => (
            <button 
              key={i} 
              onClick={(e) => { e.preventDefault(); handlePageChange(i + 1); }}
              className={`page-num ${i + 1 === currentPage ? 'active' : ''}`}
            >
              {i + 1}
            </button>
          ))}
          
          <button 
            onClick={(e) => { e.preventDefault(); handlePageChange(currentPage + 1); }} 
            className="page-nav" 
            disabled={currentPage >= totalPages}
            style={{ opacity: currentPage >= totalPages ? 0.5 : 1, cursor: currentPage >= totalPages ? 'default' : 'pointer' }}
          >
            &rsaquo;
          </button>
          
          <button 
            onClick={(e) => { e.preventDefault(); handlePageChange(totalPages); }} 
            className="page-nav" 
            disabled={currentPage >= totalPages}
            style={{ opacity: currentPage >= totalPages ? 0.5 : 1, cursor: currentPage >= totalPages ? 'default' : 'pointer' }}
          >
            &raquo;
          </button>
        </div>
      )}
    </div>
  );
}
