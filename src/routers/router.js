import { Router } from 'express';

import authUserRouter from './authUserRouter.js';
// import authUserResetRouter from './authUserResetRouter.js';
import authGoogleRouter from './authGoogleRouter.js';
// import { swaggerDocs } from '../middlewares/swaggerDocs.js';

import { auth } from '../middlewares/auth.js';
import waterDataRouter from './waterDataRouter.js';

const router = Router();

router.use('/users', authUserRouter);
// router.use('/users', authUserResetRouter);
router.use('/users', authGoogleRouter);
// router.use('/api-docs', swaggerDocs());

router.use('/water/all', waterDataRouter);
router.use('/water', auth, waterDataRouter);

export default router;
