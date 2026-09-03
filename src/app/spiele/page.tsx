"use client";

import React from 'react';

export default function Spiele() {
  return (
    <section className="container py-xl" style={{ flex: 1 }}>
      <div className="text-center mb-lg">
        <h1>Spielplan & Resultate</h1>
        <p>Unterstütze unsere Teams am Spielfeldrand.</p>
      </div>
      
      <div style={{ background: 'white', padding: '2rem', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)', maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', borderBottom: '1px solid #eee' }}>
          <div><strong>FC Büren</strong> vs. Gastverein</div>
          <div style={{ color: 'var(--clr-primary)', fontWeight: 'bold' }}>Sa, 14:00 Uhr</div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', borderBottom: '1px solid #eee' }}>
          <div>FC Auswärts vs. <strong>FC Büren</strong></div>
          <div style={{ color: 'var(--clr-primary)', fontWeight: 'bold' }}>So, 10:30 Uhr</div>
        </div>
      </div>
    </section>
  );
}
