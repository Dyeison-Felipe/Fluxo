import { Injectable, Scope } from '@nestjs/common';
import { UserEntity } from 'src/core/user/domain/user.entity';
import { LoggedUserService } from 'src/shared/application/user-service/logged-user';

@Injectable({ scope: Scope.REQUEST })
export class LoggedUserServiceImpl implements LoggedUserService {
  private loggedUser: UserEntity;

  getLoggedUser(): UserEntity {
    return this.loggedUser;
  }

  setLoggedUser(loggedUser: UserEntity) {
    this.loggedUser = loggedUser;
  }
}