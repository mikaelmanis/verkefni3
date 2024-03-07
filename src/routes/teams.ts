import express, { Request, Response, NextFunction} from 'express';
import slugify from 'slugify';
import { Team } from '../types.js';
import { createNewTeam, deleteTeamFromSlug, getTeamFromSlug, getTeams, updateTeamBySlug } from '../lib/db.js';

export const teamsRouter = express.Router()


export async function listTeams(req: Request, res: Response, next: NextFunction): Promise<Response | void>  {

  const teams = await getTeams();

  if (!teams) {
    return next(new Error('Unable to get teams'));
  }

  return res.json(teams);
}

export async function getTeam(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  const slug = req.params.slug;
  const team = await getTeamFromSlug(slug)

  if (!team) {
    return next(new Error('Unable to get team'));
  }

  return res.json(team);

}

export async function createTeam(req: Request, res: Response, next: NextFunction): Promise<Response | void>  {
  const name = req.body.name;
  const slug = slugify(name, { lower: true });
  const description = req.body.description;
  const team = await createNewTeam(name, slug, description)

  if (!team) {
    return next(new Error('Team not created'));
  }

  return res.json(team);

}

export async function updateTeam(req: Request, res: Response, next: NextFunction): Promise<Response | void>  {
  const name = req.body.name;
  const slug = req.params.slug;
  const description = req.body.description;
  const team = await updateTeamBySlug(name, slug, description)
  console.log(team);
  if (!team) {
    return next(new Error('Team not updated'));
  }

  return res.json(team);
}

export async function deleteTeam(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  const slug = req.params.slug;
  const team = await deleteTeamFromSlug(slug)
  
  if (!team) {
    return next(new Error('Game not deleted'));
  }

  return res.json(team);
}


