"use client";

import React from 'react';

export default function Impressum() {
  return (
    <section className="container py-xl" style={{ flex: 1 }}>
      <div className="text-center mb-lg">
        <h1>Impressum</h1>
        <p>Rechtliche Informationen</p>
      </div>
      
      <div style={{ background: 'white', padding: '2rem', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)', maxWidth: '800px', margin: '0 auto' }}>
        <h2>Kontaktadresse</h2>
        <p>
          FC Büren an der Aare<br />
          Postfach 88<br />
          3294 Büren an der Aare<br />
          Schweiz
        </p>
        <p className="mt-lg">
          <strong>E-Mail:</strong> <a href="mailto:info@fcbueren.ch">info@fcbueren.ch</a>
        </p>
      </div>
    </section>
  );
}
