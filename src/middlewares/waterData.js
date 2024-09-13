import { format } from 'date-fns';

export async function defineWaterDataObject(req, res, next) {
  console.log('defineWaterDataObject:--------------------------------');
  console.log('user:', req.authUser);
  console.log('body:', req.body);
  console.log('date:', req.body.date);
  console.log('time:', req.body.time);
  // console.log('file', req.file);

  const authUser = req.authUser;

  const dateTimeStamp = Date.now();
  const date =
    req.body.date != undefined
      ? req.body.date
      : format(dateTimeStamp, 'yyyy-MM-dd');
  const time =
    req.body.time != undefined ? req.body.time : format(dateTimeStamp, 'HH:mm');

  console.log({ date });
  console.log({ time });

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
