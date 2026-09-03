"use client";

import React from 'react';
import Image from 'next/image';

export default function Home() {
  return (
    <>
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
          <div className="match-card-container">
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
          <div className="match-card-container">
            <div className="match-card-header">
              <span>SA. 12.09.26</span>
              <span>Büren Lachen Platz</span>
              <span>16:00</span>
            </div>
            <div className="match-league-title">5. Liga</div>
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
          <div className="match-card-container">
            <div className="match-card-header">
              <span>SO. 13.09.26</span>
              <span>Auswärts</span>
              <span>10:15</span>
            </div>
            <div className="match-league-title">4. Liga</div>
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
          <div className="match-card-container">
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

      {/* TEMPORARY SPACER */}
      <div style={{ height: '150px' }} className="temp-spacer"></div>

      {/* Full-width Sponsoren Section */}
      <section style={{ backgroundColor: 'white', padding: '3rem 0', width: '100vw', overflow: 'hidden' }}>
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
