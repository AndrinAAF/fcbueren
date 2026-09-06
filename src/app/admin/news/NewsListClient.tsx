"use client";

import React, { useState } from 'react';
import Link from 'next/link';

interface NewsItem {
  id: string;
  title: string;
  author: string | null;
  tags: string;
  createdAt: Date;
}

interface NewsListClientProps {
  initialNews: NewsItem[];
}

export default function NewsListClient({ initialNews }: NewsListClientProps) {
  const [filterTitle, setFilterTitle] = useState('');
  const [filterAuthor, setFilterAuthor] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [filterTags, setFilterTags] = useState('');

  const filteredNews = initialNews.filter((news) => {
    const matchTitle = filterTitle === '' || news.title.toLowerCase().includes(filterTitle.toLowerCase());
    const matchAuthor = filterAuthor === '' || (news.author && news.author.toLowerCase().includes(filterAuthor.toLowerCase()));
    
    // Convert to Date string for matching 'YYYY-MM-DD' if user types that, or just locale string
    const dateStr = new Date(news.createdAt).toLocaleDateString('de-CH');
    const matchDate = filterDate === '' || dateStr.includes(filterDate);

    // Tags is a JSON string of array. Parse it to string for simple search.
    let tagsStr = '';
    try {
      const parsedTags = JSON.parse(news.tags);
      tagsStr = Array.isArray(parsedTags) ? parsedTags.join(', ') : news.tags;
    } catch {
      tagsStr = news.tags;
    }
    const matchTags = filterTags === '' || tagsStr.toLowerCase().includes(filterTags.toLowerCase());

    return matchTitle && matchAuthor && matchDate && matchTags;
  });

  return (
    <div style={{ paddingRight: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>News und Beiträge</h1>
      </div>

      {/* Filter Bar */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        backgroundColor: '#1a1a1a', 
        padding: '1rem 1.5rem', 
        borderRadius: '8px', 
        marginBottom: '2rem' 
      }}>
        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ fontWeight: 'bold', marginRight: '0.5rem' }}>Filter</div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ color: '#aaa', fontSize: '0.9rem' }}>Titel</span>
            <div style={{ position: 'relative' }}>
              <input 
                type="text" 
                value={filterTitle}
                onChange={(e) => setFilterTitle(e.target.value)}
                style={{ backgroundColor: '#333', border: 'none', borderRadius: '4px', padding: '0.25rem 0.5rem', color: '#fff', width: '150px' }} 
              />
              <span style={{ position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)', color: '#888', display: 'flex' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 256 256">
                  <g fill="currentColor"><g transform="scale(8.53333,8.53333)"><path d="M13,3c-5.511,0 -10,4.489 -10,10c0,5.511 4.489,10 10,10c2.39651,0 4.59738,-0.85101 6.32227,-2.26367l5.9707,5.9707c0.25082,0.26124 0.62327,0.36648 0.97371,0.27512c0.35044,-0.09136 0.62411,-0.36503 0.71547,-0.71547c0.09136,-0.35044 -0.01388,-0.72289 -0.27512,-0.97371l-5.9707,-5.9707c1.41266,-1.72488 2.26367,-3.92576 2.26367,-6.32227c0,-5.511 -4.489,-10 -10,-10zM13,5c4.43012,0 8,3.56988 8,8c0,4.43012 -3.56988,8 -8,8c-4.43012,0 -8,-3.56988 -8,-8c0,-4.43012 3.56988,-8 8,-8z"></path></g></g>
                </svg>
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ color: '#aaa', fontSize: '0.9rem' }}>Autor</span>
            <div style={{ position: 'relative' }}>
              <input 
                type="text" 
                value={filterAuthor}
                onChange={(e) => setFilterAuthor(e.target.value)}
                style={{ backgroundColor: '#333', border: 'none', borderRadius: '4px', padding: '0.25rem 0.5rem', color: '#fff', width: '120px' }} 
              />
              <span style={{ position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)', color: '#888', display: 'flex' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 256 256">
                  <g fill="currentColor"><g transform="scale(8.53333,8.53333)"><path d="M13,3c-5.511,0 -10,4.489 -10,10c0,5.511 4.489,10 10,10c2.39651,0 4.59738,-0.85101 6.32227,-2.26367l5.9707,5.9707c0.25082,0.26124 0.62327,0.36648 0.97371,0.27512c0.35044,-0.09136 0.62411,-0.36503 0.71547,-0.71547c0.09136,-0.35044 -0.01388,-0.72289 -0.27512,-0.97371l-5.9707,-5.9707c1.41266,-1.72488 2.26367,-3.92576 2.26367,-6.32227c0,-5.511 -4.489,-10 -10,-10zM13,5c4.43012,0 8,3.56988 8,8c0,4.43012 -3.56988,8 -8,8c-4.43012,0 -8,-3.56988 -8,-8c0,-4.43012 3.56988,-8 8,-8z"></path></g></g>
                </svg>
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ color: '#aaa', fontSize: '0.9rem' }}>Erstelldatum</span>
            <div style={{ position: 'relative' }}>
              <input 
                type="text" 
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                style={{ backgroundColor: '#333', border: 'none', borderRadius: '4px', padding: '0.25rem 0.5rem', color: '#fff', width: '120px' }} 
              />
              <span style={{ position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)', color: '#888', display: 'flex' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 256 256">
                  <g fill="currentColor"><g transform="scale(8.53333,8.53333)"><path d="M13,3c-5.511,0 -10,4.489 -10,10c0,5.511 4.489,10 10,10c2.39651,0 4.59738,-0.85101 6.32227,-2.26367l5.9707,5.9707c0.25082,0.26124 0.62327,0.36648 0.97371,0.27512c0.35044,-0.09136 0.62411,-0.36503 0.71547,-0.71547c0.09136,-0.35044 -0.01388,-0.72289 -0.27512,-0.97371l-5.9707,-5.9707c1.41266,-1.72488 2.26367,-3.92576 2.26367,-6.32227c0,-5.511 -4.489,-10 -10,-10zM13,5c4.43012,0 8,3.56988 8,8c0,4.43012 -3.56988,8 -8,8c-4.43012,0 -8,-3.56988 -8,-8c0,-4.43012 3.56988,-8 8,-8z"></path></g></g>
                </svg>
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ color: '#aaa', fontSize: '0.9rem' }}>Tags</span>
            <div style={{ position: 'relative' }}>
              <input 
                type="text" 
                value={filterTags}
                onChange={(e) => setFilterTags(e.target.value)}
                style={{ backgroundColor: '#333', border: 'none', borderRadius: '4px', padding: '0.25rem 0.5rem', color: '#fff', width: '120px' }} 
              />
              <span style={{ position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)', color: '#888', display: 'flex' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 256 256">
                  <g fill="currentColor"><g transform="scale(8.53333,8.53333)"><path d="M13,3c-5.511,0 -10,4.489 -10,10c0,5.511 4.489,10 10,10c2.39651,0 4.59738,-0.85101 6.32227,-2.26367l5.9707,5.9707c0.25082,0.26124 0.62327,0.36648 0.97371,0.27512c0.35044,-0.09136 0.62411,-0.36503 0.71547,-0.71547c0.09136,-0.35044 -0.01388,-0.72289 -0.27512,-0.97371l-5.9707,-5.9707c1.41266,-1.72488 2.26367,-3.92576 2.26367,-6.32227c0,-5.511 -4.489,-10 -10,-10zM13,5c4.43012,0 8,3.56988 8,8c0,4.43012 -3.56988,8 -8,8c-4.43012,0 -8,-3.56988 -8,-8c0,-4.43012 3.56988,-8 8,-8z"></path></g></g>
                </svg>
              </span>
            </div>
          </div>
        </div>

        <Link href="/admin/news/new" className="admin-btn-red" style={{ textDecoration: 'none', padding: '0.6rem 2rem', fontWeight: 'bold', fontSize: '1rem' }}>
          Erstellen
        </Link>
      </div>

      {/* List Table */}
      <div className="admin-dark-card" style={{ padding: '0', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid var(--admin-border)', color: 'var(--admin-title-color)' }}>
          <span style={{ flex: '2 1 0' }}>Titel</span>
          <span style={{ flex: '1.5 1 0' }}>Autor</span>
          <span style={{ flex: '1.5 1 0' }}>Erstelldatum</span>
          <span style={{ flex: '1 1 0' }}>Tags</span>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', padding: '0 0 1.5rem 0', overflowY: 'auto' }}>
          {filteredNews.length === 0 ? (
            <div style={{ padding: '2rem 1.5rem', color: '#aaa' }}>Keine Beiträge gefunden.</div>
          ) : (
            filteredNews.map((news) => {
                let tagsStr = '';
                try {
                  const parsed = JSON.parse(news.tags);
                  tagsStr = Array.isArray(parsed) ? parsed.join(', ') : news.tags;
                } catch {
                  tagsStr = news.tags;
                }

                return (
                  <Link 
                    href={`/admin/news/${news.id}`} 
                    key={news.id}
                    className="admin-kader-row"
                    style={{ 
                      textDecoration: 'none',
                      color: 'var(--admin-text-main)',
                      transition: 'background-color 0.2s',
                      padding: '1rem 1.5rem'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--admin-hover-bg, rgba(255,255,255,0.05))'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <div style={{ flex: '2 1 0', paddingRight: '1rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', display: 'flex', alignItems: 'center' }}>
                      {news.title}
                    </div>
                    <div style={{ flex: '1.5 1 0', paddingRight: '1rem', display: 'flex', alignItems: 'center', color: '#aaa' }}>
                      {news.author || '-'}
                    </div>
                    <div style={{ flex: '1.5 1 0', paddingRight: '1rem', display: 'flex', alignItems: 'center', color: '#aaa' }}>
                      {new Date(news.createdAt).toLocaleDateString('de-CH', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                    </div>
                    <div style={{ flex: '1 1 0', color: '#aaa', fontSize: '0.9rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', display: 'flex', alignItems: 'center' }}>
                      {tagsStr}
                    </div>
                  </Link>
                );
              })
          )}
        </div>
      </div>
    </div>
  );
}
