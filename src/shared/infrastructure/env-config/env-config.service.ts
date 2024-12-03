import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { EnvConfig } from "./env-config.interface";

@Injectable()
export class EnvConfigService implements EnvConfig {
  constructor(private readonly configService: ConfigService) {}

  getDbHost(): string {
    return this.configService.get<string>('DB_HOST');
  }

  getPort(): number {
    return +this.configService.get<number>('PORT');
  }

  getDbPort(): number {
    return +this.configService.get<number>('DB_PORT');
  }

  getDbName(): string {
    return this.configService.get<string>('DB_NAME');
  }

  getDbUsername(): string {
    return this.configService.get<string>('DB_USER');
  }

  getDbPassword(): string {
    return this.configService.get<string>('DB_PASSWORD');
  }
}
