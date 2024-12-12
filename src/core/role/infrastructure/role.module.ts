import { Module } from "@nestjs/common";
import { RoleSchema } from "./role.schema";
import { getDataSourceToken, TypeOrmModule } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { RoleRepository } from "../domain/role.repository";
import { RoleController } from "./role.controller";
import { RolesRepositoryImpl } from "./role.repository";
import { FindAllRoleUseCase } from "../application/find-all-paginate-role.usecase";
import { UpdateRoleUseCase } from "../application/update-role.usecase";
import { DeleteRoleUseCase } from "../application/delete-role.usecase";
import { CreateRoleUseCase } from "../application/create-role.usecase";

export const ROLE_REPOSITORY='ROLE_REPOSITORY'

@Module({
  imports: [TypeOrmModule.forFeature([RoleSchema])],
  controllers: [RoleController],
  providers: [
    CreateRoleUseCase,
    FindAllRoleUseCase,
    UpdateRoleUseCase,
    DeleteRoleUseCase,

    {
      provide: RolesRepositoryImpl,
      useFactory: (dataSource: DataSource) => {
        return new RolesRepositoryImpl(
          dataSource.getRepository(RoleSchema),
        );
      },
      inject: [getDataSourceToken()],
    },
    {
      provide: ROLE_REPOSITORY, // Mapeia a interface para a implementação
      useExisting: RolesRepositoryImpl, // Indica que já existe um provider com a implementação
    },
    {
      provide: CreateRoleUseCase,
      useFactory: (repository: RoleRepository) => {
        return new CreateRoleUseCase(repository);
      },
      inject: [RolesRepositoryImpl],
    },
    {
      provide: FindAllRoleUseCase,
      useFactory: (repository: RoleRepository) => {
        return new FindAllRoleUseCase(repository);
      },
      inject: [ROLE_REPOSITORY],
    },
    {
      provide: UpdateRoleUseCase,
      useFactory: (repository: RoleRepository) => {
        return new UpdateRoleUseCase(repository);
      },
      inject: [ROLE_REPOSITORY],
    },
    {
      provide: DeleteRoleUseCase,
      useFactory: (repository: RoleRepository) => {
        return new DeleteRoleUseCase(repository);
      },
      inject: [ROLE_REPOSITORY],
    },
  ],
  exports:[ROLE_REPOSITORY],
})
export class RoleModule { }