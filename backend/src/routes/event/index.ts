import express from 'express';
const eventRoutes = express.Router();
import userRoutes from './user.routes';

eventRoutes.use('/', userRoutes);

export default eventRoutes;
