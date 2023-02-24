import Task from '../models/entities/Task';

export default class TaskService {
    public static async byId(id: string | number): Promise<Task | null>  {
        return Task.findByPk(id)
    }
    public static async create(
        title: string,
        description: string,
        status: string
    ): Promise<Task | null> {
        const task = await Task.create({title,description,status})
        return null;
    }
}
