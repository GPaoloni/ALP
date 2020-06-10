import { Request, Response, NextFunction } from 'express';

export const auth = (req: Request, resp: Response, next: NextFunction): void => {
  // TODO: IMPLEMENT
  next();
};

export const isAdmin = (req: Request, resp: Response, next: NextFunction): void => {
  // TODO: IMPLEMENT
  next();
};

export const isOwner = (req: Request, resp: Response, next: NextFunction): void => {
  // TODO: IMPLEMENT
  next();
};

export const isOwnerOrPlayer = (
  req: Request,
  resp: Response,
  next: NextFunction,
): void => {
  // TODO: IMPLEMENT
  next();
};

export const isPlayer = (req: Request, resp: Response, next: NextFunction): void => {
  // TODO: IMPLEMENT
  next();
};
