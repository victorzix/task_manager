import { type UserServiceInterface } from "./user.service.interface";
import { type UserRepositoryInterface } from "../repositories/user.repository.interface";
import { type CreateUserDTO, type User } from "../dtos";

export class UserService implements UserServiceInterface{
  constructor(private readonly userRepository: UserRepositoryInterface) {}

  async create(dto: CreateUserDTO): Promise<User> {
    const user = await this.userRepository.create(dto);

    if(!user) throw new Error("Could not create")

    return user
  }
}
