import app from './infra/app';
import Database, { type Database as DatabaseType } from './infra/db';

export class Server {
  private readonly app;
  private readonly database: DatabaseType;

  constructor(){
    this.app = app;
    this.database = Database;
  }

  async initialize(): Promise<void> {
    await this.database.connect();
  }
}

new Server().initialize();