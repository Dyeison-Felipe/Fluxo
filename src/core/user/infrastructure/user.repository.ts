import { Repository } from "typeorm";
import { UserEntity } from "../domain/user.entity";
import { UserRepository } from "../domain/user.repository";
import { UserSchema } from "./user.schema";
import { Injectable } from "@nestjs/common";


@Injectable()
export class UserRepositoryImpl implements UserRepository {

  constructor(private readonly userRepository: Repository<UserSchema>) {}

  async create(createUserDto: UserEntity): Promise<UserEntity> {
    const createUser = await this.userRepository.save(createUserDto);

    return createUser
  }

  async findByUserLogin(login: string) {
    const user = await this.userRepository.findOne({
      where: { username: login },
      relations: ['roleId'],
    });

    return user;
  }

  async findById(id: number): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      relations: ['role'],
      where: { id },
    });

    return new UserEntity(user);
  }
  
}