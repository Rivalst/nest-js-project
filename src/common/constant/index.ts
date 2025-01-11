import * as dotenv from 'dotenv';

dotenv.config();

export const jwtConstants = {
  secret: process.env.JWT_ACCESS_SECRET,
};

export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
