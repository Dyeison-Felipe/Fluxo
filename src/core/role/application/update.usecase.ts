import { UseCase } from "src/shared/application/usecase/usecase";
import { RoleRepository } from "../domain/role.repository";
import { RoleOutput } from "src/shared/application/dtos/output/role-output";
import { RoleEntity } from "../domain/role.entity";
import { identity } from "rxjs";
import { NotFoundException } from "@nestjs/common";

type Input = {
  id: number;
  name: string;
}

type Output = RoleOutput

export class UpdateUseCase implements UseCase<Input, Output> {

  constructor(private readonly roleRepository: RoleRepository) { }

  async execute({id, name}: Input): Promise<Output> {

    const roleId = await this.roleRepository.findById(id);

    if(!roleId) {
      throw new NotFoundException(`role id ${id} not found`)
    }

    const roleEntity = new RoleEntity({
      name: name,
    })

    const createRole = await this.roleRepository.create(roleEntity);

    const output: Output = {
      id: createRole.id,
      name: createRole.name,
    }

    return output;
  }
}