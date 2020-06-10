import { Club } from '../../src/types';
import { ClubService } from '../../src/services';

import './setup';

describe('Test ClubModel', () => {
  it('createOne', async () => {
    try {
      // TODO: IMPLEMENT
      const club: Club = { property: 'property' };
      const newClub = await ClubService.createOne(club);
      expect(newClub).not.toBeNull();
    } catch (err) {
      throw err;
    }
  });

  let clubId: string;
  it('findAll', async () => {
    try {
      // TODO: IMPLEMENT
      const clubs = await ClubService.findAll();
      expect(clubs.length).not.toBe(0);
      clubId = clubs[0].id;
    } catch (err) {
      throw err;
    }
  });

  it('findOneById, update and save', async () => {
    try {
      // TODO: IMPLEMENT
      const club = await ClubService.findOneById(clubId);
      if (!club) throw new Error('findOnefindOneById');

      club.property = 'updated';
      const updated = await club.save();

      expect(updated).not.toBeNull();
      expect(updated.property).toBe('updated');
    } catch (err) {
      throw err;
    }
  });

  it('deleteOne', async () => {
    try {
      // TODO: IMPLEMENT
      const result = await ClubService.deleteOne(clubId);
      expect(result.deletedCount).toEqual(1);
    } catch (err) {
      throw err;
    }
  });
});
