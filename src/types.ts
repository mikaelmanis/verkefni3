export type Team = {
  id: number;
  name: string;
  slug: string;
  description?: string;
}

export type Game = {
  id: number;
  date: string;
  home: string;
  away: string;
  home_score: number;
  away_score: number;
}


