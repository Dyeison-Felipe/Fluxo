import { IPaginationOptions, Pagination } from "nestjs-typeorm-paginate";
import { RoleEntity } from "./role.entity";
import { Repository } from "typeorm";

export interface RoleRepository {
  create(role: RoleEntity): Promise<RoleEntity>;

  findAllPaginated(options: IPaginationOptions): Promise<Pagination<RoleEntity>>;

  findById(id: number): Promise<RoleEntity>;

  existName(name: string): Promise<boolean>;

  update(updateRoleDto: RoleEntity): Promise<RoleEntity>;

  delete(id: number): Promise<void>;
}