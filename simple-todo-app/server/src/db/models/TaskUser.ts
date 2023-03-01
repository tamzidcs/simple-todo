import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '../../db'
import Task from './Task';
import User from './User';

interface TaskUserAttributes {
    UserId: number,
    TaskId: number
}

export interface TaskUserInput extends Required<TaskUserAttributes> {}
export interface TaskUserOutput extends Required<TaskUserAttributes> {}
export interface GetAllUsersResponse {
    users: User[];
}

export interface RegisterRequest {
    id: number;
    username: string;
    password: string;
}

export interface RegisterResponse {
    id?: number;
    username?: string;
}

export interface LoginRequest {
    username: string;
    password: string;
}

export interface LoginResponse {
    username?: string | null;
}

class TaskUser extends Model<TaskUserAttributes> implements TaskUserAttributes {
    public TaskId!: number;
    public UserId!: number;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
}

TaskUser.init({
    TaskId: {
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
            model: Task,
            key: 'id'
        }
    },
    UserId: {
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
            model: User,
            key: 'id'
        }
    }
}, {
    sequelize: sequelize,
    paranoid: true
})
Task.belongsToMany(User,{through: 'TaskUser', uniqueKey:'TaskId'});
User.belongsToMany(Task,{through: 'TaskUser',uniqueKey:'UserId'});

export default TaskUser;