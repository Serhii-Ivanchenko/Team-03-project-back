import createHttpError from 'http-errors';
import {
  getAuthUserByEmail,
  updateUsersById,
} from '../services/authUserService.js';

export const usersUpdateController = async (req, res, next) => {
  const userId = req.authUser._id;
  const { email } = req.body;

  /* если front-end передвает нам email
  мы ищем его в db, если его нет, значит нам передали новый email делаем замену,
  если он есть в db проеряем принаджежит нашему пользоваетлю: то его дали просто со всеми данными
  если если он принаджужит другому пользователю получится ошибка */

  if (email) {
    const userEmail = await getAuthUserByEmail(email);

    if (userEmail !== null && userId !== userEmail._id) {
      throw createHttpError(
        409,
        'This email is already in use and cannot be changed',
      );
    }
  }

  const user = await updateUsersById(userId, req.body);

  if (!user) throw createHttpError(404, 'User not found');

  res.status(200).json({
    status: 200,
    message: 'Successfully updated user data!',
    data: user,
  });
};
