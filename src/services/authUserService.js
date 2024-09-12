import { UserCollection } from '../db/models/userModel.js';
import { AuthUserSessionCollection } from '../db/models/authUserSessionModel.js';
import { getEncryptedPassword } from '../utils/password.js';

export const getAuthUsersService = async () => {
  const authUsers = UserCollection.find();
  return authUsers;
};

export const getAuthUserById = (id) => UserCollection.findById(id);

export const getAuthUserByEmail = (email) => UserCollection.findOne({ email });

export const createAuthUserService = async (userData) => {
  // const encryptedPassword = await bcrypt.hash(userData.password, 10);
  const encryptedPassword = await getEncryptedPassword(userData.password);

  return await UserCollection.create({
    ...userData,
    password: encryptedPassword,
  });
};

export const logoutAuthUserService = async (sessionId) => {
  await AuthUserSessionCollection.deleteOne({ _id: sessionId });
};
