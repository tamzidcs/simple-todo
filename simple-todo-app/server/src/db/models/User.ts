import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '../../db'
import Task from './Task';

interface UserAttributes {
    id: number;
    username: string;
    name?: string;
    password: string;
}

export interface UserInput extends Required<UserAttributes> {}
export interface UserOutput extends Required<UserAttributes> {}
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

class User extends Model<UserAttributes> implements UserAttributes {
    public id!: number;
    public username!: string;
    public password!: string;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
}

User.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    
}, {
    sequelize: sequelize,
    paranoid: true
})

export default User