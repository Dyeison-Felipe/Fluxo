import { Module } from '@nestjs/common';
import { DatabaseModule } from './shared/infrastructure/database/database.module';
import { EnvConfigModule } from './shared/infrastructure/env-config/env-config.module';
import { RoleModule } from './core/role/infrastructure/role.module';
import { UserModule } from './core/user/infrastructure/user.module';

@Module({
  imports: [DatabaseModule, EnvConfigModule, UserModule, RoleModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
