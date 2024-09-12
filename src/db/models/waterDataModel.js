import { model, Schema } from 'mongoose';

const waterItemSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'users' },
    date: { type: String, required: true },
    time: { type: String, required: true },
    value: { type: Number, required: true },
  },
  { timestamps: true, versionKey: false },
);

export const WaterDataCollection = model('wateritem', waterItemSchema);
