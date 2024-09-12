import Joi from 'joi';

export const addWaterDataSchema = Joi.object({
  value: Joi.number().required(),
});

export const updateWaterDataSchema = Joi.object({
  date: Joi.string(),
  time: Joi.string(),
  value: Joi.number(),
});
