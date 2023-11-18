import { Router } from 'express'
import { UserControllerInterface } from '../controllers/user.controller.interface';
import { checkAuth } from 'src/middlewares/checkAuth';

const router = Router();

export class UserRouter {
  public routes: Router[] = [];
  constructor(private readonly userController: UserControllerInterface) {
    this.routes.push(router.post('/', userController.createUser.bind(userController)))
    this.routes.push(router.patch('/', checkAuth, userController.updateUser.bind(userController)))
    this.routes.push(router.delete('/', checkAuth, userController.deleteUser.bind(userController)))
  }

  public getRoutes(): Router[] {
    return this.routes;
  }
}
