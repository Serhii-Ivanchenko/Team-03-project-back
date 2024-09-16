import createHttpError from 'http-errors';
import { updateUsersById } from '../services/authUserService.js';

export const usersUpdateController = async (req, res, next) => {
  const userId = req.authUser._id;
  const { email } = req.body;

  const checkEmail = await getAuthUserByEmail(email);

  if (checkEmail)
    throw createHttpError(
      409,
      'This email is already in use and cannot be changed',
    );

  const user = await updateUsersById(userId, req.body);

  if (!user) throw createHttpError(404, 'User not found');

  res.status(200).json({
    status: 200,
    message: 'Successfully updated user data!',
    data: user,
  });
};
