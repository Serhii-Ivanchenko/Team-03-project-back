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
  id,
  userId,
  payload,
  options = {},
) => {
  console.log('>>updateWaterItemService');
  // const { id, value, userId } = waterItem;
  // console.log({ waterItem });
  console.log({ options });
  console.log({ payload });

  const rawResult = await WaterDataCollection.findOneAndUpdate(
    { _id: id, userId },
    payload,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );
  console.log({ rawResult });

  if (!rawResult || !rawResult.value) return null;

  return {
    waterItem: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};

export const deleteWaterItemService = async (userId, id) => {
  const waterItem = await WaterDataCollection.findOneAndDelete({
    _id: id,
    userId,
  });

  return waterItem;
};
