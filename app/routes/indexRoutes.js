import express from 'express';
import invokeRouter from './invokeRoutes.js';
import queryRouter from './queryRoutes.js';
import userRouter from './userRoutes.js';
import IPFSDBRouter from './IPFSRoutes.js';

const RouterAPI = express.Router();
RouterAPI.use('/api/v0', RouterAPI);

RouterAPI.use('/users', userRouter);
RouterAPI.use(invokeRouter);
RouterAPI.use(queryRouter);
RouterAPI.use('/db/', IPFSDBRouter);


export default RouterAPI;