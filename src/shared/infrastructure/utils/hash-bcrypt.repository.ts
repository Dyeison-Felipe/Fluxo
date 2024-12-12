import { compareSync, hashSync } from "bcrypt";
import { HashRepository } from "../../application/utils/hash-bcrypt.repository";
import { InternalServerError } from "src/shared/application/errors/internal-server-error";
import { EnvConfigService } from "../env-config/env-config.service";
import { Injectable } from "@nestjs/common";


@Injectable()
export class HashRepositoryImpl implements HashRepository {

  constructor(private readonly configService: EnvConfigService) {}

  compareHash(passwordCompare: string, passwordEncrypted: string): boolean {
    return compareSync(passwordCompare, passwordEncrypted);
  }
  generateHash(password: string): string {
    const salts = this.configService.getSalts();

    if (!salts) {
      throw new InternalServerError(`Erro ao gerar senha`);
    }

    return hashSync(password, +salts);
  }

}