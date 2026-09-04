import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import ScrollObserver from '@/components/ScrollObserver';
import NewsCard from '@/components/NewsCard';

export default async function Home() {
  // Fetch latest 2 events
  const upcomingEvents = await prisma.event.findMany({
    orderBy: { date: 'asc' },
    where: {
      date: {
        gte: new Date()
      }
    },
    take: 2
  });

  // Fetch latest news
  const NEWS_PER_PAGE = 6;
  const totalNews = await prisma.news.count();
  const totalPages = Math.ceil(totalNews / NEWS_PER_PAGE);

  const latestNews = await prisma.news.findMany({
    orderBy: { createdAt: 'desc' },
    take: NEWS_PER_PAGE
  });

  return (
    <>
      <ScrollObserver />
      <section className="hero">
        <div className="container">
          <h1>Willkommen beim FC Büren</h1>
          <p>Leidenschaft, Teamgeist und Tradition. Erlebe Fussball mit uns.</p>
        </div>
      </section>

      <section className="container py-xl">
        <div className="text-center mb-lg">
          <h2>Nächste Spiele</h2>
          <p>Verfolge unsere Teams live auf dem Platz!</p>
        </div>

        {/* Eigene Match-Container */}
        <div className="matches-grid">

          {/* Karte 1: B Junioren */}
          <div className="match-card-container animate-on-scroll">
            <div className="match-card-header">
              <span>SA. 12.09.26</span>
              <span>Büren Lachen Platz</span>
              <span>14:00</span>
            </div>
            <div className="match-league-title">Meisterschaft B Jun.</div>
            <div className="match-teams">
              <div className="team-row">
                <div className="team-logo-square"></div>
                <span className="team-name">FC Büren</span>
              </div>
              <div className="match-vs-small">vs</div>
              <div className="team-row">
                <div className="team-logo-square"></div>
                <span className="team-name">FC Lyss</span>
              </div>
            </div>
          </div>

          {/* Karte 2: 5. Liga */}
          <div className="match-card-container animate-on-scroll">
            <div className="match-card-header">
              <span>SA. 12.09.26</span>
              <span>Büren Lachen Platz</span>
              <span>16:00</span>
            </div>
            <div className="match-league-title">Meisterschaft 5. Liga</div>
            <div className="match-teams">
              <div className="team-row">
                <div className="team-logo-square"></div>
                <span className="team-name">FC Büren a.A.</span>
              </div>
              <div className="match-vs-small">vs</div>
              <div className="team-row">
                <div className="team-logo-square"></div>
                <span className="team-name">FC Pieterlen</span>
              </div>
            </div>
          </div>

          {/* Karte 3: 4. Liga */}
          <div className="match-card-container animate-on-scroll">
            <div className="match-card-header">
              <span>SO. 13.09.26</span>
              <span>Auswärts</span>
              <span>10:15</span>
            </div>
            <div className="match-league-title">Meisterschaft 4. Liga</div>
            <div className="match-teams">
              <div className="team-row">
                <div className="team-logo-square"></div>
                <span className="team-name">FC Nidau</span>
              </div>
              <div className="match-vs-small">vs</div>
              <div className="team-row">
                <div className="team-logo-square"></div>
                <span className="team-name">FC Büren a.A.</span>
              </div>
            </div>
          </div>

          {/* Karte 4: Cup B */}
          <div className="match-card-container animate-on-scroll">
            <div className="match-card-header">
              <span>MI. 16.09.26</span>
              <span>Büren Lachen Platz</span>
              <span>19:30</span>
            </div>
            <div className="match-league-title">Cup B Jun.</div>
            <div className="match-teams">
              <div className="team-row">
                <div className="team-logo-square"></div>
                <span className="team-name">FC Büren</span>
              </div>
              <div className="match-vs-small">vs</div>
              <div className="team-row">
                <div className="team-logo-square"></div>
                <span className="team-name">FC Aarberg</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      <section className="container py-xl" style={{ paddingTop: '0' }}>
        <div className="text-center mb-lg">
          <h2>News und Beiträge</h2>
          <p>Aktuelle Spielberichte und Neuigkeiten</p>
        </div>

        <div className="news-section">
          {latestNews.length > 0 ? latestNews.map((news) => (
            <NewsCard 
              key={news.id} 
              title={news.title}
              content={news.content}
              author={news.author || 'Redaktion'}
              date={new Date(news.createdAt).toLocaleDateString('de-CH')}
              views={news.views}
              initialLikes={news.likes}
            />
          )) : (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '2rem', background: 'var(--clr-bg-alt)', borderRadius: '8px' }}>
              Aktuell gibt es keine News.
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 0 && (
          <div className="pagination">
            <button className="page-nav" disabled>&laquo;</button>
            <button className="page-nav" disabled>&lsaquo;</button>
            {Array.from({ length: totalPages }).map((_, i) => (
              <button key={i} className={`page-num ${i === 0 ? 'active' : ''}`}>{i + 1}</button>
            ))}
            <button className="page-nav" disabled={totalPages <= 1}>&rsaquo;</button>
            <button className="page-nav" disabled={totalPages <= 1}>&raquo;</button>
          </div>
        )}
      </section>

      {/* Veranstaltungen Section */}
      <section className="container py-xl">
        <div className="text-center mb-lg">
          <h2>Bevorstehende Veranstaltungen</h2>
          <p>Sei dabei an unseren kommenden Vereins-Events.</p>
        </div>
        
        <div className="events-grid">
          {upcomingEvents.length > 0 ? upcomingEvents.map((event, index) => (
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
                <h3 className="event-title" style={{ textTransform: 'uppercase' }}>{event.title}</h3>
              </div>
              <div className="event-divider"></div>
              <div className="event-footer">
                {event.linkUrl ? (
                  <a href={event.linkUrl} target="_blank" rel="noopener noreferrer" className="btn">Erfahre hier mehr</a>
                ) : (
                  <Link href="/news" className="btn">Erfahre hier mehr</Link>
                )}
              </div>
            </div>
          )) : (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '2rem', background: 'var(--clr-bg-alt)', borderRadius: '8px' }}>
              Aktuell sind keine speziellen Vereinsanlässe geplant.
            </div>
          )}
        </div>
      </section>

      {/* Full-width Sponsoren Section */}
      <section style={{ backgroundColor: 'white', color: '#111111', padding: '3rem 0', width: '100%', overflow: 'hidden' }}>
        <div className="container text-center mb-lg">
          <h2>Unsere Sponsoren</h2>
          <p>Herzlichen Dank für die Unterstützung!</p>
        </div>

        {/* Scrolling Sponsors Band */}
        <div className="sponsor-marquee-wrapper">

          {/* Row 1 (Top) */}
          <div className="marquee-track">
            {/* Set 1 */}
            <div className="marquee-content">
              {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                <img key={`r1-s1-${i}`} src={`/assets/images/sponsors/sponsor${i}.png`} alt="Sponsor" className="sponsor-logo" />
              ))}
            </div>
            {/* Set 2 (Clone for loop) */}
            <div className="marquee-content" aria-hidden="true">
              {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                <img key={`r1-s2-${i}`} src={`/assets/images/sponsors/sponsor${i}.png`} alt="Sponsor" className="sponsor-logo" />
              ))}
            </div>
          </div>

          {/* Row 2 */}
          <div className="marquee-track slow">
            <div className="marquee-content">
              {[9, 10, 11, 12, 13, 14, 15].map(i => (
                <img key={`r2-s1-${i}`} src={`/assets/images/sponsors/sponsor${i}.png`} alt="Sponsor" className="sponsor-logo" />
              ))}
            </div>
            <div className="marquee-content" aria-hidden="true">
              {[9, 10, 11, 12, 13, 14, 15].map(i => (
                <img key={`r2-s2-${i}`} src={`/assets/images/sponsors/sponsor${i}.png`} alt="Sponsor" className="sponsor-logo" />
              ))}
            </div>
          </div>

          {/* Row 3 */}
          <div className="marquee-track fast">
            <div className="marquee-content">
              {[16, 17, 18, 19, 20, 21, 22].map(i => (
                <img key={`r3-s1-${i}`} src={`/assets/images/sponsors/sponsor${i}.png`} alt="Sponsor" className="sponsor-logo" />
              ))}
            </div>
            <div className="marquee-content" aria-hidden="true">
              {[16, 17, 18, 19, 20, 21, 22].map(i => (
                <img key={`r3-s2-${i}`} src={`/assets/images/sponsors/sponsor${i}.png`} alt="Sponsor" className="sponsor-logo" />
              ))}
            </div>
          </div>

          {/* Row 4 (Bottom) */}
          <div className="marquee-track x-slow">
            <div className="marquee-content">
              {[23, 24, 25, 26, 27, 28, 29].map(i => (
                <img key={`r4-s1-${i}`} src={`/assets/images/sponsors/sponsor${i}.png`} alt="Sponsor" className="sponsor-logo" />
              ))}
            </div>
            <div className="marquee-content" aria-hidden="true">
              {[23, 24, 25, 26, 27, 28, 29].map(i => (
                <img key={`r4-s2-${i}`} src={`/assets/images/sponsors/sponsor${i}.png`} alt="Sponsor" className="sponsor-logo" />
              ))}
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
