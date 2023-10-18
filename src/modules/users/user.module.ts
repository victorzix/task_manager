import { UserController } from './controllers/user.controller';
import { UserControllerInterface } from './controllers/user.controller.interface';
import { UserRepository } from './repositories/user.repository';
import { UserRouter } from './routes/user.route';
import { UserRouterInterface } from './routes/user.router.interface';
import { UserService } from './services/user.service';
import { UserServiceInterface } from './services/user.service.interface';

class UserModule {
  public repository: UserRepository;
  public controller: UserControllerInterface;
  public service: UserServiceInterface;
  public router: UserRouterInterface;

  constructor() {
    this.repository = new UserRepository();
    this.service = new UserService(this.repository)
    this.controller = new UserController(this.service)
    this.router = new UserRouter(this.controller)
  }
}

export default new UserModule();
