import { Module } from "@nestjs/common";
import { RoleSchema } from "./role.schema";
import { getDataSourceToken, TypeOrmModule } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { CreateUseCase } from "../application/create.usecase";
import { RoleRepository } from "../domain/role.repository";
import { RoleController } from "./role.controller";
import { RolesRepositoryImpl } from "./role.repository";
import { FindAllUseCase } from "../application/find-all-paginate.usecase";
import { UpdateUseCase } from "../application/update.usecase";

@Module({
  imports: [TypeOrmModule.forFeature([RoleSchema])],
  controllers: [RoleController],
  providers: [
    CreateUseCase,
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
      provide: CreateUseCase,
      useFactory: (repository: RoleRepository) => {
        return new CreateUseCase(repository);
      },
      inject: [RolesRepositoryImpl],
    },
    {
      provide: FindAllUseCase,
      useFactory: (repository: RoleRepository) => {
        return new FindAllUseCase(repository);
      },
      inject: [RolesRepositoryImpl],
    },
    {
      provide: UpdateUseCase,
      useFactory: (repository: RoleRepository) => {
        return new UpdateUseCase(repository);
      },
      inject: [RolesRepositoryImpl],
    },
  ],
})
export class RoleModule { }