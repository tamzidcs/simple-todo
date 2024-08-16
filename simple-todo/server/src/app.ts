import express from 'express';
import routerV1 from './api/v1/routes';
import cors, { CorsOptions } from 'cors';

const app = express();
const optionsOrigin = 'http://localhost:3000';
const options:CorsOptions = {
  origin: optionsOrigin,
};

app.use(cors(options));
app.use('/', routerV1);

export default app;