import App, { type App as AppType } from './infra/app';
import Database, { type Database as DatabaseType } from './infra/db';

export class Server {
  private readonly app: AppType;
  private readonly database: DatabaseType;

  constructor(){
    this.app = App;
    this.database = Database;
  }

  async initialize(): Promise<void> {
    await this.database.connect();

    this.app.start();

    process.on('SIGALRM', () => {
      this.app.stop(async () => {
        await this.database.disconnect();
      })
    })
  }
}

new Server().initialize();