export interface HashRepository {
  compareHash(passwordCompare: string, passwordEncrypted: string): boolean;

  generateHash(password: string): string;
}