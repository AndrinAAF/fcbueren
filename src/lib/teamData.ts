export interface Team {
  slug: string;
  name: string;
  category: 'Aktive' | 'Junioren';
  league?: string;
  instagram?: string;
  image?: string;
  description?: string;
}

export const teamsData: Team[] = [
  // Aktive
  {
    slug: '1-mannschaft',
    name: '1. Mannschaft',
    category: 'Aktive',
    league: '4. Liga',
    instagram: 'https://www.instagram.com/fcbueren/',
    description: 'Das Aushängeschild des FC Büren an der Aare. Unsere 1. Mannschaft spielt in der 4. Liga.',
  },
  {
    slug: '2-mannschaft',
    name: '2. Mannschaft',
    category: 'Aktive',
    league: '5. Liga',
    instagram: 'https://www.instagram.com/fcbueren/',
    description: 'Die 2. Mannschaft kämpft in der 5. Liga um jeden Punkt.',
  },
  {
    slug: 'ue40',
    name: 'Senioren Ü40+',
    category: 'Aktive',
    league: 'Senioren 7/7',
    description: 'Unsere Routiniers. Fussball aus Leidenschaft, auch wenn die Knochen manchmal knacken.',
  },

  // Junioren
  {
    slug: 'haeftli-b',
    name: 'Team Häftli B',
    category: 'Junioren',
    league: '1. Stärkeklasse',
    instagram: 'https://www.instagram.com/team_haeftli_b/',
    description: 'Das Team Häftli B Junioren. Spielgemeinschaft in der 1. Stärkeklasse.',
  },
  {
    slug: 'haeftli-c',
    name: 'Team Häftli C',
    category: 'Junioren',
    league: '2. Stärkeklasse',
    description: 'Unsere C-Junioren in der Spielgemeinschaft Team Häftli.',
  },
  {
    slug: 'haeftli-d9',
    name: 'Team Häftli D/9',
    category: 'Junioren',
    description: 'D-Junioren (9er Fussball) der Spielgemeinschaft Team Häftli.',
  },
  {
    slug: 'haeftli-d7',
    name: 'Team Häftli D/7',
    category: 'Junioren',
    description: 'D-Junioren (7er Fussball) der Spielgemeinschaft Team Häftli.',
  },
  {
    slug: 'bueren-e',
    name: 'Büren E Junioren',
    category: 'Junioren',
    description: 'Unsere aufstrebenden Talente bei den E-Junioren.',
  },
  {
    slug: 'bueren-fg',
    name: 'Büren F/G Junioren',
    category: 'Junioren',
    description: 'Die jüngsten Kicker des FC Büren an der Aare. Spass am Fussball steht an erster Stelle!',
  },
];

export function getTeamBySlug(slug: string): Team | undefined {
  return teamsData.find(team => team.slug === slug);
}

export function getTeamsByCategory(category: 'Aktive' | 'Junioren'): Team[] {
  return teamsData.filter(team => team.category === category);
}
