import prisma from '@/lib/prisma';
import Link from 'next/link';
import { revalidatePath } from 'next/cache';

export const metadata = {
  title: 'News Verwalten',
};

export default async function AdminNewsPage() {
  const newsList = await prisma.news.findMany({
    orderBy: { createdAt: 'desc' }
  });

  async function deleteNews(formData: FormData) {
    'use server';
    const id = formData.get('id') as string;
    if (id) {
      await prisma.news.delete({ where: { id } });
      revalidatePath('/admin/news');
      revalidatePath('/');
    }
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} className="mb-lg">
        <h1>News</h1>
        <Link href="/admin/news/new" className="admin-btn" style={{ width: 'auto', textDecoration: 'none' }}>+ Neuer Beitrag</Link>
      </div>

      {newsList.length === 0 ? (
        <p>Noch keine News vorhanden.</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Titel</th>
              <th>Autor</th>
              <th>Datum</th>
              <th>Aktionen</th>
            </tr>
          </thead>
          <tbody>
            {newsList.map((item) => (
              <tr key={item.id}>
                <td>{item.title}</td>
                <td>{item.author || '-'}</td>
                <td>{new Date(item.createdAt).toLocaleDateString('de-CH')}</td>
                <td>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <form action={deleteNews}>
                      <input type="hidden" name="id" value={item.id} />
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
