import { Repository } from "typeorm";
import { RoleRepository } from "../domain/role.repository";
import { RoleSchema } from "./role.schema";
import { RoleEntity } from "../domain/role.entity";
import { IPaginationOptions, paginate, Pagination } from "nestjs-typeorm-paginate";

export class RolesRepositoryImpl implements RoleRepository {

  constructor(private readonly rolesRepository: Repository<RoleSchema>) { }

  async delete(id: number): Promise<void> {
    await this.rolesRepository.softDelete(id)

  }

  async existName(name: string): Promise<boolean> {
    const existName = await this.rolesRepository.existsBy({name});

    return existName;
  }

  async findById(id: number): Promise<RoleEntity> {
    const existId = await this.rolesRepository.findOneBy({id})

    return existId;
  }

  async update(entity: RoleEntity): Promise<RoleEntity> {

    const role = await this.rolesRepository.save(entity)

    return role;
  }

  async findAllPaginated(options: IPaginationOptions): Promise<Pagination<RoleEntity>> {

    const roles = await paginate<RoleEntity>(this.rolesRepository, options)

    return roles;
  }

  async create(role: RoleEntity): Promise<RoleEntity> {
    const newRole = await this.rolesRepository.save(role);

    return newRole
  }

}