import express, { Request, Response, NextFunction} from 'express';
import slugify from 'slugify';
import { Team } from '../types.js';
import { getTeams } from '../lib/db.js';

export const teamsRouter = express.Router()


export async function listTeams(req: Request, res: Response, next: NextFunction): Promise<Response | void>  {

  const teams = await getTeams();

  if (!teams) {
    return next(new Error('unable to get teams'));
  }

  return res.json(teams);
}

export async function getTeam() {

}

export async function createTeam() {

}

export async function updateTeam() {

}

export async function deleteTeam() {

}


