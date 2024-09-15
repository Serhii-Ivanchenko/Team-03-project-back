import createHttpError from 'http-errors';
import { updateUsersById } from '../services/authUserService.js';

export const usersUpdateController = async (req, res, next) => {
  const userId = req.authUser._id;
  let update = req.body;

  const user = await updateUsersById(userId, update);

  if (!user) throw createHttpError(404, 'Contact not found');

  res.status(200).json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: user,
  });
};
