import express, { Router } from 'express';
import { UserController } from './controllers/user.controller';
import { UserRepository } from './repositories/user.repository';
import { UserRouter } from './routes/user.route';
import { UserService } from './services/user.service';
import { UserRepositoryInterface } from './repositories/user.repository.interface';
import { UserControllerInterface } from './controllers/user.controller.interface';
import { UserServiceInterface } from './services/user.service.interface';

class UserModule {
  public repository: UserRepositoryInterface;
  public service: UserServiceInterface;
  public controller: UserControllerInterface;
  public router: Router;

  constructor() {
    this.repository = new UserRepository();
    this.service = new UserService(this.repository);
    this.controller = new UserController(this.service);
    this.router = express.Router();
    this.router.use('/', new UserRouter(this.controller).getRoutes())
  }
}

export default new UserModule();
