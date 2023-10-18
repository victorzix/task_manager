import { type UserServiceInterface } from './user.service.interface';
import { type UserRepositoryInterface } from '../repositories/user.repository.interface';
import { type CreateUserDTO, type User } from '../dtos';

export class UserService implements UserServiceInterface {
  constructor(private readonly userRepository: UserRepositoryInterface) {}

  async create(dto: CreateUserDTO): Promise<User> {
    const emailAlreadyExists = await this.userRepository.findByEmail(dto.email);

    if (emailAlreadyExists) throw new Error('Email already registered');

    const user = await this.userRepository.create(dto);
    if (!user) throw new Error('Could not create');

    return user;
  }

  async changeName(id: string, newName: string): Promise<User> {
    const user = await this.userRepository.update(id, { name: newName });

    if (!user) throw new Error('Could not find user');

    return user;
  }

  async changePassword(id: string, newPassword: string): Promise<User> {
    const user = await this.userRepository.update(id, {
      password: newPassword,
    });

    if (!user) throw new Error('Could not find user');

    return user;
  }

  async delete(id: string): Promise<User> {
    const user = await this.userRepository.delete(id);

    if (!user) throw new Error('Could not find user');

    return user;
  }
}
