import "reflect-metadata";
import { DataSource } from 'typeorm'; 
import express from 'express';
import routerV1 from './api/v1/routes/index.js';
import cors, { CorsOptions } from 'cors';
import { errorHandler } from './api/v1/middleware/errorHandler.js';
import { API_CONFIG } from './config/api.config.js'

const app = express();
const optionsOrigin = 'http://localhost:3000';
const options:CorsOptions = {
  origin: optionsOrigin,
};

const APIConf = {
  version: API_CONFIG.apiVersion,
  router: routerV1
}

app.use(cors(options));
app.use("/" + APIConf.version, APIConf.router);
app.use(errorHandler);

export default app;