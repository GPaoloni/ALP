import * as mongoose from 'mongoose';
import { Club } from '../types';

export type ClubType = Club & mongoose.Document;

const ClubSchema = new mongoose.Schema(
  {
    // TODO: IMPLEMENT
    property: { type: String },
  },
  { timestamps: true },
);

const ClubRepository = mongoose.model<ClubType>('Club', ClubSchema);
export default ClubRepository;
