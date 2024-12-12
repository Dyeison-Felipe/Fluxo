import { Injectable } from "@nestjs/common";
import { UserEntity } from "src/core/user/domain/user.entity";
import { GenerateJwtToken, JwtRepository } from "src/shared/application/jwt/jwt.repository";
import { JwtService as NestJwtService } from '@nestjs/jwt';

@Injectable()
export class JwtRepositoryImpl implements JwtRepository {
  constructor(private readonly jwtService: NestJwtService) {}

  async generateJwt(user: UserEntity): Promise<GenerateJwtToken> {
    const payload = {
      sub: user.id,
      login: user.username,
      role: user.roleId,
    };

    const token = await this.jwtService.signAsync(payload);

    return { token };
  }
}