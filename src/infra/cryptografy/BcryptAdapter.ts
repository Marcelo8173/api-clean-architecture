import { Encrypter } from "../../dataLayer/protocols/encrypter";
import bcrypt from "bcrypt";

class BcryptAdapter implements Encrypter {
  private readonly salt: number;

  constructor(salt: number) {
    this.salt = salt;
  }

  async encrypt(value: string): Promise<string> {
    const hash = await bcrypt.hash(value, this.salt);
    return hash;
  }
}

export { BcryptAdapter };
