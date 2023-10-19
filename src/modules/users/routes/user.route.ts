import { Router } from 'express'
import { UserControllerInterface } from '../controllers/user.controller.interface';

const router = Router();

export class UserRouter {
  public routes: Router[] = [];
  constructor(private readonly userController: UserControllerInterface) {
    this.routes.push(router.post('/', userController.createUser.bind(userController)))
    this.routes.push(router.put('/password', userController.changePassword.bind(userController)))
    this.routes.push(router.put('/name', userController.changeName.bind(userController)))
    this.routes.push(router.delete('/', userController.deleteUser.bind(userController)))
  }

  public getRoutes(): Router[] {
    return this.routes;
  }
}
