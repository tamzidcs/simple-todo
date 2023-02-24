import {Sequelize} from 'sequelize-typescript';
import Task from './entities/Task';
import User from './entities/User';
export class Models {
  public sequelize: Sequelize;
  
  constructor(config: any) {
    this.sequelize = new Sequelize(config);
  }

  public initModels() {
    this.sequelize.addModels(this.getModels())
  }

  private getModels() {
    return [
      Task,User
    ];
  }
}