import createHttpError from 'http-errors';
import {
  addWaterDataService,
  getWaterDataService,
} from '../services/waterDataService.js';
import {
  deleteWaterItemService,
  updateWaterItemService,
} from '../services/waterDataService.js';

export const getWaterDataController = async (req, res) => {
  const waterData = await getWaterDataService(req.query);
  res.send({
    datetimestamp: new Date(),
    count: waterData.length,
    data: waterData,
  });
};

export const createWaterDataController = async (req, res) => {
  console.log('createWaterDataController:----------------------------');
  console.log(req.waterData);

  const data = await addWaterDataService(req.waterData);
  res.status(201).json({
    status: 201,
    message: `Successfully created a contact!`,
    data,
  });
};

export const upsertWaterItemController = async (req, res) => {
  console.log('upsertWaterItemByIdController:');

  const result = await updateWaterItemService(req.waterData, {
    upsert: true,
  });
  console.log({ result });

  if (!result) {
    throw createHttpError(404, 'WaterItem not found');
  }

  const status = result.isNew ? 201 : 200;
  res.status(status).json({
    status,
    message: `Successfully upserted a waterItem!`,
    data: result.contact,
  });
};

export const deleteWaterItemByIdController = async (req, res, next) => {
  const { id } = req.params;
  const userId = req.authUser._id;
  // const contact = await deleteWaterItemService(userId, id);
  const item = await deleteWaterItemService(userId, id);

  if (!item) {
    throw createHttpError(404, `WaterItem by id:[${id}] not exists`);
  }

  res.status(204).send();
};
