import * as express from 'express';
import * as fs from 'fs';
import { WriteStream } from 'fs';
import * as path from 'path';
import Routes from './routes';

export default class Server {
  constructor(app: express.Application) {
    this.config(app);
    new Routes(app);
  }

  public config(app: express.Application): void {
    app.use( express.json());
  }
}