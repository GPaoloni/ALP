import { Club } from '../../src/types';
import { ClubModel } from '../../src/models';

import './setup';

describe('Test ClubModel', () => {
  it('create', async () => {
    try {
      // TODO: IMPLEMENT
      const club: Club = { property: 'property' };
      const newClub = await ClubModel.create(club);
      expect(newClub).not.toBeNull();
    } catch (err) {
      throw err;
    }
  });

  it('read', async () => {
    try {
      // TODO: IMPLEMENT
      const clubs = await ClubModel.find();
      expect(clubs.length).not.toBe(0);

      const club = await ClubModel.findOne({ property: 'property' });
      expect(club).not.toBeNull();
    } catch (err) {
      throw err;
    }
  });

  it('update', async () => {
    try {
      // TODO: IMPLEMENT
      const club = await ClubModel.findOne({ property: 'property' });
      if (!club) throw new Error('findOne returned null');

      club.property = 'updated';
      const updated = await club.save();
      expect(updated).not.toBeNull();
      expect(updated.property).toBe('updated');
    } catch (err) {
      throw err;
    }
  });

  it('delete', async () => {
    try {
      // TODO: IMPLEMENT
      const result = await ClubModel.deleteOne({ property: 'updated' });
      expect(result.deletedCount).toBe(1);
    } catch (err) {
      throw err;
    }
  });
});
