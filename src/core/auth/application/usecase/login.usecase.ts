import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { CookieOptions } from 'express';
import { UserRepository } from 'src/core/user/domain/user.repository';
import { AuthConstants } from 'src/shared/application/constants/auth-constants';
import { LoginOutput } from 'src/shared/application/dtos/output/login-output';
import { JwtRepository } from 'src/shared/application/jwt/jwt.repository';
import { UseCase } from 'src/shared/application/usecase/usecase';
import { HashRepository } from 'src/shared/application/utils/hash-bcrypt.repository';
import { EnvConfig } from 'src/shared/infrastructure/env-config/env-config.interface';

type Input = {
  login: string;
  password: string;
  setCookie: (key: string, value: string, options?: CookieOptions) => void;
};

type Output = LoginOutput;

export class LoginUseCase implements UseCase<Input, Output> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashRepository: HashRepository,
    private readonly jwtRepository: JwtRepository,
    private readonly envConfig: EnvConfig,
  ) {}

  async execute({setCookie, ...loginRequestDto }: Input): Promise<Output> {
    const user = await this.userRepository.findByUserLogin(
      loginRequestDto.login,
    );
    console.log(this.hashRepository)

    const hashCompare = this.hashRepository.compareHash(loginRequestDto.password, user.password)

    if (
      !user ||
      !hashCompare
    ) {
      throw new UnauthorizedException();
    }

    const { token } = await this.jwtRepository.generateJwt(user);
    console.log('🚀 ~ LoginUseCase ~ execute ~ token:', token);

    setCookie(AuthConstants.tokenName, token, {
      httpOnly: true,
      maxAge: this.envConfig.getExpiresInSeconds(),
      path: '/',
    });

    delete user.password;

    return {
      user: {
        ...user,
      },
      token
    };
  }
}