import { Router } from 'express'
import { UserControllerInterface } from '../controllers/user.controller.interface';
import { UserRouterInterface } from './user.router.interface';

const router = Router();

export class UserRouter implements UserRouterInterface {
  constructor(private readonly userController: UserControllerInterface) {
    router.post('/', userController.createUser)
  }
}

