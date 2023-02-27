import express from 'express';
import router from './routes';
import cors from 'cors';

const app = express();
const options: cors.CorsOptions = {
  origin: 'http://localhost:3000',
};

app.use(cors(options));
app.use('/', router);

export default app;