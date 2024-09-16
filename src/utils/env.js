import dotenv from 'dotenv';

dotenv.config();

export const APP_CONFIG = {
  PORT: process.env.APP_PORT,
};

export function env(name, defaultValue) {
  const value = process.env[name];

  if (value) return value;

  if (defaultValue) return defaultValue;

  throw new Error(`Missing: process.env['${name}'].`);
}
