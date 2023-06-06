import express from 'express';
import router from './routes';
import cors, { CorsOptions } from 'cors';

const app = express();
const optionsOrigin = 'http://localhost:3001';
const options:CorsOptions = {
  origin: optionsOrigin,
};

app.use(cors(options));
app.use('/', router);

export default app;