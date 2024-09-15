import fs from 'node:fs/promises';
import cloudinary from 'cloudinary';
import { CLOUDINARY } from '../constants/cloudinary.js';

cloudinary.v2.config({
  secure: true,
  api_key: CLOUDINARY.API_KEY,
  api_secret: CLOUDINARY.API_SECRET,
  cloud_name: CLOUDINARY.CLOUD_NAME,
});

export const saveFileToCloudinary = async (file) => {
  const response = await cloudinary.v2.uploader.upload(file.path);
  await fs.unlink(file.path);
  return response.secure_url;
};
