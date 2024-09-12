import createHttpError from 'http-errors';
import {
  addWaterDataService,
  getWaterDataService,
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
