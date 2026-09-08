"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { getEventsPage } from '@/app/actions/events';

interface EventsSectionClientProps {
  initialEvents: any[];
  totalPages: number;
}

export default function EventsSectionClient({ initialEvents, totalPages }: EventsSectionClientProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [events, setEvents] = useState(initialEvents);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isJumping, setIsJumping] = useState(false);
  const [slideDirection, setSlideDirection] = useState(0);
  const [errorMsg, setErrorMsg] = useState('');
  const containerRef = React.useRef<HTMLDivElement>(null);

  const handlePageChange = async (newPage: number) => {
    if (newPage < 1 || newPage > totalPages || newPage === currentPage || isAnimating) return;
    
    setErrorMsg(''); 
    
    if (containerRef.current) {
      const y = containerRef.current.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }

    const direction = newPage > currentPage ? 1 : -1;
    setSlideDirection(direction);
    setIsAnimating(true);
    
    try {
      let fetchedPromise;
      if (newPage === 1) {
        fetchedPromise = Promise.resolve(JSON.parse(JSON.stringify(initialEvents)));
      } else {
        fetchedPromise = getEventsPage(newPage);
      }
      
      const [fetchedEvents] = await Promise.all([
        fetchedPromise,
        new Promise(resolve => setTimeout(resolve, 300))
      ]);
      
      const safeEvents = Array.isArray(fetchedEvents) ? fetchedEvents : [];
      
      if (safeEvents.length === 0) {
        setErrorMsg('Die Datenbank hat für diese Seite keine Veranstaltungen zurückgegeben.');
      }
      
      setEvents(safeEvents);
      setCurrentPage(newPage);
      
      setIsJumping(true);
      setSlideDirection(direction * -1);
      
      await new Promise(resolve => setTimeout(resolve, 30));
      
      setIsJumping(false);
      setIsAnimating(false);
      
      setTimeout(() => {
        setSlideDirection(0);
      }, 300);
      
    } catch (error: any) {
      console.error("Failed to fetch events page", error);
      setErrorMsg("Fehler beim Laden der Veranstaltungen: " + error?.message);
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
        className="events-grid"
        style={{ 
          opacity: isAnimating ? 0 : 1, 
          transform: isAnimating || isJumping ? (slideDirection === 1 ? 'translateX(-50px)' : (slideDirection === -1 ? 'translateX(50px)' : 'translateX(0)')) : 'translateX(0)',
          transition: isJumping ? 'none' : 'opacity 0.3s ease, transform 0.3s ease'
        }}
      >
        {events.length > 0 ? events.map((event, index) => (
          <div key={event.id} className="event-card animate-on-scroll" style={{ transitionDelay: `${index * 0.1}s` }}>
            <div className="event-image">
              {event.imageUrl ? (
                <img src={event.imageUrl} alt={event.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <span>FC BÜREN</span>
              )}
            </div>
            <div className="event-divider"></div>
            <div className="event-meta">
              <span>{new Date(event.date).toLocaleDateString('de-CH')}</span>
              <span>VEREINSEVENT</span>
            </div>
            <div className="event-divider"></div>
            <div className="event-body">
              <h3 className="event-title" style={{ textTransform: 'uppercase', fontStyle: 'normal', color: 'var(--clr-primary)', fontWeight: 'bold' }}>{event.title}</h3>
            </div>
            <div className="event-divider"></div>
            <div className="event-footer">
              <Link href={`/events/${event.id}`} className="btn">Erfahre hier mehr</Link>
            </div>
          </div>
        )) : (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '2rem', background: 'var(--clr-bg-alt)', borderRadius: '8px' }}>
            Aktuell sind keine speziellen Vereinsanlässe geplant.
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 0 && (
        <div className="pagination" style={{ marginTop: '3rem' }}>
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
