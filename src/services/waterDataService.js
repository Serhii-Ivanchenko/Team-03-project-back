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

// export const updatetWaterItemservice;
export const updateWaterItemService = async (
  userId,
  id,
  data,
  options = {},
) => {
  console.log('>>updatecontactService');

  const rawResult = await WaterDataCollection.findOneAndUpdate(
    { _id: id, userId },
    data,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );

  if (!rawResult || !rawResult.value) return null;

  return {
    contact: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};

export const deleteWaterItemService = async (userId, id) => {
  const contact = await WaterDataCollection.findOneAndDelete({
    _id: id,
    userId,
  });

  return contact;
};
