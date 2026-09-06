import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import AdminSidebar from './AdminSidebar';
import './admin.css';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const isAuthenticated = cookieStore.get('admin_token')?.value === 'true';

  if (!isAuthenticated) {
    return (
      <div className="admin-login-wrapper">
        <div className="admin-login-container">
          <h1 className="mb-md">Admin Login</h1>
          <form action={async (formData) => {
            'use server';
            const password = formData.get('password');
            if (password === 'fcbueren2026') { // Very simple password for now
              const cookieStore = await cookies();
              cookieStore.set('admin_token', 'true', { secure: process.env.NODE_ENV === 'production', httpOnly: true });
              redirect('/admin');
            } else {
              redirect('/admin?error=1');
            }
          }}>
            <input type="password" name="password" placeholder="Passwort" required className="admin-input mb-md" />
            <button type="submit" className="admin-btn">Login</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-layout">
      <AdminSidebar>
        <div style={{ marginTop: 'auto', paddingTop: '2rem', borderTop: '1px solid #444444' }}>
          <form action={async () => {
            'use server';
            const cookieStore = await cookies();
            cookieStore.delete('admin_token');
            redirect('/admin');
          }}>
            <button type="submit" className="admin-logout-btn">Abmelden</button>
          </form>
        </div>
      </AdminSidebar>
      
      <main className="admin-main">
        {children}
      </main>
    </div>
  );
}
