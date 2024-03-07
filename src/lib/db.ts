import pg from 'pg';
import { Team, Game} from '../types.js';
import { gameMapper, gamesMapper, teamsMapper } from './mapper.js';


let savedPool: pg.Pool | undefined;

export function getPool(): pg.Pool {
  if (savedPool) {
    return savedPool;
  }

  const { DATABASE_URL: connectionString } = process.env;
  if (!connectionString) {
    console.error('vantar DATABASE_URL í .env');
    throw new Error('missing DATABASE_URL');
  }

  savedPool = new pg.Pool({ connectionString });

  savedPool.on('error', (err: any) => {
    console.error('Villa í tengingu við gagnagrunn, forrit hættir', err);
    throw new Error('error in db connection');
  });

  return savedPool;
}

export async function query(
  q: string,
  values: Array<unknown> = [],
  silent = false,
) {
  const pool = getPool();

  let client;
  try {
    client = await pool.connect();
  } catch (e) {
    if (!silent) console.error('unable to get client from pool', e);
    return null;
  }

  try {
    const result = await client.query(q, values);
    return result;
  } catch (e) {
    if (!silent) console.error('unable to query', e);
    if (!silent) console.info(q, values);
    return null;
  } finally {
    client.release();
  }
}

export async function getTeams(): Promise<Array<Team> | null> {
  const result = await query('SELECT * FROM teams');

  if (!result) {
    return null;
  }

  return teamsMapper(result.rows);
}

export async function getGames(): Promise<Array<Game> | null>  {
  const result = await query('SELECT * FROM games');

  if (!result) {
    return null;
  }

  return gamesMapper(result.rows);
}

export async function getGameFromId(id: number): Promise<Game | null>  {
  const result = await query('SELECT * FROM games WHERE id = $1', [id]);

  if (!result) {
    return null;
  }

  return gameMapper(result.rows);
}

export async function createNewGame(
  date: string,
  home: string,
  away: string,
  home_score: number,
  away_score: number)
  : Promise<Game | null> {

    const result = await query('INSERT INTO GAMES (date, home, away, home_score, away_score) values ($1, $2, $3, $4, $5)')

    if (!result) {
      return null;
    }

    return gameMapper(result.rows);
}
