import { UseCase } from "src/shared/application/usecase/usecase";
import { RoleRepository } from "../domain/role.repository";
import { RoleOutput } from "src/shared/application/dtos/output/role-output";
import { RoleEntity } from "../domain/role.entity";
import { identity } from "rxjs";
import { Injectable, NotFoundException } from "@nestjs/common";
import { ResourceNotFoundError } from "src/shared/application/errors/resource-not-found-error";
import { ConflictExeptionError } from "src/shared/application/errors/conflict-exeption-error";

type Input = {
  id: number;
  name: string;
}

type Output = RoleOutput

@Injectable()
export class UpdateRoleUseCase implements UseCase<Input, Output> {

  constructor(private readonly roleRepository: RoleRepository) { }

  async execute(updateRoleDto: Input): Promise<Output> {

    const role = await this.roleRepository.findById(updateRoleDto.id);

    const roleName = await this.roleRepository.existName(updateRoleDto.name);

    if (!role) {
      throw new ResourceNotFoundError(`role id ${updateRoleDto.id} not found`)
    }

    if (roleName) {
      throw new ConflictExeptionError(`this name ${updateRoleDto.name} already is in use`)
    }

    role.name = updateRoleDto.name;

    const updatedRole = role;

    const createRole = await this.roleRepository.update(updatedRole);

    const output: Output = {
      id: createRole.id,
      name: createRole.name,
    }

    return output;
  }
}