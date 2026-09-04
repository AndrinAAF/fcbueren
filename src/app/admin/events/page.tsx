import prisma from '@/lib/prisma';
import Link from 'next/link';
import { revalidatePath } from 'next/cache';

export const metadata = {
  title: 'Veranstaltungen Verwalten',
};

export default async function AdminEventsPage() {
  const events = await prisma.event.findMany({
    orderBy: { date: 'asc' }
  });

  async function deleteEvent(formData: FormData) {
    'use server';
    const id = formData.get('id') as string;
    if (id) {
      await prisma.event.delete({ where: { id } });
      revalidatePath('/admin/events');
      revalidatePath('/');
    }
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} className="mb-lg">
        <h1>Veranstaltungen</h1>
        <Link href="/admin/events/new" className="admin-btn" style={{ width: 'auto', textDecoration: 'none' }}>+ Neue Veranstaltung</Link>
      </div>

      {events.length === 0 ? (
        <p>Noch keine Veranstaltungen vorhanden.</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Titel</th>
              <th>Datum</th>
              <th>Aktionen</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.id}>
                <td>{event.title}</td>
                <td>{new Date(event.date).toLocaleDateString('de-CH')}</td>
                <td>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <form action={deleteEvent}>
                      <input type="hidden" name="id" value={event.id} />
                      <button type="submit" className="admin-action-btn delete" onClick={(e) => {
                        if (!confirm('Wirklich löschen?')) e.preventDefault();
                      }}>Löschen</button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
