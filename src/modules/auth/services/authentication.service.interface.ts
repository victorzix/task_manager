import { type LoginDTO, type TokenDTO } from "src/modules/auth/dtos";

export interface AuthenticationServiceInterface {
  login: (dto: LoginDTO) => Promise<TokenDTO>;
}