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
}

type Output = void

@Injectable()
export class DeleteRoleUseCase implements UseCase<Input, Output> {

  constructor(private readonly roleRepository: RoleRepository) { }

  async execute({ id }: Input): Promise<Output> {
    const role = await this.roleRepository.findById(id);

    if (!role) {
      throw new ResourceNotFoundError(`id ${id} not found`);
    }

    await this.roleRepository.delete(id);

  }
}