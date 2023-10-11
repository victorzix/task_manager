import { type CreateUserDTO, type User } from '../dtos';

export interface UserServiceInterface {
  create: (dto: CreateUserDTO) => Promise<User>;
  findById: (id: string) => Promise<User>;
  delete: (id: string) => Promise<User>;
}
