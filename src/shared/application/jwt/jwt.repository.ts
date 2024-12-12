import { UserEntity } from "src/core/user/domain/user.entity";

export type GenerateJwtToken = {
  token: string;
};

export interface JwtRepository {
  generateJwt(user: UserEntity): Promise<GenerateJwtToken>;
}