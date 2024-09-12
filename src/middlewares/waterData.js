import { format } from 'date-fns';

export async function defineWaterDataObject(req, res, next) {
  console.log('defineWaterDataObject:--------------------------------');
  console.log('body', req.body);
  console.log('user', req.authUser);
  // console.log('file', req.file);

  const authUser = req.authUser;

  const dateTimeStamp = Date.now();
  const date = format(dateTimeStamp, 'yyyy-MM-dd');
  const time = format(dateTimeStamp, 'HH:mm');
  let waterData = {
    userId: authUser._id,
    ...req.body,
    date,
    time,
  };
  console.log({ waterData });

  req.waterData = waterData;
  next();
}
