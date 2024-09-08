import express from 'express';
import router from './routes';
import cors, { CorsOptions } from 'cors';
import { errorHandler } from './middleware/errorHandler';

const app = express();
const optionsOrigin = 'http://localhost:3000';
const options:CorsOptions = {
  origin: optionsOrigin,
};

app.use(cors(options));
app.use('/', router);
app.all('*',async (req,resp,next)=>{
  throw new Error('test');
})
app.use(errorHandler);

export default app;