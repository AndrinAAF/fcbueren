"use client";

import React from 'react';
import ScrollObserver from '@/components/ScrollObserver';

export default function Kontakt() {
  return (
    <>
      <ScrollObserver />
    <section className="container py-xl" style={{ flex: 1 }}>
      <div className="text-center animate-on-scroll" style={{ marginBottom: '5rem' }}>
        <h1 style={{ color: 'var(--clr-primary)', fontStyle: 'italic', marginBottom: '1.5rem', fontWeight: 900, fontSize: 'clamp(3rem, 6vw, 4.5rem)' }}>Kontakt und Anfahrt</h1>
        <p>Wir freuen uns von dir zu hören und dich auf dem Sportplatz Lachen zu begrüssen!</p>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', marginBottom: '4rem' }}>
        
        {/* Left side: Image and Info */}
        <div className="animate-on-scroll" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', boxShadow: 'var(--shadow-sm)', aspectRatio: '16/9', position: 'relative' }}>
            <img src="/assets/images/platz.jpg" alt="Sportplatz Lachen" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          
          <div style={{ background: 'var(--clr-surface)', padding: '2rem', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)' }}>
            <h3 className="mb-md">Unser Zuhause</h3>
            <p className="mb-sm"><strong>Sportplatz Lachen</strong></p>
            <p className="mb-sm">Kanalstrasse</p>
            <p className="mb-lg">3294 Büren an der Aare</p>
            
            <p className="mb-sm"><strong>Allgemeine Anfragen:</strong></p>
            <p><a href="mailto:info@fcbueren.ch" style={{ color: 'var(--clr-primary)' }}>info@fcbueren.ch</a></p>
          </div>
        </div>

        {/* Right side: Contact Form */}
        <div className="animate-on-scroll" style={{ background: 'var(--clr-surface)', padding: '2rem', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)', alignSelf: 'start' }}>
          <h3 className="mb-lg">Schreib uns eine Nachricht</h3>
          <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }} onSubmit={(e) => e.preventDefault()}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label htmlFor="name">Name</label>
              <input type="text" id="name" style={{ padding: '0.75rem', border: '1px solid var(--clr-border)', borderRadius: '4px', background: 'transparent', color: 'var(--clr-text)' }} required />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label htmlFor="email">E-Mail</label>
              <input type="email" id="email" style={{ padding: '0.75rem', border: '1px solid var(--clr-border)', borderRadius: '4px', background: 'transparent', color: 'var(--clr-text)' }} required />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label htmlFor="message">Nachricht</label>
              <textarea id="message" rows={5} style={{ padding: '0.75rem', border: '1px solid var(--clr-border)', borderRadius: '4px', background: 'transparent', color: 'var(--clr-text)' }} required></textarea>
            </div>
            <button type="submit" className="btn mt-md" style={{ width: '100%' }}>Senden</button>
          </form>
        </div>
      </div>
    </section>

    {/* Google Maps Embed in a themed section */}
    <section className="animate-on-scroll" style={{ background: 'var(--clr-surface)', padding: '4rem 0', marginTop: 'auto' }}>
      <div className="container text-center mb-lg">
        <h2 style={{ color: 'var(--clr-text)' }}>Hier findest du uns</h2>
      </div>
      <div className="container" style={{ height: '450px' }}>
        <div style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', height: '100%', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)' }}>
          <iframe 
            src="https://maps.google.com/maps?q=Sportplatz%20Lachen,%20Kanalstrasse,%203294%20Büren%20an%20der%20Aare&t=&z=15&ie=UTF8&iwloc=&output=embed" 
            width="100%" 
            height="100%" 
            style={{ border: 0, display: 'block' }} 
            allowFullScreen 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Maps FC Büren"
          ></iframe>
        </div>
      </div>
    </section>
  </>
  );
}
