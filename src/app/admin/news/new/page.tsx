import prisma from '@/lib/prisma';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { revalidatePath } from 'next/cache';

export const metadata = {
  title: 'Neuer Beitrag',
};

export default function NewNewsPage() {
  async function createNews(formData: FormData) {
    'use server';
    const title = formData.get('title') as string;
    const author = formData.get('author') as string;
    const content = formData.get('content') as string;
    
    if (title && content) {
      await prisma.news.create({
        data: {
          title,
          author,
          content
        }
      });
      revalidatePath('/admin/news');
      revalidatePath('/');
      redirect('/admin/news');
    }
  }

  return (
    <div>
      <div className="mb-lg">
        <Link href="/admin/news" style={{ textDecoration: 'none', color: '#6b7280' }}>&larr; Zurück</Link>
        <h1 className="mt-sm">Neuen Beitrag verfassen</h1>
      </div>

      <form action={createNews} style={{ maxWidth: '800px', display: 'flex', flexDirection: 'column', gap: '1rem', background: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Titel *</label>
          <input type="text" name="title" required className="admin-input" placeholder="z.B. Sieg im Derby!" />
        </div>
        
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Autor (Optional)</label>
          <input type="text" name="author" className="admin-input" placeholder="z.B. Sportchef" />
        </div>
        
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Text (Inhalt) *</label>
          <textarea name="content" required className="admin-input" rows={10} placeholder="Der Text deines Beitrags..."></textarea>
        </div>

        <button type="submit" className="admin-btn mt-md">Veröffentlichen</button>
      </form>
    </div>
  );
}
