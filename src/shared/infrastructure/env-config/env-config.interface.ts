export interface EnvConfig {
  getDbHost(): string;
  getDbPort(): number;
  getPort(): number;
  getDbName(): string;
  getDbUsername(): string;
  getDbPassword(): string;
  getSalts(): number;
  getJwtSecret(): string;
  getExpiresInSeconds(): number;
  getNodeEnv(): 'production' | 'development';
  getOrigin(): string;
  getAllowedMethods(): string;
  getCookieSecret(): string;
}