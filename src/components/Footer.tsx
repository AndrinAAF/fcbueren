"use client";

import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Vereinslogo (Links) */}
          <div className="footer-col" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
            <img 
              src="/buerenLogo.png" 
              alt="FC Büren Logo" 
              style={{ maxHeight: '180px', objectFit: 'contain' }} 
            />
          </div>

          {/* Adresse & Kontakt */}
          <div className="footer-col">
            <h3>FC Büren an der Aare</h3>
            <p style={{ lineHeight: 1.6, marginBottom: '1rem' }}>
              Kanalstrasse 1, 1a, 1b (Gmde. Dotzigen)<br />
              3294 Büren an der Aare<br />
              <br />
              <a href="mailto:info@fcbueren.ch">info@fcbueren.ch</a>
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <a href="https://www.instagram.com/fcbueren/" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                FC Büren
              </a>
              <a href="https://www.instagram.com/team_haeftli_b/" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                Team Häftli
              </a>
            </div>
          </div>
          
          {/* Partner / Links */}
          <div className="footer-col">
            <h3>Partner & Links</h3>
            <ul>
              <li>
                <a href="https://gemeinde-schweiz.ch/kanton-bern/bueren-an-der-aare/" target="_blank" rel="noopener noreferrer">Gemeinde-Infoseite Büren an der Aare</a>
              </li>
            </ul>
          </div>
          
          {/* Rechtliches */}
          <div className="footer-col">
            <h3>Rechtliches</h3>
            <ul>
              <li><Link href="/impressum">Impressum</Link></li>
            </ul>
          </div>
          
          {/* Sponsoren Logos (Rechts) */}
          <div className="footer-col" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'flex-start', gap: '1.5rem' }}>
            <img 
              src="/assets/images/sponsors/sponsor29.png" 
              alt="Bigler Logo" 
              style={{ maxHeight: '220px', marginTop: '-25px' }} 
              onError={(e) => {
                const target = e.target as HTMLElement;
                target.outerHTML = '<div style="width:100px;height:120px;background:rgba(255,255,255,0.2);display:flex;align-items:center;justify-content:center;margin-top:-25px;">Bigler</div>';
              }} 
            />
            <img 
              src="/assets/images/sponsors/sponsor3.png" 
              alt="SPAR Weibel Logo" 
              style={{ maxHeight: '80px' }} 
              onError={(e) => {
                const target = e.target as HTMLElement;
                target.outerHTML = '<div style="width:150px;height:70px;background:rgba(255,255,255,0.2);display:flex;align-items:center;justify-content:center;">SPAR</div>';
              }} 
            />
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2026 FC Büren an der Aare</p>
          <p style={{ marginTop: '5px', fontSize: '0.75rem' }}>Neue Version online seit 04.09.2026</p>
        </div>
      </div>
    </footer>
  );
}
