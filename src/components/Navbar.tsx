"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSearch = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSearchOpen(!isSearchOpen);
  };

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="navbar">
      <div className="container nav-container">
        {/* Logo */}
        <Link href="/" className="nav-logo" onClick={closeMenu}>
          <img src="/buerenLogo.png" alt="FC Büren Logo" className="logo-image" />
        </Link>
        
        <button className="nav-toggle" onClick={toggleMenu} aria-label="Navigation öffnen">
          ☰
        </button>
        
        <nav className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <Link href="/" className={pathname === '/' ? 'active' : ''} onClick={closeMenu}>Start</Link>
          <Link href="/team" className={pathname === '/team' ? 'active' : ''} onClick={closeMenu}>Aktive</Link>
          <a href="#" onClick={closeMenu}>Junioren</a>
          <a href="#" onClick={closeMenu}>Verein</a>
          <a href="https://fcb.equiplab.ch/" target="_blank" rel="noopener noreferrer">Ausrüstung</a>
          <Link href="/spiele" className={pathname === '/spiele' ? 'active' : ''} onClick={closeMenu}>Kalender</Link>
          <Link href="/kontakt" className={pathname === '/kontakt' ? 'active' : ''} onClick={closeMenu}>Kontakt</Link>
          
          {/* Expandable Search Field */}
          <div className={`nav-search ${isSearchOpen ? 'expanded' : ''}`}>
            <button type="button" aria-label="Suchen" onClick={toggleSearch}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
            <input type="text" placeholder="Suchen..." className={isSearchOpen ? 'visible' : ''} />
          </div>
        </nav>
      </div>
    </header>
  );
}
