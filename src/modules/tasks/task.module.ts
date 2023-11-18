import express, { Router } from 'express';
import { TaskController } from './controllers/task.controller';
import { TaskRepository } from './repositories/task.repository';
import { TaskRouter } from './routes/task.routes';
import { TaskService } from './services/task.service';
import { TaskRepositoryInterface } from './repositories/task.repository.interface';
import { TaskControllerInterface } from './controllers/task.controller.interface';
import { TaskServiceInterface } from './services/task.service.interface';

class TaskModule {
  public repository: TaskRepositoryInterface;
  public service: TaskServiceInterface;
  public controller: TaskControllerInterface;
  public router: Router;

  constructor() {
    this.repository = new TaskRepository();
    this.service = new TaskService(this.repository);
    this.controller = new TaskController(this.service);
    this.router = express.Router();
    this.router.use('/', new TaskRouter(this.controller).getRoutes())
  }
}

export default new TaskModule();
