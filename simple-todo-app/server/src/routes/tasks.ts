import * as express from "express";
import TaskManager from "../services/task"

export class TaskRouter {
    public router: express.Router;
    
    constructor() {
        this.router = express.Router();
        this.buildRoutes();
    }

    public async post(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const newTask = await TaskManager.create(req.body.title, req.body.description, req.body. status);
            res.json(newTask);
        }
        catch(error) {
            next(error);
        }
    }
    
    private buildRoutes() {
        this.router.post("/",this.post.bind(this));
    }
}