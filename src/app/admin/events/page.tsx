import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import EventsListClient from './EventsListClient';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Veranstaltungen Verwalten',
};

export default async function AdminEventsPage() {
  const events = await prisma.$queryRaw<any[]>`
    SELECT id, title, date, address
    FROM Event
    ORDER BY date ASC
  `;

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
    <EventsListClient initialEvents={events} deleteAction={deleteEvent} />
  );
}

