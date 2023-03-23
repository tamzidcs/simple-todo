import express from 'express';
import router from './routes';
import cors from 'cors';

const app = express();
const optionsOrigin = 'http://localhost:3005';
const options = {
  origin: optionsOrigin,
};

app.use(cors(options));
app.use('/', router);

export default app;