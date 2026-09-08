import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import EventFormClient from '../EventFormClient';

export const metadata = {
  title: 'Veranstaltung bearbeiten',
};

export default async function EditEventPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const eventRaw = await prisma.$queryRaw<any[]>`
    SELECT id, title, date, description, content, address, imageUrl, linkUrl
    FROM Event 
    WHERE id = ${id}
    LIMIT 1
  `;
  
  if (!eventRaw || eventRaw.length === 0) {
    notFound();
  }

  const event = eventRaw[0];

  return <EventFormClient initialData={event} />;
}
