type AuthToken = {
  accessToken: string;
  kind: string;
};

interface Profile {
  info: string;
  fname: string;
  lname: string;
}

export default interface User {
  email: string;
  password: string;
  username?: string;
  role?: string;

  active?: boolean;

  passwordResetToken?: string;
  passwordResetExpires?: Date;

  activationToken?: string;
  activationExpires?: Date;

  tokens?: Array<AuthToken>;

  profile?: Profile;
}
