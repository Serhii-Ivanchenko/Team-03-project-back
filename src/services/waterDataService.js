import { WaterDataCollection } from '../db/models/waterDataModel.js';

export const getWaterDataService = async () => {
  const waterData = WaterDataCollection.find();
  return waterData;
};

export const addWaterDataService = async (data) => {
  console.log('>>addWaterDataService:--------------------');
  console.log({ data });
  const waterItem = await WaterDataCollection.create(data);
  return waterItem;
};
