import Joi from 'joi';

export const usersUpdateSchema = Joi.object({
  name: Joi.string().min(2).max(30),
  gender: Joi.string().valid('woman', 'man'),
  weight: Joi.number().positive().min(0).max(350).precision(1),
  activeTime: Joi.number().positive().min(0).max(25).precision(2),
  dailyNorm: Joi.number().positive().min(0).max(15000).precision(0),
});
