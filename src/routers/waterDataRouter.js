import { Router, json } from 'express';
import { controllerWrapper } from '../controllers/controllerWrapper.js';
import {
  addWaterDataSchema,
  updateWaterDataSchema,
} from '../validation/waterDataValidation.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  getWaterDataController,
  upsertWaterItemController,
  createWaterDataController,
  deleteWaterItemByIdController,
} from '../controllers/waterDataController.js';
import { defineWaterDataObject } from '../middlewares/waterData.js';
import { validateId } from '../middlewares/validateId.js';

const router = Router();
const jsonParser = json();

router.get('/', controllerWrapper(getWaterDataController));

router.post(
  '/',
  jsonParser,
  validateBody(addWaterDataSchema),
  defineWaterDataObject,
  controllerWrapper(createWaterDataController),
);

router.patch(
  '/:id',
  validateId,
  jsonParser,
  validateBody(updateWaterDataSchema),
  defineWaterDataObject,
  controllerWrapper(upsertWaterItemController),
);

router.delete(
  '/:id',
  validateId,
  controllerWrapper(deleteWaterItemByIdController),
);

export default router;
