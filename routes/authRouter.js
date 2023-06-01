import { Router } from 'express';
import validateJOI from '../middlewares/validateJOI.js';
import verifyToken from '../middlewares/verifyToken.js';
import { getUser, signIn, signUp } from '../controllers/auth.js';
import { siginSchema, sigupSchema } from '../joi/schemas.js';

const authRouter = Router();

authRouter.post('/signup', validateJOI(sigupSchema), signUp);
authRouter.post('/signin', validateJOI(siginSchema), signIn);
authRouter.get('/me', verifyToken, getUser);

export default authRouter;
