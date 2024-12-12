import { Global, Module } from "@nestjs/common";
import { HashRepositoryImpl } from "./hash-bcrypt.repository";
import { EnvConfigModule } from "../env-config/env-config.module";
import { EnvConfigService } from "../env-config/env-config.service";

export const HASH_REPOSITORY='HASH_REPOSITORY'

@Module({
  imports: [EnvConfigModule],
  providers: [
    {
      provide: HashRepositoryImpl,
      useFactory: (envConfigService: EnvConfigService) => {
        return new HashRepositoryImpl(envConfigService);
      },
      inject: [EnvConfigService],
    },
    {
      provide: HASH_REPOSITORY,
      useExisting: HashRepositoryImpl,
    },
  ],
  exports: [HASH_REPOSITORY],
})
export class UtilsModule {}
