import { Router } from 'express'
import { TaskControllerInterface } from '../controllers/task.controller.interface';
import { checkAuth } from 'src/middlewares/checkAuth';

const router = Router();

export class TaskRouter {
  public routes: Router[] = [];
  constructor(private readonly taskController: TaskControllerInterface) {
    this.routes.push(router.post('/', checkAuth, taskController.create.bind(taskController)))
    this.routes.push(router.get('/', checkAuth, taskController.list.bind(taskController)))
    this.routes.push(router.patch('/:id', checkAuth, taskController.update.bind(taskController)))
    this.routes.push(router.delete('/:id', checkAuth, taskController.delete.bind(taskController)))
    }

  public getRoutes(): Router[] {
    return this.routes;
  }
}
