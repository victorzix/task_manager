import express, { Router } from 'express';
import { AuthenticationController } from './controllers/authentication.controller';
import { AuthenticationRouter } from './routes/authentication.route';
import { AuthenticationControllerInterface } from './controllers/authentication.controller.interface';
import { UserRepositoryInterface } from '../users/repositories/user.repository.interface';
import { UserRepository } from '../users/repositories/user.repository';

class AuthenticationModule {
  public controller: AuthenticationControllerInterface;
  public router: Router;
  public repository: UserRepositoryInterface
  constructor() {
    this.repository = new UserRepository();
    this.controller = new AuthenticationController(this.repository);
    this.router = express.Router();
    this.router.use('/', new AuthenticationRouter(this.controller).getRoutes())
  }
}

export default new AuthenticationModule();
