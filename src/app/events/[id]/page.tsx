import React from 'react';
import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import Link from 'next/link';
import ScrollObserver from '@/components/ScrollObserver';

export const dynamic = 'force-dynamic';

export default async function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const eventRaw = await prisma.$queryRaw<any[]>`
    SELECT id, title, date, description, content, address, imageUrl, linkUrl, createdAt
    FROM Event 
    WHERE id = ${id}
    LIMIT 1
  `;

  if (!eventRaw || eventRaw.length === 0) {
    notFound();
  }

  const event = eventRaw[0];

  let dateStr = '';
  try {
    dateStr = event.date ? new Date(event.date).toLocaleDateString('de-CH', { day: '2-digit', month: '2-digit', year: 'numeric' }) : '';
  } catch (e) {
    dateStr = '';
  }

  return (
    <>
      <ScrollObserver />
      
      {/* Back button */}
      <section className="container py-sm" style={{ paddingTop: '3rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <Link href="/#events" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--clr-text-muted)', textDecoration: 'none', fontWeight: 600 }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Zurück zu Veranstaltungen
          </Link>
        </div>
      </section>



      {/* Article Content */}
      <section className="container py-xl" style={{ maxWidth: '1200px', margin: '0 auto', paddingTop: '2rem', position: 'relative', zIndex: 10 }}>
        <div className="admin-dark-card animate-on-scroll" style={{ padding: '3rem', backgroundColor: 'var(--clr-surface)', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', marginBottom: '3rem' }}>
          
          {/* Title Image (now inside the card) */}
          {event.imageUrl && (
            <div style={{ width: '100%', height: '40vh', minHeight: '300px', position: 'relative', overflow: 'hidden', borderRadius: '8px', marginBottom: '2rem' }}>
              <img 
                src={event.imageUrl} 
                alt={event.title} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
            </div>
          )}

          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 1.1, marginBottom: '1rem', color: 'var(--clr-primary)', wordBreak: 'break-word', overflowWrap: 'anywhere' }}>
            {event.title}
          </h1>
          
          <div style={{ display: 'flex', gap: '1rem', color: 'var(--clr-text-muted)', fontSize: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, color: 'var(--clr-text)' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
              {dateStr}
            </span>
            {event.address && (
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                {event.address}
              </span>
            )}
            {event.linkUrl && (
              <a href={event.linkUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--clr-primary)', textDecoration: 'none' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                Weitere Infos
              </a>
            )}
          </div>
          
          <style dangerouslySetInnerHTML={{ __html: `
            .rich-text-content div[data-breakout] {
              padding-inline: 0 !important;
            }
            .rich-text-content div {
              padding-inline: 0 !important;
            }
            .rich-text-content h1, 
            .rich-text-content h2, 
            .rich-text-content h3, 
            .rich-text-content h4, 
            .rich-text-content h5, 
            .rich-text-content h6 {
              color: var(--clr-text) !important;
            }
          `}} />
          
          {event.content && (
            <div 
              className="rich-text-content"
              style={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'var(--clr-text)', wordBreak: 'break-word', overflowWrap: 'anywhere' }}
              dangerouslySetInnerHTML={{ __html: event.content }}
            />
          )}

          {!event.content && event.description && (
            <p style={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'var(--clr-text)' }}>{event.description}</p>
          )}
          
          {/* Google Maps Embed */}
          {event.address && (
            <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid var(--clr-border)' }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--clr-text)' }}>Standort</h3>
              <div style={{ width: '100%', height: '400px', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
                <iframe
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  src={`https://www.google.com/maps?q=${encodeURIComponent(event.address)}&output=embed`}
                ></iframe>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
