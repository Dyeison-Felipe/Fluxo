export interface EnvConfig {
  getDbHost(): string;
  getDbPort(): number;
  getPort(): number;
  getDbName(): string;
  getDbUsername(): string;
  getDbPassword(): string;
}