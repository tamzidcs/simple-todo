import express from "express";
import { TaskRouter } from "./tasks";

export default class Router {
  constructor(app: express.Application){
    app.use('/tasks', new TaskRouter().router)
  }
}
