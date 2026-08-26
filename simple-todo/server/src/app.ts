import express from 'express'
import router from './routes/index.js'
import cors, { CorsOptions } from 'cors'
import { errorHandler } from './middleware/errorHandler.js'

const app = express();
const optionsOrigin = 'http://localhost:3000';
const options:CorsOptions = {
  origin: optionsOrigin,
};

app.use(cors(options));
app.use('/', router);
app.use(errorHandler);

export default app;