import { UserEntity } from "./user.entity";

export interface UserRepository {

  create(createUserDto: UserEntity): Promise<UserEntity>;
  
  findByUserLogin(login: string): Promise<UserEntity>;

  findById(id: number): Promise<UserEntity>
}