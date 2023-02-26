import { Op } from 'sequelize';
import {Task} from '..';
import { TaskInput, TaskOutput } from '../Task';

export const create = (payload: TaskInput): Promise<TaskOutput> => {
    return Task.create(payload);
}
