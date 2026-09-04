import { getTeamBySlug, teamsData } from '@/lib/teamData';
import { notFound } from 'next/navigation';
import Link from 'next/link';

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

  return (
    <section className="container py-xl" style={{ flex: 1 }}>
      <div className="text-center mb-xl">
        <h1 style={{ textTransform: 'uppercase', marginBottom: '0.5rem' }}>{team.name}</h1>
        {team.league && <p style={{ fontWeight: 'bold', color: 'var(--clr-primary)', marginBottom: '1rem' }}>{team.league}</p>}
        {team.description && <p style={{ maxWidth: '600px', margin: '0 auto' }}>{team.description}</p>}
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', marginBottom: '4rem' }}>
        
        {/* Placeholder for Team Image */}
        <div style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', boxShadow: 'var(--shadow-sm)', aspectRatio: '16/9', position: 'relative', background: 'var(--clr-surface)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {team.image ? (
             <img src={team.image} alt={`Mannschaftsfoto ${team.name}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <div style={{ textAlign: 'center', padding: '2rem', opacity: 0.5 }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '1rem' }}><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
              <p>Mannschaftsfoto folgt</p>
            </div>
          )}
        </div>
        
        {/* Team Infos and Links */}
        <div style={{ background: 'var(--clr-surface)', padding: '2rem', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)', alignSelf: 'start' }}>
          <h3 className="mb-md">Informationen</h3>
          <p className="mb-sm"><strong>Kategorie:</strong> {team.category}</p>
          {team.league && <p className="mb-sm"><strong>Liga:</strong> {team.league}</p>}
          
          {team.instagram && (
            <div className="mt-lg">
              <a href={team.instagram} target="_blank" rel="noopener noreferrer" className="btn" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)', color: 'white', border: 'none' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                Auf Instagram folgen
              </a>
            </div>
          )}
          
          <div className="mt-lg p-md" style={{ background: 'var(--clr-bg)', borderRadius: 'var(--radius-sm)' }}>
             <p style={{ fontSize: '0.875rem' }}><em>Hier können später automatische Spieldaten oder Tabellen für dieses Team integriert werden.</em></p>
          </div>
        </div>
      </div>
    </section>
  );
}
