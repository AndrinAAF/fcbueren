import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import EventFormClient from '../EventFormClient';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Veranstaltung bearbeiten',
};

export default async function EditEventPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const eventItem = await prisma.event.findUnique({ where: { id } });
  const eventRaw = eventItem ? [eventItem] : [];
  
  if (!eventRaw || eventRaw.length === 0) {
    notFound();
  }

  const event = eventRaw[0];

  return <EventFormClient initialData={event} />;
}
