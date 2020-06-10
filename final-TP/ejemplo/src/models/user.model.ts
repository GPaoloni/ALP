import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt-nodejs';
import { User } from '../types';

export type UserType = User & mongoose.Document;

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, unique: true },
    username: String,
    password: {
      type: String,
      select: false,
    },
    role: String,

    active: Boolean,

    passwordResetToken: String,
    passwordResetExpires: Date,

    activationToken: String,
    activationExpires: Date,

    profile: {
      fname: String,
      lname: String,
      info: String,
    },
  },
  { timestamps: true },
);

/**
 * Password hash middleware.
 */
UserSchema.pre('save', function save(next) {
  const user = this as UserType;
  if (!user.isModified('password')) {
    return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, null, (err: mongoose.Error, hash) => {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});

const UserRepository = mongoose.model<UserType>('User', UserSchema);
export default UserRepository;
