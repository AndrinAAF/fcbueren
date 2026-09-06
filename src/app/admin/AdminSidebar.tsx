"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { teamsData } from '@/lib/teamData';

export default function AdminSidebar({ children }: { children?: React.ReactNode }) {
  const pathname = usePathname();
  const isPlayersActive = pathname.startsWith('/admin/players');
  const [isTeamsOpen, setIsTeamsOpen] = useState(isPlayersActive);

  return (
    <aside className="admin-sidebar">
      <h2>FC Büren Admin</h2>
      <nav className="admin-nav">
        <Link href="/admin/events" className={pathname.startsWith('/admin/events') ? 'active' : ''}>
          Veranstaltungen
        </Link>
        <Link href="/admin/news" className={pathname.startsWith('/admin/news') ? 'active' : ''}>
          News und Beiträge
        </Link>
        
        <div className="admin-nav-group">
          <div 
            className={`admin-nav-summary ${(isPlayersActive || isTeamsOpen) ? 'active' : ''}`}
            onClick={() => setIsTeamsOpen(!isTeamsOpen)}
          >
            Mannschaften
            <span className="admin-nav-arrow" style={{ transform: isTeamsOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>▼</span>
          </div>
          
          <div className={`admin-nav-sub-wrapper ${isTeamsOpen ? 'open' : ''}`}>
            <div className="admin-nav-sub">
              {teamsData.map(team => {
                const href = `/admin/players/${team.slug}`;
                const isActive = pathname === href;
                return (
                  <Link key={team.slug} href={href} className={isActive ? 'active' : ''}>
                    {team.name}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </nav>
      {children}
    </aside>
  );
}
