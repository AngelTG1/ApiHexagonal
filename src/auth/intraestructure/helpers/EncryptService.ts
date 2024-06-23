import bcrypt from "bcrypt";

import { IEcryptService } from "../../aplication/Services/IEncryptService";

export class EncryptService implements IEcryptService {
  encodePassword(password: string): string {
    const pass = bcrypt.hashSync(password, 10);

    return pass;
  }
  authPassword(word: string, passwordEncode: string): boolean {
    const result = bcrypt.compareSync(word, passwordEncode);
    return result;
  }
}
