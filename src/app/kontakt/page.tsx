"use client";

import React from 'react';

export default function Kontakt() {
  return (
    <section className="container py-xl" style={{ flex: 1 }}>
      <div className="text-center mb-lg">
        <h1>Kontakt</h1>
        <p>Wir freuen uns von dir zu hören!</p>
      </div>
      
      <div style={{ background: 'white', padding: '2rem', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)', maxWidth: '600px', margin: '0 auto' }}>
        <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }} onSubmit={(e) => e.preventDefault()}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" style={{ padding: '0.75rem', border: '1px solid #ccc', borderRadius: '4px' }} required />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label htmlFor="email">E-Mail</label>
            <input type="email" id="email" style={{ padding: '0.75rem', border: '1px solid #ccc', borderRadius: '4px' }} required />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label htmlFor="message">Nachricht</label>
            <textarea id="message" rows={5} style={{ padding: '0.75rem', border: '1px solid #ccc', borderRadius: '4px' }} required></textarea>
          </div>
          <button type="submit" className="btn mt-lg">Senden</button>
        </form>
      </div>
    </section>
  );
}
