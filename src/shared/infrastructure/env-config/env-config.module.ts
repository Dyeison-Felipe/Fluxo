import { Module } from "@nestjs/common";
import { ConfigModule, ConfigModuleOptions } from "@nestjs/config";
import { EnvConfigService } from "./env-config.service";
import { join } from "path";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,  // Torna o ConfigService global
      envFilePath: [
        join(__dirname, `../../../../.env`) // Especifique o caminho correto para o .env
      ],
    }),
  ],
  providers: [EnvConfigService],
  exports: [EnvConfigService],
})
export class EnvConfigModule {}
