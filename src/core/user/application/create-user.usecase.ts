import { UseCase } from "src/shared/application/usecase/usecase";
import { UserRepository } from "../domain/user.repository";
import { UserOutput } from "src/shared/application/dtos/output/user-output";
import { RoleRepository } from "src/core/role/domain/role.repository";
import { ResourceNotFoundError } from "src/shared/application/errors/resource-not-found-error";
import { UserEntity } from "../domain/user.entity";
import { HashRepository } from "src/shared/application/utils/hash-bcrypt.repository";
import { Injectable } from "@nestjs/common";

type Input = {
  username: string;
  email: string;
  password: string;
  roleId: number;
}

type Output = UserOutput;

export class CreateUserUsecase implements UseCase<Input, Output> {

  constructor(private readonly userRepository: UserRepository, private readonly roleRepository: RoleRepository, private readonly hashRepository: HashRepository) { }

  async execute(createUserDto: Input): Promise<Output> {

    const existRole = await this.roleRepository.findById(createUserDto.roleId);

    if (!existRole) {
      throw new ResourceNotFoundError(`role id ${createUserDto.roleId} not found`)
    }

    const hashPasswprd = this.hashRepository.generateHash(createUserDto.password);

    const newUser = new UserEntity({
      username: createUserDto.username,
      email: createUserDto.email,
      password: hashPasswprd,
      roleId: existRole,
    })

    const createdUser = await this.userRepository.create(newUser);

    const output: Output = {
      ...createdUser,
    }

    return output;

  }

}