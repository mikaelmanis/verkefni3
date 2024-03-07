import express, { Request, Response, NextFunction} from 'express';
import { Game } from '../types.js';
import { createNewGame, deleteGameFromId, getGameFromId, getGames, updateGameById } from '../lib/db.js';


export const apiRouter = express.Router()


export async function listGames(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  const games = await getGames();

  if (!games) {
    return next(new Error('unable to get games'));
  }

  return res.json(games);
}

export async function getGame(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  const id = parseInt(req.params.id);
  const game = await getGameFromId(id)

  if (!game) {
    return next(new Error('unable to get games'));
  }

  return res.json(game);
}

export async function createGame(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  const { date, home, away, home_score, away_score } = req.body;
  const game = await createNewGame(date, home, away, home_score, away_score)

  if (!game) {
    return next(new Error('Game not made'));
  }

  if (home === away) {
    return next(new Error('Teams can not be the same'));
  }

  return res.json(game);
}

export async function updateGame(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  const { id, date, home, away, home_score, away_score } = req.body;
  const game = await updateGameById(id, date, home, away, home_score, away_score)

  if (!game) {
    return next(new Error('Game not made'));
  }

  if (home === away) {
    return next(new Error('Teams can not be the same'));
  }

  return res.json(game);
}

export async function deleteGame(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  const id = parseInt(req.params.id);
  const game = await deleteGameFromId(id)

  if (!game) {
    return next(new Error('Game not deleted'));
  }

  return res.json(game);
}



