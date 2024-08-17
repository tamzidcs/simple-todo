import express from 'express';
import routerV1 from './api/v1/routes';
import cors, { CorsOptions } from 'cors';

const app = express();
const optionsOrigin = 'http://localhost:3000';
const options:CorsOptions = {
  origin: optionsOrigin,
};

const APIConf = {
  version: 'v1',
  router: routerV1
}

app.use(cors(options));
app.use('/', APIConf.router);

export default app;