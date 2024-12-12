import { UseCase } from "src/shared/application/usecase/usecase";
import { RoleRepository } from "../domain/role.repository";
import { RoleOutput } from "src/shared/application/dtos/output/role-output";
import { RoleEntity } from "../domain/role.entity";
import { Injectable } from "@nestjs/common";

type Input = {
  name: string;
}

type Output = RoleOutput

@Injectable()
export class CreateRoleUseCase implements UseCase<Input, Output> {

  constructor(private readonly roleRepository: RoleRepository) { }

  async execute(createRoleDto: Input): Promise<Output> {

    const roleEntity = new RoleEntity({
      name: createRoleDto.name,
    })

    const createRole = await this.roleRepository.create(roleEntity);

    const output: Output = {
      id: createRole.id,
      name: createRole.name,
    }

    return output;
  }
}