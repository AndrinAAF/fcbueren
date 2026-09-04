export const metadata = {
  title: 'Kalender - FC Büren an der Aare',
  description: 'Alle Termine und Spiele des FC Büren an der Aare im Überblick',
};

export default function KalenderPage() {
  // Die Vereinsnummer für den FC Büren an der Aare
  const clubId = "10206";

  return (
    <div className="page-wrapper pt-3xl pb-3xl">
      <div className="container">
        <h1 className="mb-lg">FC Büren Kalender</h1>
        <p className="mb-xl">Hier findest du alle offiziellen Spieldaten, Resultate und Termine unserer Mannschaften.</p>
        
        <div style={{ background: 'white', borderRadius: '8px', padding: '1rem', minHeight: '800px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
          <iframe 
            src={`https://matchcenter.al-la.ch/matchcenter/widget.aspx?v=${clubId}`}
            style={{ width: '100%', height: '800px', border: 'none' }}
            title="SFV Matchcenter Kalender"
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
