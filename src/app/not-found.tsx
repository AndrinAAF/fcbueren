import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '80vh', padding: '2rem' }}>
      
      <div className="pitch-container">
        {/* Pitch Lines */}
        <div className="pitch-line center-line"></div>
        <div className="pitch-line center-circle"></div>
        <div className="center-spot"></div>
        
        <div className="pitch-line pen-box-l"></div>
        <div className="pitch-line goal-box-l"></div>
        <div className="pitch-line pen-arc-l"></div>
        <div className="pen-spot-l"></div>
        
        <div className="pitch-line pen-box-r"></div>
        <div className="pitch-line goal-box-r"></div>
        <div className="pitch-line pen-arc-r"></div>
        <div className="pen-spot-r"></div>

        {/* Content */}
        <div className="not-found-content">
          <h1 className="not-found-title">404</h1>
          <div style={{ marginTop: '0.5rem' }}>
            <img src="/buerenLogo.png" alt="FC Büren" style={{ width: '80px', filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.3))' }} />
          </div>
        </div>
      </div>

      <div style={{ marginTop: '3rem', textAlign: 'center' }}>
        <h2 className="mb-sm">Abseits!</h2>
        <p className="mb-md text-muted" style={{ maxWidth: '400px' }}>Diese Seite existiert nicht, der Ball ist im Aus oder der Schiedsrichter hat die Partie abgebrochen.</p>
        <Link href="/" className="btn">
          Zurück aufs Spielfeld
        </Link>
      </div>
    </div>
  );
}
