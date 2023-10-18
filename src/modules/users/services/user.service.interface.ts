import { type CreateUserDTO, type User } from '../dtos';

export interface UserServiceInterface {
  create: (dto: CreateUserDTO) => Promise<User>;
  changeName: (id: string, newName: string) => Promise<User>
  changePassword: (id: string, newPassword: string) => Promise<User>
  delete: (id: string) => Promise<User>;
}
