import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EnvConfigModule } from "../env-config/env-config.module";
import { EnvConfigService } from "../env-config/env-config.service";
import { RoleSchema } from "src/core/role/infrastructure/role.schema";
import { UserSchema } from "src/core/user/infrastructure/user.schema";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [EnvConfigModule],
      useFactory: async (configService: EnvConfigService) => ({
        type: 'mysql',
        host: configService.getDbHost(),
        port: configService.getDbPort(),
        username: configService.getDbUsername(),
        password: configService.getDbPassword(),
        database: configService.getDbName(),
        entities: [RoleSchema, UserSchema],
        migrations: [`${__dirname}/migrations/{.ts,*.js}`],
        synchronize: false,
        migrationsRun: true,
      }),

      inject: [EnvConfigService],
    }),
  ],
  controllers: [],
  providers: [],
})
export class DatabaseModule { }