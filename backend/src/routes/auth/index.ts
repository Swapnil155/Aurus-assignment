import express from 'express';
const authRouter = express.Router();
import userRoutes from './user.routes';

authRouter.use('/', userRoutes);

export default authRouter;
