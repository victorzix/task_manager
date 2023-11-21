import { UserRepositoryInterface } from "src/modules/users/repositories/user.repository.interface";
import { AuthenticationServiceInterface } from "./authentication.service.interface";
import { type TokenDTO, type LoginDTO } from "src/modules/auth/dtos";
import { BadRequestError } from "src/errors/bad-request-error";
import bcrypt from 'bcrypt';
import TokenUtils from "src/utils/token-utils";

export class AuthenticationService implements AuthenticationServiceInterface {
  constructor(private readonly userRepository: UserRepositoryInterface) {}
  
  async login(dto: LoginDTO): Promise<TokenDTO> {
    const user = await this.userRepository.findByEmail(dto.email);

    if(!user) {
      throw new BadRequestError('Invalid e-mail or password');
    }

    const validPass = await bcrypt.compare(dto.password, user.password);

    if(!validPass) {
      throw new BadRequestError('Invalid e-mail or password');
    }

    const token = TokenUtils.generateAccessToken(user.id);
    const refreshToken = TokenUtils.generateRefreshToken(user.id);

    return { token, refreshToken };
  }
}