import { Router } from 'express';
import validateJOI from '../middlewares/validateJOI.js';
import { getUser, signIn, signUp } from '../controllers/auth.js';
/* import {} from '../joi/schemas.js';
 */
const authRouter = Router();

authRouter.post('/signup', signUp);
authRouter.post('/signin', signIn);
authRouter.get('/me', getUser);

export default authRouter;
