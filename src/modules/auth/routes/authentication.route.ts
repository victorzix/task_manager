import { Router } from 'express';
import { AuthenticationControllerInterface } from '../controllers/authentication.controller.interface';
import { checkAuth } from 'src/middlewares/checkAuth';

const router = Router();

export class AuthenticationRouter {
  public routes: Router[] = [];
  constructor(
    private readonly authenticationController: AuthenticationControllerInterface,
  ) {
    this.routes.push(
      router.post(
        '/login',
        this.authenticationController.login.bind(authenticationController),
      ),
    );
  }

  public getRoutes(): Router[] {
    return this.routes;
  }
}
