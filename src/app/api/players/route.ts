import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { unlink } from 'fs/promises';
import { join } from 'path';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const teamSlug = searchParams.get('teamSlug');

  try {
    const players = await prisma.player.findMany({
      where: teamSlug ? { teamSlug } : undefined,
    });

    const positionOrder: Record<string, number> = {
      'Haupttrainer': 1,
      'Assistenztrainer': 2,
      'Torwart': 3,
      'Verteidiger': 4,
      'Mittelfeld': 5,
      'Stürmer': 6
    };

    players.sort((a, b) => {
      const orderA = positionOrder[a.position] || 99;
      const orderB = positionOrder[b.position] || 99;
      if (orderA !== orderB) return orderA - orderB;
      return a.number - b.number;
    });

    return NextResponse.json(players);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch players' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { teamSlug, name, birthdate, position, number, imageUrl } = body;

    const player = await prisma.player.create({
      data: {
        teamSlug,
        name,
        birthdate,
        position,
        number,
        imageUrl,
      }
    });

    return NextResponse.json(player);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create player' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'ID is required' }, { status: 400 });
  }

  try {
    // 1. Fetch the player first to get the image URL
    const player = await prisma.player.findUnique({
      where: { id }
    });

    if (!player) {
      return NextResponse.json({ error: 'Player not found' }, { status: 404 });
    }

    // 2. Delete the player from the database
    await prisma.player.delete({
      where: { id }
    });

    // 3. If the image is in the uploads folder, delete it from the file system
    if (player.imageUrl && player.imageUrl.startsWith('/uploads/')) {
      try {
        const filename = player.imageUrl.replace('/uploads/', '');
        const filePath = join(process.cwd(), 'public', 'uploads', filename);
        await unlink(filePath);
      } catch (err) {
        console.error('Failed to delete image file:', err);
        // We still return success since the DB record was deleted
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting player:', error);
    return NextResponse.json({ error: 'Failed to delete player' }, { status: 500 });
  }
}
