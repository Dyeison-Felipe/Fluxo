import { Global, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { JwtConfigModule } from 'src/shared/infrastructure/jwt/jwt.module';
import { HASH_REPOSITORY, UtilsModule } from 'src/shared/infrastructure/utils/utils.module';
import { USER_REPOSITORY_TOKEN, UserModule } from 'src/core/user/infrastructure/user.module';
import { LoginUseCase } from '../application/usecase/login.usecase';
import { JwtRepository } from 'src/shared/application/jwt/jwt.repository';
import { HashRepository } from 'src/shared/application/utils/hash-bcrypt.repository';
import { RoleRepository } from 'src/core/role/domain/role.repository';
import { UserRepository } from 'src/core/user/domain/user.repository';
import { UserRepositoryImpl } from 'src/core/user/infrastructure/user.repository';
import { JwtRepositoryImpl } from 'src/shared/infrastructure/jwt/jwt.repository';
import { HashRepositoryImpl } from 'src/shared/infrastructure/utils/hash-bcrypt.repository';
import { LoggedModule } from 'src/shared/infrastructure/user-service/user-service.module';
import { EnvConfig } from 'src/shared/infrastructure/env-config/env-config.interface';
import { EnvConfigService } from 'src/shared/infrastructure/env-config/env-config.service';
import { EnvConfigModule } from 'src/shared/infrastructure/env-config/env-config.module';

@Module({
  imports: [UserModule, JwtConfigModule, UtilsModule, EnvConfigModule, LoggedModule],
  controllers: [AuthController],
  providers: [
    LoginUseCase, 
 
    {
      provide: LoginUseCase,
      useFactory: (
        userRepository: UserRepository,
        hashRepository: HashRepository,
        jwtRepository: JwtRepository,
        envConfig: EnvConfig,
      ) => {
        return new LoginUseCase(
           userRepository, hashRepository, jwtRepository, envConfig
        );
      },
      inject: [USER_REPOSITORY_TOKEN, HASH_REPOSITORY, JwtRepositoryImpl, EnvConfigService],
    },
  ],
})
export class AuthModule { }