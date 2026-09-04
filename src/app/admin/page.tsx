export const metadata = {
  title: 'Admin Dashboard',
};

export default function AdminPage() {
  return (
    <div>
      <h1 className="mb-lg">Willkommen im Admin-Bereich</h1>
      <p>Hier kannst du die Inhalte der Website verwalten.</p>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginTop: '2rem' }}>
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h3 className="mb-sm">Veranstaltungen</h3>
          <p className="mb-md">Verwalte die bevorstehenden Veranstaltungen für die Startseite.</p>
          <a href="/admin/events" className="admin-btn" style={{ display: 'inline-block', textAlign: 'center', textDecoration: 'none' }}>Zu den Veranstaltungen</a>
        </div>

        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h3 className="mb-sm">News & Beiträge</h3>
          <p className="mb-md">Erstelle und bearbeite News-Artikel und Matchberichte.</p>
          <a href="/admin/news" className="admin-btn" style={{ display: 'inline-block', textAlign: 'center', textDecoration: 'none', backgroundColor: '#4b5563' }}>Zu den News</a>
        </div>
      </div>
    </div>
  );
}
