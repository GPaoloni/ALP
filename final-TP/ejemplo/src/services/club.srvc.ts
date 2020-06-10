import { Club } from '../types';
import ClubModel, { ClubType } from '../models/club.model';

/**
 * @description Creates a club if not exists
 */
export const createOne = async (club: Club): Promise<ClubType> => {
  const saved = await ClubModel.create(club);
  return saved;
};

/**
 * @description Fetches single club from the storage by id
 */
export const findOneById = async (id: string): Promise<ClubType | null> => {
  const club = await ClubModel.findById(id);

  return club;
};

/**
 * @description Fetches all clubs from the storage
 */
export const findAll = async (): Promise<ClubType[]> => {
  const clubs = await ClubModel.find();
  return clubs;
};

/**
 * @description Saves the club in the storage
 */
export const save = async (club: ClubType): Promise<ClubType> => {
  const updated = (await club.save()).toObject({ virtuals: true });
  return updated;
};

/**
 * @description Deletes a single club from storage
 */
export const deleteOne = async (
  id: string,
): Promise<
  {
    ok?: number | undefined;
    n?: number | undefined;
  } & {
    deletedCount?: number | undefined;
  }
> => {
  const result = await ClubModel.deleteOne({ _id: id });
  return result;
};

export default {
  createOne,
  findOneById,
  findAll,
  save,
  deleteOne,
};
