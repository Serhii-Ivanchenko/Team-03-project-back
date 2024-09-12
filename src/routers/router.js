import { Router } from 'express';

import authUserRouter from './authUserRouter.js';
// import authUserResetRouter from './authUserResetRouter.js';
// import authGoogleRouter from './authGoogleRouter.js';
// import contactsRouter from './contactsRouter.js';
// import { swaggerDocs } from '../middlewares/swaggerDocs.js';

// import { auth } from '../middlewares/auth.js';
import waterDataRouter from './waterDataRouter.js';

const router = Router();

router.use('/auth', authUserRouter);
// router.use('/auth', authUserResetRouter);
// router.use('/auth/google', authGoogleRouter);
// router.use('/contacts/all', contactsRouter);
// router.use('/contacts', auth, contactsRouter);
// router.use('/api-docs', swaggerDocs());

router.use('/water/all', waterDataRouter);
// router.use('/water', auth, waterDataRouter);

export default router;
