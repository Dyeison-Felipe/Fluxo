import { IPaginationOptions, Pagination } from "nestjs-typeorm-paginate";
import { RoleEntity } from "./role.entity";

export interface RoleRepository {
  create(role: RoleEntity): Promise<RoleEntity>;

  findAllPaginated(options: IPaginationOptions): Promise<Pagination<RoleEntity>>;

  findById(id: number): Promise<RoleEntity>;

  update(id: number): Promise<RoleEntity>;
}