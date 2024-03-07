import express, { Request, Response, NextFunction } from 'express';
import { createTeam, deleteTeam, getTeam, listTeams, updateTeam } from './teams.js';
import { createGame, deleteGame, getGame, listGames, updateGame } from './games.js';


export const router = express.Router();

export async function index(req: Request, res: Response) {
  return res.json([
    {
      teams: '/teams',
      methods: ['GET', 'POST'],
    },
    {
      teamSlug: '/teams/:slug',
      methods: ['GET', 'PATCH', 'DELETE'],
    },
    {
      games: '/games',
      methods: ['GET', 'POST'],
    },
    {
      gameSlug: '/games/:id',
      methods: ['GET', 'PATCH', 'DELETE'],
    },
  ]);
}

export async function error() {
  throw new Error('error');
}

// Teams
router.get('/', index);
router.get('/teams', listTeams);
/*router.post('/teams', createTeam);
router.get('/teams/:slug', getTeam);
router.patch('/teams/:slug', updateTeam);
router.delete('/teams/:slug', deleteTeam);*/



// Games
router.get('/games', listGames);
/*router.post('/games', createGame);
router.get('/games/:id', getGame);
router.patch('/games/:id', updateGame);
router.delete('/games/:id', deleteGame);*/
