"use client";

import React, { useState, useEffect } from 'react';

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
  const [players, setPlayers] = useState<Player[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [teamSlug, setTeamSlug] = useState('1-mannschaft');

  // Form State
  const [name, setName] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [position, setPosition] = useState('Torwart');
  const [number, setNumber] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [useDefaultImage, setUseDefaultImage] = useState(false);

  // Load players on mount (mock fetch for now, you will need to create a GET route or server action to fetch players)
  useEffect(() => {
    fetchPlayers();
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

      // 2. Save Player to DB using a Server Action (which we will create next)
      // Since this is a client component, we will use an API route or Server Action.
      // Let's assume we have an API route `/api/players` for POST.
      const isTrainer = position === 'Haupttrainer' || position === 'Assistenztrainer';
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
    <div className="container py-xl">
      <h1 className="mb-lg">Spieler Verwalten</h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '3rem' }}>

        {/* FORM */}
        <div style={{ background: 'var(--clr-surface)', padding: '2rem', borderRadius: 'var(--radius-md)' }}>
          <h3>Neuen Spieler erfassen</h3>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.5rem' }}>

            <div>
              <label className="mb-xs" style={{ display: 'block', fontWeight: 'bold' }}>Team</label>
              <select value={teamSlug} onChange={(e) => setTeamSlug(e.target.value)} style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)' }}>
                <option value="1-mannschaft">1. Mannschaft</option>
                <option value="2-mannschaft">2. Mannschaft</option>
                <option value="haeftli-b">Team Häftli B</option>
                <option value="haeftli-c">Team Häftli C</option>
              </select>
            </div>

            <div>
              <label className="mb-xs" style={{ display: 'block', fontWeight: 'bold' }}>Name (Vorname Nachname)</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="z. B. Noe Fankhauser" required style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)' }} />
            </div>

            <div>
              <label className="mb-xs" style={{ display: 'block', fontWeight: 'bold' }}>Position</label>
              <select value={position} onChange={(e) => setPosition(e.target.value)} style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)' }}>
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
                  <label className="mb-xs" style={{ display: 'block', fontWeight: 'bold' }}>Geburtsdatum</label>
                  <input type="text" value={birthdate} onChange={(e) => setBirthdate(e.target.value)} placeholder="z. B. 02.10.2002" required style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)' }} />
                </div>

                <div>
                  <label className="mb-xs" style={{ display: 'block', fontWeight: 'bold' }}>Rückennummer</label>
                  <input type="number" value={number} onChange={(e) => setNumber(e.target.value)} placeholder="z. B. 1" required style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)' }} />
                </div>
              </>
            )}


            {!useDefaultImage && (
              <div style={{ marginTop: '1rem' }}>
                <label className="mb-xs" style={{ display: 'block', fontWeight: 'bold' }}>Bild (PNG freigestellt)</label>
                <input type="file" accept="image/png, image/jpeg" onChange={handleFileChange} style={{ width: '100%', padding: '0.6rem', borderRadius: 'var(--radius-sm)', background: 'var(--clr-bg)', border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer' }} />
              </div>
            )}

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
              <input type="checkbox" id="useDefaultImage" checked={useDefaultImage} onChange={(e) => setUseDefaultImage(e.target.checked)} style={{ width: '1.2rem', height: '1.2rem', cursor: 'pointer' }} />
              <label htmlFor="useDefaultImage" style={{ cursor: 'pointer' }}>Kein Bild vorhanden (Standardbild verwenden)</label>
            </div>

            <button type="submit" className="btn mt-sm" disabled={isLoading}>
              {isLoading ? 'Speichert...' : 'Spieler hinzufügen'}
            </button>
          </form>
        </div>

        {/* LIST */}
        <div style={{ background: 'var(--clr-surface)', padding: '2rem', borderRadius: 'var(--radius-md)' }}>
          <h3>Kader: {teamSlug}</h3>
          {players.length === 0 ? (
            <p className="text-muted mt-md">Noch keine Spieler für dieses Team erfasst. (Hinweis: Die Anzeige ist noch nicht verbunden. API Route fehlt noch!)</p>
          ) : (
            <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {players.map(p => (
                <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'var(--clr-bg)', padding: '1rem', borderRadius: 'var(--radius-sm)' }}>
                  <img src={p.imageUrl} alt={p.name} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '50%', background: '#333' }} />
                  <div style={{ flex: 1 }}>
                    <strong>{p.name}</strong> (#{p.number})
                    <p style={{ fontSize: '0.85rem', color: 'var(--clr-primary)' }}>{p.position}</p>
                  </div>
                  <button onClick={() => handleDelete(p.id)} className="btn-secondary" style={{ padding: '0.5rem' }}>Löschen</button>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
