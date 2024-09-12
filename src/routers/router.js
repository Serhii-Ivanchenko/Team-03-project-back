import { Router } from 'express';

// import authUserRouter from './authUserRouter.js';
// import authUserResetRouter from './authUserResetRouter.js';
// import authGoogleRouter from './authGoogleRouter.js';
// import contactsRouter from './contactsRouter.js';
// import { swaggerDocs } from '../middlewares/swaggerDocs.js';

import { auth } from '../middlewares/auth.js';
import waterRouter from './waterRouter.js';

const router = Router();

// router.use('/auth', authUserRouter);
// router.use('/auth', authUserResetRouter);
// router.use('/auth/google', authGoogleRouter);
// router.use('/contacts/all', contactsRouter);
// router.use('/contacts', auth, contactsRouter);
// router.use('/api-docs', swaggerDocs());

router.use('/water/all', waterRouter);
router.use('/water', auth, waterRouter);

export default router;
