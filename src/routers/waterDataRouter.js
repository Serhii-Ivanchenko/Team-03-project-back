import { Router, json } from 'express';
import { controllerWrapper } from '../utils/controllerWrapper.js';
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
  getDayWaterDataController,
  getMonthWaterDataController,
} from '../controllers/waterDataController.js';
import { defineWaterDataObject } from '../middlewares/waterData.js';
import { validateId } from '../middlewares/validateId.js';

const router = Router();

router.get('/', controllerWrapper(getWaterDataController));

router.post(
  '/',
  validateBody(addWaterDataSchema),
  defineWaterDataObject,
  controllerWrapper(createWaterDataController),
);

router.patch(
  '/:id',
  validateId,
  validateBody(updateWaterDataSchema),
  defineWaterDataObject,
  controllerWrapper(upsertWaterItemController),
);

router.delete(
  '/:id',
  validateId,
  controllerWrapper(deleteWaterItemByIdController),
);

router.get('/day', controllerWrapper(getDayWaterDataController));
router.get('/month', controllerWrapper(getMonthWaterDataController));
router.get('/day/:date', controllerWrapper(getDayWaterDataController));
router.get('/month/:date', controllerWrapper(getMonthWaterDataController));

export default router;
