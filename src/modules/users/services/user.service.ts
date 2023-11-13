import { type UserServiceInterface } from './user.service.interface';
import { type UserRepositoryInterface } from '../repositories/user.repository.interface';
import { type CreateUserDTO, type User } from '../dtos';
import { BadRequestError } from 'src/errors/bad-request-error';
import { NotFoundError } from 'src/errors/not-found-error';
import isObjEmpty from 'src/utils/isObjEmpty';
import { UserSchema } from 'src/modules/users/schemas/user.schema';
import { ForbiddenError } from 'src/errors/forbidden-error';
import generateHashPassword from '../../../utils/password-hasher';

export class UserService implements UserServiceInterface {
  constructor(private readonly userRepository: UserRepositoryInterface) {}

  async create(dto: CreateUserDTO): Promise<User> {
    const isEmpty = isObjEmpty(dto);
    const validationErrors: String[] = [];
    if (isEmpty) {
      throw new BadRequestError(
        'At least one field is required to create an user',
      );
    }

    const validationResult = UserSchema.safeParse(dto);

    if (!validationResult.success) {
      if (!validationResult.success) {
        for (const error of validationResult.error.issues) {
          validationErrors.push(error.message);
        }
        throw new ForbiddenError(`${validationErrors.join(', ')}`);
      }
    }

    const emailAlreadyExists = await this.userRepository.findByEmail(dto.email);

    if (emailAlreadyExists)
      throw new BadRequestError('Email already registered');

    const password_hash = await generateHashPassword(dto.password_hash);
    const user = await this.userRepository.create({
      ...dto,
      password_hash,
    });
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
