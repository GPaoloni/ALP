import * as dotenv from 'dotenv';
dotenv.config();

export default {
  JWT_SECRET: process.env.JWT_SECRET || 'SUPER_SECRET_SOMETHING_JWT',
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/haskode-db',
  PORT: process.env.PORT || '3000',
  SESSION_SECRET: process.env.SESSION_SECRET || 'aaaassssdddd',
  SMTP_HOST: process.env.SMTP_HOST || 'smtp.gmail.com',
  SMTP_PORT: process.env.SMTP_PORT || '465',
  SMTP_USER: process.env.SMTP_USER || 'example.user@gmail.com',
  SMTP_PASSWORD: process.env.SMTP_PASSWORD || '34324234#AAA',
};
