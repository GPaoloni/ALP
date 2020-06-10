import { Request, Response } from 'express';
// import { ClubService } from '../services';

// /clubs
export const findAll = async (req: Request, res: Response): Promise<void> => {
  try {
    // TODO: IMPLEMENT
    res.status(501).send({ msg: 'Not Implemented', status: 501 });
  } catch (error) {
    res.status(501).send({
      error: error,
    });
  }
};

export const createOne = async (req: Request, res: Response): Promise<void> => {
  try {
    // TODO: IMPLEMENT
    res.status(501).send({ msg: 'Not Implemented', status: 501 });
  } catch (error) {
    res.status(501).send({
      error: error,
    });
  }
};

export const deleteAll = async (req: Request, res: Response): Promise<void> => {
  try {
    // TODO: IMPLEMENT
    res.status(501).send({ msg: 'Not Implemented', status: 501 });
  } catch (error) {
    res.status(501).send({
      error: error,
    });
  }
};

// /clubs/:Id
export const findOne = async (req: Request, res: Response): Promise<void> => {
  try {
    // TODO: IMPLEMENT
    res.status(501).send({ msg: 'Not Implemented', status: 501 });
  } catch (error) {
    res.status(501).send({
      error: error,
    });
  }
};

export const updateOne = async (req: Request, res: Response): Promise<void> => {
  try {
    // TODO: IMPLEMENT
    res.status(501).send({ msg: 'Not Implemented', status: 501 });
  } catch (error) {
    res.status(501).send({
      error: error,
    });
  }
};

export const deleteOne = async (req: Request, res: Response): Promise<void> => {
  try {
    // TODO: IMPLEMENT
    res.status(501).send({ msg: 'Not Implemented', status: 501 });
  } catch (error) {
    res.status(501).send({
      error: error,
    });
  }
};

// /clubs/:Id/teams
export const findTeams = async (req: Request, res: Response): Promise<void> => {
  try {
    // TODO: IMPLEMENT
    res.status(501).send({ msg: 'Not Implemented', status: 501 });
  } catch (error) {
    res.status(501).send({
      error: error,
    });
  }
};

export const createTeam = async (req: Request, res: Response): Promise<void> => {
  try {
    // TODO: IMPLEMENT
    res.status(501).send({ msg: 'Not Implemented', status: 501 });
  } catch (error) {
    res.status(501).send({
      error: error,
    });
  }
};

export default {
  findAll,
  createOne,
  deleteAll,
  findOne,
  updateOne,
  deleteOne,
  findTeams,
  createTeam,
};
