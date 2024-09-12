import { Router, json } from 'express';
import { controllerWrapper } from '../controllers/controllerWrapper.js';
import { addWaterDataSchema } from '../validation/waterDataValidation.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  createWaterDataController,
  getWaterDataController,
} from '../controllers/waterDataController.js';
import { defineWaterDataObject } from '../middlewares/waterData.js';

const router = Router();
const jsonParser = json();

router.post(
  '/',
  jsonParser,
  validateBody(addWaterDataSchema),
  defineWaterDataObject,
  controllerWrapper(createWaterDataController),
);

router.get('/', controllerWrapper(getWaterDataController));

export default router;
