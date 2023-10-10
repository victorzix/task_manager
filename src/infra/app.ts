import express, { type Application, Router } from 'express';
import { type Server as HttpServer } from 'http';

export class App {
  public app: Application;
  public server: HttpServer | undefined;
  private readonly router: Router;

  constructor() {
    this.app = express();
    this.router = Router();
  }

  start(): void {
    this.server = this.app.listen(process.env.PORT);
    this.middlewares();
  }

  stop(fn?: () => void): void {
    if (!this.server) return;
    this.server.close(fn);
  }

  middlewares(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({extended: true}));
  }
}

export default new App();
