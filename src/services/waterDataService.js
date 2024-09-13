import { WaterDataCollection } from '../db/models/waterDataModel.js';
import {
  getMonthDates,
  getFormattedDate,
  getAllDaysInMonth,
} from '../utils/dateHelper.js';

export const getWaterDataService = async () => {
  const waterData = WaterDataCollection.find();
  return waterData;
};

export const addWaterDataService = async (data) => {
  const waterItem = await WaterDataCollection.create(data);
  return waterItem;
};

export const updateWaterItemService = async (
  id,
  userId,
  payload,
  options = {},
) => {
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

export const getDayWaterDataService = async (userId, date) => {
  date = getFormattedDate(date);
  const result = await WaterDataCollection.find({ userId, date });
  const dayWaterDdata = result.map((item) => ({
    id: item._id,
    date: item.date,
    time: item.time,
    value: item.value,
  }));
  return dayWaterDdata;
};

export const getMonthWaterDataService = async (userId, date) => {
  const monthDates = getMonthDates(date);
  const minDate = monthDates.som;
  const maxDate = monthDates.eom;
  console.log({ monthDates });
  console.log({ minDate, maxDate });

  const result = await WaterDataCollection.aggregate([
    {
      $match: {
        userId: userId,
      },
    },
    {
      $match: {
        date: {
          $gte: minDate,
          $lt: maxDate,
        },
      },
    },
    {
      $group: {
        _id: {
          userId: '$userId',
          date: '$date',
        },
        value: { $sum: '$value' },
      },
    },
    {
      $sort: { '_id.userId': 1, '_id.date': 1 },
    },
  ]);
  console.log({ result });
  const waterData = result.map((item) => ({
    date: item._id.date,
    value: item.value,
  }));
  console.log({ waterData });

  const monthDays = getAllDaysInMonth(date);
  const waterDataMap = new Map(waterData.map((item) => [item.date, item]));
  const monthWaterData = monthDays.map((day) => {
    if (waterDataMap.has(day)) {
      return waterDataMap.get(day);
    }
    return {
      date: day,
      value: 0,
    };
  });

  return monthWaterData;
};
