import createHttpError from 'http-errors';
import {
  addWaterDataService,
  getWaterDataService,
} from '../services/waterDataService.js';
import {
  deleteWaterItemService,
  updateWaterItemService,
} from '../services/waterDataService.js';
import { getDayWaterDataService } from '../services/waterDataService.js';
import { getMonthWaterDataService } from '../services/waterDataService.js';

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
    message: `Successfully created a waterItem!`,
    data,
  });
};

export const upsertWaterItemController = async (req, res) => {
  console.log('upsertWaterItemByIdController:');
  const { id } = req.params;
  const userId = req.authUser._id;
  // const result = await updateWaterItemService(req.waterData, {
  const result = await updateWaterItemService(id, userId, req.body, {
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
    data: result.waterItem,
  });
};

export const deleteWaterItemByIdController = async (req, res, next) => {
  const { id } = req.params;
  const userId = req.authUser._id;
  const waterItem = await deleteWaterItemService(userId, id);

  if (!waterItem) {
    throw createHttpError(404, `WaterItem by id:[${id}] not exists`);
  }

  res.status(204).send();
};

export const getDayWaterDataController = async (req, res, next) => {
  const { date } = req.params || Date.now();
  const user = req.authUser;
  const userId = user._id;
  console.log({ userId });
  console.log({ date });

  const waterData = await getDayWaterDataService(userId, date);
  console.log({ waterData });

  res.send({
    userId,
    dailyNorm: user.dailyNorm,
    data: waterData,
  });
};

export const getMonthWaterDataController = async (req, res, next) => {
  let { date } = req.params;
  const user = req.authUser;
  const userId = user._id;

  console.log({ date });
  console.log({ user });
  console.log({ userId });

  const waterData = await getMonthWaterDataService(userId, date);
  console.log({ waterData });

  res.send({
    userId,
    dailyNorm: user.dailyNorm,
    data: waterData,
  });
};
