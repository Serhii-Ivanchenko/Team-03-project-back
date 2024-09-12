import { model, Schema } from 'mongoose';

const userSchema = new Schema(
  {
    // Auth
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    // User
    gender: {
      type: String,
      required: true,
      enum: ['woman', 'man'],
      default: 'woman',
    },
    photo: {
      type: String,
      required: false,
      default: null,
    },

    weight: {
      type: Number,
      required: true,
      default: 0,
    },
    activeTime: {
      type: Number,
      // required: true,
      default: 0,
    },
    amount: {
      type: Number,
      // required: true,
      default: 0,
    },
  },
  { timestamps: true, versionKey: false },
);

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export const UserCollection = model('user', userSchema);
