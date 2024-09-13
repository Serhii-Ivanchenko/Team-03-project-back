import { Router } from 'express';
import { auth } from '../middlewares/auth.js';
import { authDataUserRouterController } from '../controllers/authDataUserRouterController.js';
import { controllerWrapper } from '../utils/controllerWrapper.js';

const router = Router();

router.get('/data', auth, controllerWrapper(authDataUserRouterController));

export default router;
