import { User, CreateUserDTO } from '../dtos/index';

export interface UserRepositoryInterface {
  create: (dto: CreateUserDTO) => Promise<User | null>;
  findById: (id: string) => Promise<User | null>;
  delete: (id: string) => Promise<User | null>;
}
