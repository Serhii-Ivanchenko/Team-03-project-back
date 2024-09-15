import Joi from 'joi';

export const usersUpdateSchema = Joi.object({
  name: Joi.string().min(3).max(30),
  gender: Joi.string().valid('woman', 'man'),
  weight: Joi.number().positive().precision(1),
  activeTime: Joi.number().positive().precision(2),
  dailyNorm: Joi.number().positive().precision(0),
});
