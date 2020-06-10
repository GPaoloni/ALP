import * as bcrypt from 'bcrypt-nodejs';
import * as util from 'util';
import { User } from '../types';
import UserRepository from '../models/user.model';

/**
 * @description Fetches single user from the storage by email
 * @param email
 * @returns {Promise<User>}
 */
export const findByEmail = async (email: string): Promise<User> => {
  const user = (await UserRepository.findOne({ email })) as User;
  return user;
};

/**
 * @description Fetches single user from the storage by email or username
 * @param username
 * @param email
 * @returns {Promise<User>}
 */
export const findByUsernameOrEmail = async (
  email: string,
  username?: string,
): Promise<User> => {
  const user = (await UserRepository.findOne({
    $or: [{ email }, { username }],
  })) as User;
  return user;
};

/**
 * @description Saves the user in the storage
 * @param {User} user
 * @returns {Promise<User>}
 */
export const save = async (user: User): Promise<User> => {
  return (await new UserRepository(user).save()).toObject({ virtuals: true });
};

/**
 * @description Fetches single user by activationToken and sets active flag
 * @param activationToken
 * @returns {Promise<User>}
 */
export const findOneAndActivate = async (activationToken: string): Promise<User> => {
  const user = (await UserRepository.findOneAndUpdate(
    { activationToken: activationToken },
    { active: true },
    { new: true },
  )) as User;
  return user;
};

/**
 * @description Fetches all users from the storage
 * @returns {Promise<User[]>}
 */
export const findAll = async (): Promise<User[]> => {
  return (await UserRepository.find()) as User[];
};

/**
 * @description Deletes a single user from storage
 * @returns {Promise<void>}
 */
export const deleteOne = async (username: string): Promise<void> => {
  await UserRepository.deleteOne({ username: username });
};

/**
 * @description Compares encrypted and decrypted passwords
 * @param {string} candidatePassword
 * @param storedPassword
 * @returns {boolean}
 */
export const comparePassword = async (
  email: string,
  candidatePassword: string,
): Promise<boolean> => {
  const user = await UserRepository.findOne({ email }).select('+password');
  if (!user || !user.password) return false;
  const qCompare = util.promisify(bcrypt.compare);
  return qCompare(candidatePassword, user.password);
};

export default {
  findByEmail,
  findByUsernameOrEmail,
  save,
  findOneAndActivate,
  findAll,
  deleteOne,
  comparePassword,
};
