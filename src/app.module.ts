import { Module } from '@nestjs/common';
import { DatabaseModule } from './shared/infrastructure/database/database.module';
import { EnvConfigModule } from './shared/infrastructure/env-config/env-config.module';
import { RoleModule } from './core/role/infrastructure/role.module';
import { UserModule } from './core/user/infrastructure/user.module';
import { UtilsModule } from './shared/infrastructure/utils/utils.module';
import { AuthModule } from './core/auth/infrastructure/auth.module';

@Module({
  imports: [DatabaseModule, EnvConfigModule, UserModule, RoleModule, UtilsModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
