"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { getTeamBySlug } from '@/lib/teamData';

type Player = {
  id: string;
  teamSlug: string;
  name: string;
  birthdate: string;
  position: string;
  number: number;
  imageUrl: string;
};

export default function AdminPlayersPage() {
  const params = useParams();
  const teamSlug = params.slug as string;
  const team = getTeamBySlug(teamSlug);

  const [players, setPlayers] = useState<Player[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Form State
  const [name, setName] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [position, setPosition] = useState('Torwart');
  const [number, setNumber] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [useDefaultImage, setUseDefaultImage] = useState(false);

  // Group Image State
  const [groupFile, setGroupFile] = useState<File | null>(null);
  const [isGroupLoading, setIsGroupLoading] = useState(false);

  useEffect(() => {
    if (teamSlug) {
      fetchPlayers();
    }
  }, [teamSlug]);

  const fetchPlayers = async () => {
    try {
      const res = await fetch(`/api/players?teamSlug=${teamSlug}`);
      if (res.ok) {
        const data = await res.json();
        setPlayers(data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleGroupFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setGroupFile(e.target.files[0]);
    }
  };

  const handleGroupSubmit = async () => {
    if (!groupFile) {
      alert('Bitte wähle zuerst ein Bild aus!');
      return;
    }
    
    setIsGroupLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', groupFile);

      // Upload image
      const uploadRes = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const uploadData = await uploadRes.json();
      if (!uploadData.success) {
        throw new Error(uploadData.message || 'Upload fehlgeschlagen');
      }

      // Save to database
      const saveRes = await fetch('/api/team-settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          teamSlug,
          imageUrl: uploadData.url
        })
      });

      if (!saveRes.ok) throw new Error('Fehler beim Speichern');
      alert('Gruppenbild erfolgreich gespeichert!');
      setGroupFile(null);
      // Optional: reset file input using a ref, or leave it
    } catch (err: any) {
      alert(err.message);
    } finally {
      setIsGroupLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !position) {
      alert("Bitte Name und Position ausfüllen!");
      return;
    }

    const isTrainer = position === 'Haupttrainer' || position === 'Assistenztrainer';

    if (!isTrainer) {
      if (!birthdate || !number) {
        alert("Bitte Geburtsdatum und Rückennummer ausfüllen!");
        return;
      }
    }

    if (!useDefaultImage && !file) {
      alert("Bitte ein Bild auswählen oder 'Kein Bild vorhanden' ankreuzen!");
      return;
    }

    setIsLoading(true);

    try {
      let imageUrl = '/assets/images/defaultImages/defaultPlayer.png';

      // 1. Upload Image (only if provided)
      if (file) {
        const formData = new FormData();
        formData.append('file', file);

        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        const uploadData = await uploadRes.json();
        if (!uploadData.success) {
          throw new Error(uploadData.message || 'Upload fehlgeschlagen');
        }

        imageUrl = uploadData.url;
      }

      // 2. Save Player to DB
      const playerRes = await fetch('/api/players', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          teamSlug,
          name,
          birthdate: isTrainer ? '' : birthdate,
          position,
          number: isTrainer ? 0 : parseInt(number, 10),
          imageUrl,
        })
      });

      if (!playerRes.ok) {
        throw new Error('Fehler beim Speichern in der Datenbank');
      }

      alert("Spieler erfolgreich hinzugefügt!");

      // Reset Form
      setName('');
      setBirthdate('');
      setNumber('');
      setFile(null);
      setUseDefaultImage(false);
      fetchPlayers();

    } catch (err: any) {
      alert(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Spieler wirklich löschen?")) return;

    setIsLoading(true);
    try {
      const res = await fetch(`/api/players?id=${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Löschen fehlgeschlagen');
      fetchPlayers();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1 style={{ fontWeight: 'normal', fontSize: '2.5rem', marginBottom: '2rem' }}>
        {team?.name || 'Mannschaft'}
      </h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
        
        {/* Left Column: Forms */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          {/* Add Player Form */}
          <div className="admin-dark-card">
            <h3 style={{ marginBottom: '1.5rem', fontSize: '1.1rem', fontWeight: 'normal', color: 'var(--admin-title-color)' }}>Spieler hinzufügen</h3>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              
              <div>
                <label className="admin-label">Name</label>
                <input type="text" className="admin-dark-input" value={name} onChange={(e) => setName(e.target.value)} placeholder="Vorname Nachname" required />
              </div>

              <div>
                <label className="admin-label">Position</label>
                <select className="admin-dark-input" value={position} onChange={(e) => setPosition(e.target.value)}>
                  <option value="Torwart">Torwart</option>
                  <option value="Verteidiger">Verteidiger</option>
                  <option value="Mittelfeld">Mittelfeld</option>
                  <option value="Stürmer">Stürmer</option>
                  <option value="Haupttrainer">Haupttrainer</option>
                  <option value="Assistenztrainer">Assistenztrainer</option>
                </select>
              </div>

              {(position !== 'Haupttrainer' && position !== 'Assistenztrainer') && (
                <>
                  <div>
                    <label className="admin-label">Geburtsdatum</label>
                    <input type="text" className="admin-dark-input" value={birthdate} onChange={(e) => setBirthdate(e.target.value)} placeholder="00.00.0000" required />
                  </div>

                  <div>
                    <label className="admin-label">Rückennummer</label>
                    <input type="number" className="admin-dark-input" value={number} onChange={(e) => setNumber(e.target.value)} placeholder="00" required />
                  </div>
                </>
              )}

              <div>
                <label className="admin-label">Spieler Bild</label>
                {!useDefaultImage && (
                  <input type="file" className="admin-dark-input" accept="image/png, image/jpeg" onChange={handleFileChange} />
                )}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
                  <input type="checkbox" id="useDefaultImage" checked={useDefaultImage} onChange={(e) => setUseDefaultImage(e.target.checked)} style={{ cursor: 'pointer' }} />
                  <label htmlFor="useDefaultImage" style={{ cursor: 'pointer', fontSize: '0.85rem', color: '#aaa' }}>Kein Spieler Bild vorhanden</label>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
                <button type="submit" className="admin-btn-red" disabled={isLoading}>
                  {isLoading ? 'Speichert...' : 'Spieler hinzufügen'}
                </button>
              </div>
            </form>
          </div>

          {/* Group Image Form */}
          <div className="admin-dark-card">
            <h3 style={{ marginBottom: '1.5rem', fontSize: '1.1rem', fontWeight: 'normal', color: 'var(--admin-title-color)' }}>Gruppen Bild</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label className="admin-label">Bild auswählen</label>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <input type="file" className="admin-dark-input" accept="image/png, image/jpeg" onChange={handleGroupFileChange} style={{ flex: 1 }} />
                <button onClick={handleGroupSubmit} className="admin-btn-red" disabled={isGroupLoading} style={{ padding: '0.6rem 1.2rem' }}>
                  {isGroupLoading ? '...' : 'Speichern'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Kader List */}
        <div style={{ position: 'relative' }}>
          <div className="admin-dark-card" style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '1rem', borderBottom: '1px solid var(--admin-border)', marginBottom: '1rem', color: 'var(--admin-title-color)' }}>
            <span style={{ flex: '0 0 70px' }}></span>
            <span style={{ flex: '1 1 200px' }}>Kader</span>
            <span style={{ flex: '1 1 100px' }}>Position</span>
            <span style={{ flex: '0 0 50px', textAlign: 'center' }}>#</span>
            <span style={{ flex: '0 0 100px' }}></span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', overflowY: 'auto', paddingRight: '0.5rem', flex: 1, minHeight: 0 }}>
            {players.length === 0 ? (
              <p style={{ color: '#888', padding: '1rem' }}>Keine Spieler im Kader.</p>
            ) : (
              players.map(p => (
                <div key={p.id} className="admin-kader-row">
                  <div style={{ flex: '0 0 70px', display: 'flex', justifyContent: 'flex-start' }}>
                    <img src={p.imageUrl} alt={p.name} className="admin-kader-img" />
                  </div>
                  <div style={{ flex: '1 1 200px', display: 'flex', alignItems: 'center' }}>
                    {p.name}
                  </div>
                  <div style={{ flex: '1 1 100px', display: 'flex', alignItems: 'center', color: '#aaa' }}>
                    {p.position}
                  </div>
                  <div style={{ flex: '0 0 50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {p.position === 'Haupttrainer' || p.position === 'Assistenztrainer' ? '' : `#${p.number}`}
                  </div>
                  <div style={{ flex: '0 0 100px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                    <button onClick={() => handleDelete(p.id)} className="admin-btn-red" style={{ padding: '0.4rem 1rem', fontSize: '0.85rem' }}>
                      Löschen
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        </div>

      </div>
    </div>
  );
}
