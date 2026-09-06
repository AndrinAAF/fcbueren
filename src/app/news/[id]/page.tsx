import React from 'react';
import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import { incrementViews } from '@/app/actions/news';
import Link from 'next/link';

export default async function NewsDetailPage({ params }: { params: Promise<{ id: string }> }) {
  // Await the params since Next.js 15+ has asynchronous params
  const { id } = await params;
  
  // Use raw SQL to fetch the specific news item to bypass Prisma schema locks
  const newsItems = await prisma.$queryRaw<any[]>`
    SELECT * FROM News
    WHERE id = ${id}
    LIMIT 1
  `;
  
  if (!newsItems || newsItems.length === 0) {
    notFound();
  }
  
  const news = newsItems[0];
  
  // Increment views
  await incrementViews(id);
  
  // Parse tags if possible
  let tags: string[] = [];
  try {
    if (news.tags) {
      tags = JSON.parse(news.tags);
    }
  } catch (e) {
    // Ignore parse error
  }
  
  // Format date
  let dateStr = '';
  try {
    dateStr = news.createdAt ? new Date(news.createdAt).toLocaleDateString('de-CH', { day: '2-digit', month: '2-digit', year: 'numeric' }) : '';
  } catch (e) {
    dateStr = '';
  }

  return (
    <>
      {/* Back button and Meta */}
      <section className="container py-sm">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--clr-text-muted)', textDecoration: 'none', fontWeight: 600 }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Zurück zur Übersicht
          </Link>
          <div style={{ display: 'flex', gap: '1rem', color: 'var(--clr-text-muted)', fontSize: '0.9rem' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
              {news.views + 1}
            </span>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="container py-xl" style={{ maxWidth: '1200px', margin: '0 auto', paddingTop: '2rem' }}>
        <div style={{ 
          backgroundColor: 'var(--clr-surface)', 
          padding: '2.5rem', 
          borderRadius: '12px', 
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          marginBottom: '2rem' 
        }}>
          {tags.length > 0 && (
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
              {tags.map((tag, idx) => (
                <span key={idx} style={{ padding: '0.25rem 0.75rem', backgroundColor: 'var(--clr-primary)', color: 'white', fontSize: '0.75rem', borderRadius: '100px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {tag}
                </span>
              ))}
            </div>
          )}
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 1.1, marginBottom: '1rem', color: 'var(--clr-primary)', wordBreak: 'break-word', overflowWrap: 'anywhere' }}>
            {news.title}
          </h1>
          
          <div style={{ display: 'flex', gap: '1rem', color: 'var(--clr-text-muted)', fontSize: '0.9rem', marginBottom: '2rem' }}>
            <span style={{ fontWeight: 600, color: 'var(--clr-text)' }}>{news.author || 'FC Büren Redaktion'}</span>
            <span>•</span>
            <span>{dateStr}</span>
          </div>
          
          <style dangerouslySetInnerHTML={{ __html: `
            .rich-text-content div[data-breakout] {
              padding-inline: 0 !important;
            }
            .rich-text-content div {
              padding-inline: 0 !important;
            }
          `}} />
          
          <div 
            className="rich-text-content"
            style={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'var(--clr-text)', wordBreak: 'break-word', overflowWrap: 'anywhere' }}
            dangerouslySetInnerHTML={{ __html: news.content }}
          />
        </div>
        
        {/* Footer actions could go here (e.g. share buttons, like button) */}
        <div style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid var(--clr-border)', display: 'flex', justifyContent: 'center' }}>
          <Link href="/" className="btn btn-primary" style={{ textDecoration: 'none' }}>
            Weitere News lesen
          </Link>
        </div>
      </section>
    </>
  );
}
