import Joi from 'joi';

export const usersUpdateSchema = Joi.object({
  name: Joi.string().min(2).max(30),
  email: Joi.string().email(),
  gender: Joi.string().valid('woman', 'man'),
  weight: Joi.number().min(0).max(350).precision(1),
  activeTime: Joi.number().min(0).max(24).precision(2),
  dailyNorm: Joi.number().positive().min(1000).max(15000).precision(0),
});
