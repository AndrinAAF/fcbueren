"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const savedMode = localStorage.getItem('theme');
    if (savedMode === 'dark') {
      setIsDarkMode(true);
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const searchContainer = document.querySelector('.nav-search');
      if (searchContainer && !searchContainer.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    };

    if (isSearchOpen) {
      document.addEventListener('click', handleClickOutside);
    }
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isSearchOpen]);

  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
      setIsDarkMode(false);
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
      setIsDarkMode(true);
    }
  };

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
          <div className="nav-dropdown">
            <span className="nav-dropdown-toggle" style={{ cursor: 'pointer' }}>
              Aktive ▾
            </span>
            <div className="nav-dropdown-menu">
              <Link href="/team/1-mannschaft" onClick={closeMenu}>1. Mannschaft (4. Liga)</Link>
              <Link href="/team/2-mannschaft" onClick={closeMenu}>2. Mannschaft (5. Liga)</Link>
              <Link href="/team/ue40" onClick={closeMenu}>Ü40+ (7/7)</Link>
            </div>
          </div>
          
          <div className="nav-dropdown">
            <span className="nav-dropdown-toggle" style={{ cursor: 'pointer' }}>
              Junioren ▾
            </span>
            <div className="nav-dropdown-menu">
              <Link href="/team/haeftli-b" onClick={closeMenu}>Team Häftli B 1. Stkl.</Link>
              <Link href="/team/haeftli-c" onClick={closeMenu}>Team Häftli C 2. Stkl.</Link>
              <Link href="/team/haeftli-d9" onClick={closeMenu}>Team Häftli D/9</Link>
              <Link href="/team/haeftli-d7" onClick={closeMenu}>Team Häftli D/7</Link>
              <Link href="/team/bueren-e" onClick={closeMenu}>Büren E Junioren</Link>
              <Link href="/team/bueren-fg" onClick={closeMenu}>Büren F/G Junioren</Link>
            </div>
          </div>
          <div className="nav-dropdown">
            <span className="nav-dropdown-toggle" style={{ cursor: 'pointer' }}>
              Verein ▾
            </span>
            <div className="nav-dropdown-menu">
              <Link href="/verein/portrait" onClick={closeMenu}>Vereinsportrait</Link>
              <Link href="/verein/vorstand" onClick={closeMenu}>Vorstand</Link>
              <Link href="/verein/trainer" onClick={closeMenu}>Trainer</Link>
              <Link href="/verein/funktionaere" onClick={closeMenu}>Funktionäre</Link>
              <Link href="/verein/juniorenkommission" onClick={closeMenu}>Juniorenkommission</Link>
              <Link href="/verein/chronik" onClick={closeMenu}>Chronik FC Büren a. A.</Link>
              <Link href="/verein/matchzytig" onClick={closeMenu}>MatchZytig</Link>
              <Link href="/verein/downloads" onClick={closeMenu}>Downloads</Link>
              <Link href="/verein/partnerverein" onClick={closeMenu}>Partnerverein SR OLKA</Link>
            </div>
          </div>
          <a href="https://fcb.equiplab.ch/" target="_blank" rel="noopener noreferrer">Ausrüstung</a>
          <Link href="/kalender" className={pathname === '/kalender' ? 'active' : ''} onClick={closeMenu}>Kalender</Link>
          <Link href="/kontakt" className={pathname === '/kontakt' ? 'active' : ''} onClick={closeMenu}>Kontakt</Link>
          
          {/* Dark Mode Toggle */}
          <button type="button" aria-label="Toggle Dark Mode" onClick={toggleDarkMode} style={{ background: 'none', border: 'none', color: 'var(--clr-white)', cursor: 'pointer', display: 'flex', alignItems: 'center', marginLeft: '0.5rem', transition: 'opacity 0.3s' }}>
            {isDarkMode ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
            )}
          </button>
          
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
