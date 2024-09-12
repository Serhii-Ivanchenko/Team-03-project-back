import Joi from 'joi';

export const addWaterDataSchema = Joi.object({
  value: Joi.number().required(),
});
