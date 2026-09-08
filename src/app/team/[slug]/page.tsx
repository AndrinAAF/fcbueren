import { getTeamBySlug, teamsData } from '@/lib/teamData';
import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import ScrollObserver from '@/components/ScrollObserver';

export const dynamic = 'force-dynamic';

export async function generateStaticParams() {
  return teamsData.map((team) => ({
    slug: team.slug,
  }));
}

export default async function TeamPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const team = getTeamBySlug(slug);

  if (!team) {
    notFound();
  }

  const players = await prisma.player.findMany({
    where: { teamSlug: slug },
  });

  let teamImageUrl = team.image;
  try {
    const settings = await prisma.$queryRaw<any[]>`SELECT imageUrl FROM TeamSettings WHERE teamSlug = ${slug} LIMIT 1`;
    if (settings && settings.length > 0 && settings[0].imageUrl) {
      teamImageUrl = settings[0].imageUrl;
    }
  } catch (e) {
    console.error("Could not fetch team settings:", e);
  }

  const positionOrder: Record<string, number> = {
    'Haupttrainer': 1,
    'Assistenztrainer': 2,
    'Torwart': 3,
    'Verteidiger': 4,
    'Mittelfeld': 5,
    'Stürmer': 6
  };

  players.sort((a, b) => {
    const orderA = positionOrder[a.position] || 99;
    const orderB = positionOrder[b.position] || 99;
    if (orderA !== orderB) return orderA - orderB;
    return a.number - b.number;
  });

  const trainers = players.filter(p => p.position === 'Haupttrainer' || p.position === 'Assistenztrainer');
  const squad = players.filter(p => p.position !== 'Haupttrainer' && p.position !== 'Assistenztrainer');

  return (
    <>
      <ScrollObserver />
      <section className="container py-xl" style={{ flex: 1, position: 'relative' }}>
        
        {/* BACKGROUND WATERMARK FOR 1. MANNSCHAFT */}
        {team.name.includes('1.') && (
          <>
            <style>{`
              body::before {
                display: none !important;
              }
            `}</style>
            <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', opacity: 0.12, pointerEvents: 'none', zIndex: -1, width: '90%', maxWidth: '900px', display: 'flex', justifyContent: 'center' }}>
              <img src="/assets/images/mainSponsors/bigler.svg" alt="" style={{ width: '100%', height: 'auto', objectFit: 'contain' }} />
            </div>
          </>
        )}

        <div className="text-center mb-xl animate-on-scroll">
          <h1 style={{ color: 'var(--clr-primary)', fontStyle: 'italic', marginBottom: '1.5rem', fontWeight: 900, fontSize: 'clamp(3rem, 6vw, 4.5rem)' }}>
            {team.name}{team.league ? ` (${team.league})` : ''}
          </h1>
        </div>
        
        {/* TRAINER SECTION */}
        {trainers.length > 0 && (
          <div className="mb-xl" style={{ marginBottom: '8rem' }}>
            <h2 className="mb-sm text-center animate-on-scroll" style={{ fontStyle: 'italic', color: 'var(--clr-text)', fontWeight: 900, fontSize: 'clamp(2.5rem, 4vw, 3.5rem)' }}>Trainer</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, 280px)', justifyContent: 'center', gap: '3rem 2rem' }}>
              {trainers.map(player => (
                <div key={player.id} className="player-card-wrapper animate-on-scroll">
                  <div className="player-card-bg">
                    <img src={player.imageUrl} alt={player.name} className="player-image" />
                  </div>
                  <div className="player-card-info">
                    <img src="/buerenLogo.png" alt="FC Büren" className="player-card-logo" />
                    <div className="player-card-text-container" style={{ justifyContent: 'center' }}>
                      <p className="player-card-name">{player.name}</p>
                      <p className="player-card-position">{player.position}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SQUAD SECTION */}
        {squad.length > 0 && (
          <div className="mb-xl" style={{ marginBottom: '8rem' }}>
            <h2 className="mb-sm text-center animate-on-scroll" style={{ fontStyle: 'italic', color: 'var(--clr-text)', fontWeight: 900, fontSize: 'clamp(2.5rem, 4vw, 3.5rem)' }}>Spieler</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, 280px)', justifyContent: 'center', gap: '3rem 2rem' }}>
              {squad.map(player => (
                <div key={player.id} className="player-card-wrapper animate-on-scroll">
                  <div className="player-card-bg">
                    <img src={player.imageUrl} alt={player.name} className="player-image" />
                  </div>
                  <div className="player-card-info">
                    <img src="/buerenLogo.png" alt="FC Büren" className="player-card-logo" />
                    <div className="player-card-text-container">
                      <p className="player-card-name">{player.name}</p>
                      <p className="player-card-position">{player.position}</p>
                      <p className="player-card-date">{player.birthdate}</p>
                    </div>
                    <div className="player-card-number-container">
                      <p className="player-card-number">#{player.number}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TEAM PHOTO SECTION */}
        <div className="animate-on-scroll" style={{ width: '100%', maxWidth: '800px', margin: '0 auto 4rem auto', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.5)', display: 'flex', flexDirection: 'column' }}>
          
          {/* Photo Area */}
          <div style={{ aspectRatio: '16/9', background: '#d9d9d9', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {teamImageUrl ? (
               <img src={teamImageUrl} alt={`Mannschaftsfoto ${team.name}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <div style={{ textAlign: 'center', color: '#888' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '1rem', opacity: 0.5 }}><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
              </div>
            )}
          </div>
          
          {/* Red Footer Bar */}
          <div style={{ background: '#c1272d', padding: '1rem', textAlign: 'center' }}>
            <h3 style={{ color: 'white', fontStyle: 'italic', margin: 0, fontSize: '1.2rem', fontWeight: 800 }}>Gruppen Foto 2026/27</h3>
          </div>
          
        </div>
      </section>
    </>
  );
}
