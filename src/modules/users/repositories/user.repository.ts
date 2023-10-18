import { CreateUserDTO, UpdateUserDTO, User } from '../dtos';
import { UserRepositoryInterface } from './user.repository.interface';
import { prisma } from 'src/infra/db';

export class UserRepository implements UserRepositoryInterface {
  async create(dto: CreateUserDTO): Promise<User> {
    const user = await prisma.user.create({
      data: dto,
    });

    return user;
  }

  async findById(id: string): Promise<User | null> {
    const user = await prisma.user.findFirst({ where: { id } });
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findFirst({ where: { email } });
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDTO): Promise<User | null> {
    const updateUser = await prisma.user.update({
      where: {
        id,
      },
      data: updateUserDto,
    });

    return updateUser;
  }

  async delete(id: string): Promise<User | null> {
    const deletedUser = await prisma.user.delete({
      where: {
        id,
      },
    });

    return deletedUser;
  }
}
