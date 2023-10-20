import { type UserServiceInterface } from './user.service.interface';
import { type UserRepositoryInterface } from '../repositories/user.repository.interface';
import { type CreateUserDTO, type User } from '../dtos';
import { BadRequestError } from 'src/errors/bad-request-error';
import { NotFoundError } from 'src/errors/not-found-error';
import isObjEmpty from 'src/utils/isObjEmpty';

export class UserService implements UserServiceInterface {
  constructor(private readonly userRepository: UserRepositoryInterface) {}

  async create(dto: CreateUserDTO): Promise<User> {
    const isEmpty = isObjEmpty(dto);

    if (isEmpty) {
      throw new BadRequestError(
        'At least one field is required to create an user',
      );
    }

    const emailAlreadyExists = await this.userRepository.findByEmail(dto.email);

    if (emailAlreadyExists)
      throw new BadRequestError('Email already registered');

    const user = await this.userRepository.create(dto);
    if (!user) throw new BadRequestError('Could not create');

    return user;
  }

  async changeName(id: string, newName: string): Promise<User> {
    const user = await this.userRepository.update(id, { name: newName });

    if (!user) throw new NotFoundError('Could not find user');

    return user;
  }

  async changePassword(id: string, newPassword: string): Promise<User> {
    const user = await this.userRepository.update(id, {
      password: newPassword,
    });

    if (!user) throw new NotFoundError('Could not find user');

    return user;
  }

  async delete(id: string): Promise<User> {
    const user = await this.userRepository.delete(id);

    if (!user) throw new NotFoundError('Could not find user');

    return user;
  }
}
