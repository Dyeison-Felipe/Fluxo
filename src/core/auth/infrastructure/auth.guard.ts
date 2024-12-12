import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { UserRepository } from 'src/core/user/domain/user.repository';
import { AuthConstants } from 'src/shared/application/constants/auth-constants';
import { ForbiddenError } from 'src/shared/application/errors/forbidden-error';
import { UnauthorizedError } from 'src/shared/application/errors/unauthorized-error';
import { LoggedUserService } from 'src/shared/application/user-service/logged-user';

type Payload = {
  sub: 1;
  login: string;
  role: { id: number; type: string };
  iat: number;
  exp: number;
};

export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly loggedUserService: LoggedUserService,
    private readonly userRepository: UserRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.cookies ? request.cookies[AuthConstants.tokenName] : null;
    console.log(
      '🚀 ~ AuthGuard ~ canActivate ~ request.cookies:',
      request.cookies,
    );
    console.log('🚀 ~ AuthGuard ~ canActivate ~ token:', token);

    if (!token) {
      throw new UnauthorizedError();
    }

    let payload: Payload = null;

    try {
      payload = await this.jwtService.verifyAsync<Payload>(token);
      const loggedUser = await this.userRepository.findById(payload.sub);

      console.log('payload', payload)
      console.log('loggedUser', loggedUser)

      if (!loggedUser) {
        throw new UnauthorizedError();
      }

      request.user = payload;

      this.loggedUserService.setLoggedUser(loggedUser);
    } catch (error) {
      throw new UnauthorizedError();
    }

    return true;
  }
}