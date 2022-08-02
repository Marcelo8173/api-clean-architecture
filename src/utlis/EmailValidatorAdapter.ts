import { EmailValidator } from "../presentation/protocols/EmailValidator";
import validator from "validator";

class EmailValidatorAdapter implements EmailValidator {
  isValid(email: string): boolean {
    return validator.isEmail(email);
  }
}

export { EmailValidatorAdapter };
