import { UserEntity } from "src/core/user/domain/user.entity";

export interface LoggedUserService {
  getLoggedUser(): UserEntity;
  setLoggedUser(loggedUser: UserEntity): void;
}