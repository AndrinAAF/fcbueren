"use client";

import React from 'react';

export default function Team() {
  return (
    <section className="container py-xl" style={{ flex: 1 }}>
      <div className="text-center mb-lg">
        <h1>Unsere Mannschaften</h1>
        <p>Von den Junioren bis zu den Aktiven.</p>
      </div>
      
      <div style={{ background: 'white', padding: '2rem', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)', textAlign: 'center' }}>
        <h2>1. Mannschaft</h2>
        <p>Hier kommen bald die Kader-Infos hin.</p>
      </div>
    </section>
  );
}
