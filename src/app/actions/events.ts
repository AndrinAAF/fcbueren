'use server';

import prisma from '@/lib/prisma';

const EVENTS_PER_PAGE = 3;

export async function getEventsPage(pageNumber: number) {
  try {
    const skip = (pageNumber - 1) * EVENTS_PER_PAGE;
    
    // We fetch upcoming events, ordered by date ascending
    const events = await prisma.event.findMany({
      orderBy: { date: 'asc' },
      where: {
        date: {
          gte: new Date()
        }
      },
      take: EVENTS_PER_PAGE,
      skip: skip
    });

    // We must serialize the dates so they can be passed to Client Components
    return events.map(e => ({
      ...e,
      date: e.date.toISOString(),
      createdAt: e.createdAt.toISOString(),
      updatedAt: e.updatedAt.toISOString(),
    }));
  } catch (error) {
    console.error("Failed to fetch events page in server action", error);
    throw new Error("Fehler beim Laden der Veranstaltungen");
  }
}
