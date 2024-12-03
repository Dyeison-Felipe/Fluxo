import { UseCase } from "src/shared/application/usecase/usecase";
import { RoleRepository } from "../domain/role.repository";
import { RoleOutput } from "src/shared/application/dtos/output/role-output";
import { RoleEntity } from "../domain/role.entity";
import { PaginationInput } from "src/shared/application/pagination/pagination";
import { IPaginationOptions, Pagination } from "nestjs-typeorm-paginate";

type Input = {
  page: number;
  limit: number
}

type Output = Pagination<RoleOutput>;

export class FindAllUseCase implements UseCase<Input, Output> {

  constructor(private readonly roleRepository: RoleRepository) { }

  async execute({ page, limit }: Input): Promise<Output> {
    const paginatedOptions: IPaginationOptions = {
      page,
      limit,
    }

    const paginatedResult = await this.roleRepository.findAllPaginated(paginatedOptions)

    const output: RoleOutput[] = paginatedResult.items.map((role) => {
      return new RoleEntity({
        id: role.id,
        name: role.name,
      })
    })

    return {
      items: output,
      meta: paginatedResult.meta,
      links: paginatedResult.links,
    };
  }

}