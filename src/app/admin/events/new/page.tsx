import prisma from '@/lib/prisma';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { revalidatePath } from 'next/cache';

export const metadata = {
  title: 'Neue Veranstaltung',
};

export default function NewEventPage() {
  async function createEvent(formData: FormData) {
    'use server';
    const title = formData.get('title') as string;
    const dateStr = formData.get('date') as string;
    const description = formData.get('description') as string;
    const linkUrl = formData.get('linkUrl') as string;
    
    if (title && dateStr) {
      await prisma.event.create({
        data: {
          title,
          date: new Date(dateStr),
          description,
          linkUrl
        }
      });
      revalidatePath('/admin/events');
      revalidatePath('/');
      redirect('/admin/events');
    }
  }

  return (
    <div>
      <div className="mb-lg">
        <Link href="/admin/events" style={{ textDecoration: 'none', color: '#6b7280' }}>&larr; Zurück</Link>
        <h1 className="mt-sm">Neue Veranstaltung hinzufügen</h1>
      </div>

      <form action={createEvent} style={{ maxWidth: '600px', display: 'flex', flexDirection: 'column', gap: '1rem', background: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Titel *</label>
          <input type="text" name="title" required className="admin-input" placeholder="z.B. Generalversammlung 2026" />
        </div>
        
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Datum *</label>
          <input type="date" name="date" required className="admin-input" />
        </div>
        
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Beschreibung (Kurz)</label>
          <textarea name="description" className="admin-input" rows={4} placeholder="Kurze Beschreibung des Events..."></textarea>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Link (Optional)</label>
          <input type="url" name="linkUrl" className="admin-input" placeholder="https://..." />
        </div>

        <button type="submit" className="admin-btn mt-md">Speichern</button>
      </form>
    </div>
  );
}
