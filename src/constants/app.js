import { env } from '../utils/env.js';

export const APP = {
  PORT: env('PORT', '3000'),
};
