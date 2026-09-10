import React from 'react';
import ScrollObserver from '@/components/ScrollObserver';

export const metadata = {
  title: 'Partnerverein SR OLKA | FC Büren',
};

export default function Partnerverein() {
  return (
    <>
      <ScrollObserver />
      <section className="container py-xl" style={{ flex: 1 }}>
        <div className="text-center animate-on-scroll" style={{ marginBottom: '5rem' }}>
          <h1 style={{ color: 'var(--clr-primary)', fontStyle: 'italic', marginBottom: '1.5rem', fontWeight: 900, fontSize: 'clamp(3rem, 6vw, 4.5rem)' }}>Partnerverein SR OLKA</h1>
        </div>
        
        <div className="animate-on-scroll" style={{ background: 'var(--clr-surface)', padding: '3rem', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)' }}>
          <p style={{ fontSize: '1.1rem', lineHeight: 1.6 }}>Hier folgt in Kürze der Inhalt für den Partnerverein SR OLKA.</p>
        </div>
      </section>
    </>
  );
}
