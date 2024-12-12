import { Module } from '@nestjs/common';
import { getDataSourceToken, TypeOrmModule } from '@nestjs/typeorm';
import { UserSchema } from './user.schema';
import { UserRepositoryImpl } from './user.repository';
import { DataSource } from 'typeorm';
import { CreateUserUsecase } from '../application/create-user.usecase';
import { UserRepository } from '../domain/user.repository';
import { UserController } from './user.controller';
import { ROLE_REPOSITORY, RoleModule } from 'src/core/role/infrastructure/role.module';
import { HashRepositoryImpl } from 'src/shared/infrastructure/utils/hash-bcrypt.repository';
import { HashRepository } from 'src/shared/application/utils/hash-bcrypt.repository';
import { HASH_REPOSITORY, UtilsModule } from 'src/shared/infrastructure/utils/utils.module';
import { RoleRepository } from 'src/core/role/domain/role.repository';
import { RolesRepositoryImpl } from 'src/core/role/infrastructure/role.repository';
import { EnvConfigModule } from 'src/shared/infrastructure/env-config/env-config.module';

export const USER_REPOSITORY_TOKEN = 'USER_REPOSITORY';

@Module({
  imports: [TypeOrmModule.forFeature([UserSchema]), RoleModule, UtilsModule, EnvConfigModule],
  controllers: [UserController],
  providers: [
    CreateUserUsecase,
    {
      provide: UserRepositoryImpl,
      useFactory: (dataSource: DataSource) => {
        return new UserRepositoryImpl(
          dataSource.getRepository(UserSchema),
        );
      },
      inject: [getDataSourceToken()],
    },
    {
      provide: USER_REPOSITORY_TOKEN, // Mapeia a interface para a implementação
      useExisting: UserRepositoryImpl, // Indica que já existe um provider com a implementação
    },
    {
      provide: CreateUserUsecase,
      useFactory: (
        userRepository: UserRepository,
        roleRepository: RoleRepository,
        hashRepository: HashRepository,
      ) => {
        return new CreateUserUsecase(
          userRepository, roleRepository, hashRepository,
        );
      },
      inject: [USER_REPOSITORY_TOKEN, ROLE_REPOSITORY, HASH_REPOSITORY],
    },
  ],
  exports: [USER_REPOSITORY_TOKEN]
})
export class UserModule { }
