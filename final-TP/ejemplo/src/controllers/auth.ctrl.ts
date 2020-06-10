import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import * as util from 'util';
import * as crypto from 'crypto';
// import * as nodemailer from 'nodemailer';
// import * as chalk from 'chalk';
import { check, validationResult } from 'express-validator';
import { User } from '../types';
import { UserService } from '../services';
import config from '../config';

export const loginValidator = [
  check('email', 'Email is not valid')
    .isEmail()
    // eslint-disable-next-line @typescript-eslint/camelcase
    .normalizeEmail({ gmail_remove_dots: false, all_lowercase: true }),
  check('password', 'Password cannot be blank').notEmpty(),
];

export const login = async (req: Request, res: Response): Promise<void> => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(401).send({
      msg: errors,
    });

    return;
  }
  try {
    const user: User = await UserService.findByEmail(req.body.email);
    if (!user) {
      res.status(404).send({
        msg: 'User not found',
      });

      return;
    }

    const isSamePass = await UserService.comparePassword(
      req.body.email,
      req.body.password,
    );

    if (isSamePass) {
      const token = jwt.sign(
        {
          email: user.email,
          role: user.role,
          username: user.username,
        },
        config.JWT_SECRET,
        { expiresIn: '1h' },
      );
      res.status(200).send({ token: token });
    } else {
      res.status(401).send({
        msg: 'Unauthorized',
      });

      return;
    }
  } catch (error) {
    // console.log(chalk.red(error));
    res.status(400).send({
      msg: error,
    });
  }
};

export const registerValidator = [
  check('password', 'Password cannot be blank').trim().notEmpty(),
  check('fname', 'First name must be specified').trim().notEmpty(),
  check('lname', 'Last name must be specified').trim().notEmpty(),
  check('username', 'Username must be specified').trim().notEmpty(),
  check('role', 'Role must be specified').trim().notEmpty().not().equals('admin'),
  check('email', 'Email is not valid')
    .isEmail()
    // eslint-disable-next-line @typescript-eslint/camelcase
    .normalizeEmail({ gmail_remove_dots: false, all_lowercase: true }),
];

export const register = async (req: Request, res: Response): Promise<void> => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(401).send({
      msg: errors,
      status: 401,
    });

    return;
  }
  const user: User = req.body;
  try {
    // Check if user already exists
    const existingUser = await UserService.findByUsernameOrEmail(
      user.email,
      user.username,
    );
    if (existingUser) {
      res.status(409).send({
        msg: 'User already exists',
        status: 409,
      });

      return;
    }
    // Generate activation token
    const qRandomBytes = util.promisify(crypto.randomBytes);
    const cryptedValue = await qRandomBytes(16);
    user.activationToken = cryptedValue.toString('hex');
    user.activationExpires = new Date(Date.now() + 3600000); // 1 hour
    // Send activation email
    // const transporter = nodemailer.createTransport({
    //   host: process.env.SMTP_HOST,
    //   port: Number(process.env.SMTP_PORT),
    //   secure: process.env.NODE_ENV === 'production',
    //   socketTimeout: 5000,
    //   logger: true,
    //   auth: {
    //     user: process.env.SMTP_USER,
    //     pass: process.env.SMTP_PASSWORD,
    //   },
    // });

    // const mailOptions = {
    //   to: user.email,
    //   from: process.env.SMTP_USER,
    //   subject: 'Account activation',
    //   text: `You are receiving this email because you (or someone else) have requested account activation.\n\n
    //       Please click on the following link, or paste this into your browser to complete the process:\n\n
    //       http://${req.headers.host}/auth/activate/${user.activationToken}\n\n
    //       If you did not request this, please ignore this email\n`,
    // };
    // await transporter.sendMail(mailOptions);
    const savedUser: User = await UserService.save(user);
    res.status(200).send(savedUser);
  } catch (error) {
    // console.log(chalk.red(error));
    res.status(400).send({
      msg: 'Unable to send email',
      status: 400,
    });
  }
};

export const activate = async (req: Request, res: Response): Promise<void> => {
  try {
    const user: User = await UserService.findOneAndActivate(req.params.activationToken);
    const token = jwt.sign(
      {
        email: user.email,
        role: user.role,
        username: user.username,
      },
      config.JWT_SECRET,
      { expiresIn: '1h' },
    );
    res.status(200).send({ token: token });
  } catch (error) {
    // console.log(chalk.red(error));
    res.status(400).send({
      msg: 'Activation token expired, please register again',
      status: 400,
    });
  }
};

export default { login, loginValidator, register, registerValidator, activate };
