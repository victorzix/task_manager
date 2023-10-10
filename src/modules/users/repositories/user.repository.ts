import { User } from '@prisma/client';
import { CreateUserDTO } from '../dtos';
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
    const user = await prisma.user.findFirst({ where: { id: id }})
    return user;
  }

  async delete(id: string): Promise<User | null> {
    const deletedUser = await prisma.user.delete({
      where: {
        id,
      }
    })

    return deletedUser;
  }
}
