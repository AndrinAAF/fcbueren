"use client";

import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Adresse & Kontakt */}
          <div className="footer-col">
            <h3>FC Büren an der Aare</h3>
            <p style={{ lineHeight: 1.6 }}>
              Kanalstrasse 1, 1a, 1b (Gmde. Dotzigen)<br />
              3294 Büren an der Aare<br />
              <br />
              <a href="mailto:info@fcbueren.ch">info@fcbueren.ch</a>
            </p>
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
          <p>&copy; 2022 FC Büren an der Aare</p>
          <p style={{ marginTop: '5px', fontSize: '0.75rem' }}>Neu Version online seit 21.01.2023 /hpg</p>
        </div>
      </div>
    </footer>
  );
}
