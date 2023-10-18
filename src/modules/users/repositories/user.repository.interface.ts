import { User, CreateUserDTO, UpdateUserDTO } from '../dtos/index';

export interface UserRepositoryInterface {
  create: (dto: CreateUserDTO) => Promise<User | null>;
  findById: (id: string) => Promise<User | null>;
  findByEmail: (email: string) => Promise<User | null>
  update: (id: string, updateUserDto: UpdateUserDTO) => Promise<User | null>
  delete: (id: string) => Promise<User | null>;
}
