import { type UserServiceInterface } from './user.service.interface';
import { type UserRepositoryInterface } from '../repositories/user.repository.interface';
import { type UpdateUserDTO, type CreateUserDTO, type User } from '../dtos';
import { BadRequestError } from 'src/errors/bad-request-error';
import { NotFoundError } from 'src/errors/not-found-error';
import isObjEmpty from 'src/utils/isObjEmpty';
import {
  UpdateUserSchema,
  UserSchema,
} from 'src/modules/users/schemas/user.schema';
import { ForbiddenError } from 'src/errors/forbidden-error';
import generateHashPassword from '../../../utils/password-hasher';
import { InternalServerError } from 'src/errors/internal-server-error';

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

    const hashedPass = await generateHashPassword(dto.password);
    const user = await this.userRepository.create({
      ...dto,
      password: hashedPass,
    });
    if (!user) throw new InternalServerError('Could not create');
    return user;
  }

  async updateUser(id: string, dto: UpdateUserDTO): Promise<User> {
    const isEmpty = isObjEmpty(dto);
    const validationErrors: String[] = [];

    if (isEmpty) {
      throw new BadRequestError(
        `At least one field is required to update an user`,
      );
    }

    if (dto.email) {
      await this.handleUpdateEmail(dto.email);
    }
    if (dto.password) {
      dto.password = await generateHashPassword(dto.password);
    }

    const validationResult = UpdateUserSchema.safeParse(dto);

    if (!validationResult.success) {
      if (!validationResult.success) {
        for (const error of validationResult.error.issues) {
          validationErrors.push(error.message);
        }
        throw new BadRequestError(`${validationErrors.join(', ')}`);
      }
    }

    const user = await this.userRepository.update(id, dto);

    if (!user) {
      throw new NotFoundError('Could not find user');
    }

    return user;
  }

  async getData(id: string): Promise<User> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new NotFoundError('User not found');
    }

    return user;
  }

  private async handleUpdateEmail(email: string) {
    const emailAlreadyExists = await this.userRepository.findByEmail(email);
    if (emailAlreadyExists) {
      throw new BadRequestError('Email already exists');
    }
  }

  async delete(id: string): Promise<User> {
    const user = await this.userRepository.delete(id);

    if (!user) throw new NotFoundError('Could not find user');

    return user;
  }
}
