import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { EnvConfig } from "./env-config.interface";

@Injectable()
export class EnvConfigService implements EnvConfig {
  constructor(private readonly configService: ConfigService) {}
  getJwtSecret(): string {
    return this.configService.get<string>('JWT_SECRET');
  }
  getExpiresInSeconds(): number {
    return +this.configService.get<string>('JWT_EXPIRES_IN');
  }

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

  getSalts(): number {
    return +this.configService.get<number>('ENCRYPTION_SALTS');
  }

  getNodeEnv(): 'production' | 'development' {
    return this.configService.get<'production' | 'development'>('NODE_ENV');
  }

  getOrigin(): string {
    return this.configService.get<string>('ORIGIN');
  }

  getAllowedMethods(): string {
    return this.configService.get<string>('ALLOWED_METHODS');
  }

  getCookieSecret(): string {
    return this.configService.get<string>('COOKIE_SECRET');
  }
}
