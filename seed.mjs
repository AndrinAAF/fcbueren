import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Create 2 Dummy Events
  await prisma.event.create({
    data: {
      title: 'Generalversammlung 2026',
      date: new Date(new Date().setDate(new Date().getDate() + 14)), // in 14 days
      description: 'Unsere jährliche GV im Clubhaus. Alle Mitglieder sind herzlich eingeladen.',
      linkUrl: 'https://www.instagram.com/fcbueren/'
    }
  });

  await prisma.event.create({
    data: {
      title: 'Grosses Sommerfest',
      date: new Date(new Date().setDate(new Date().getDate() + 45)), // in 45 days
      description: 'Das Highlight des Jahres auf dem Sportplatz Lachen.',
    }
  });

  // Create 2 Dummy News
  await prisma.news.create({
    data: {
      title: 'Sieg im Derby gegen Lyss!',
      content: 'Was für ein Spiel! Unsere 1. Mannschaft gewinnt das hart umkämpfte Derby gegen den FC Lyss mit 2:1. Nach einem frühen Rückstand bewies das Team unglaubliche Moral.',
      author: 'Sportchef',
      views: 142,
      likes: 34
    }
  });

  await prisma.news.create({
    data: {
      title: 'Neue Juniorentrainer gesucht',
      content: 'Für die kommende Saison suchen wir noch motivierte Trainer für unsere F- und G-Junioren. Meldet euch beim Vorstand!',
      author: 'Vorstand',
      views: 89,
      likes: 12
    }
  });

  console.log('Dummy-Daten erfolgreich erstellt!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
