import { type UpdateUserDTO, type CreateUserDTO, type User } from '../dtos';

export interface UserServiceInterface {
  create: (dto: CreateUserDTO) => Promise<User>;
  updateUser: (id: string, dto: UpdateUserDTO) => Promise<User>;
  delete: (id: string) => Promise<User>;
}
