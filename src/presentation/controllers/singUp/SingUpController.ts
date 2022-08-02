import { BadRequest, ServerError, Sucess } from "../../Helpers/HttpHelpers";
import { MissingParamsErro, InvalidParamsErro } from "../../Erros";
import {
  Controller,
  EmailValidator,
  HttpRequest,
  HttpResponse,
} from "./SingUp-Protocols";
import { AddAccount } from "../../../domain/useCase/addAccount";

class SingUpController implements Controller {
  private readonly emailValidator: EmailValidator;
  private readonly addAccount: AddAccount;

  constructor(emailValidator: EmailValidator, addAccount: AddAccount) {
    this.emailValidator = emailValidator;
    this.addAccount = addAccount;
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse | undefined> {
    try {
      const requiredFields = [
        "name",
        "email",
        "password",
        "passwordConfirmation",
      ];

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return BadRequest(new MissingParamsErro(field));
        }
      }

      const { name, email, password, passwordConfirmation } = httpRequest.body;

      if (password !== passwordConfirmation) {
        return BadRequest(new InvalidParamsErro("passwordConfirmation"));
      }

      const isValid = this.emailValidator.isValid(email);
      if (!isValid) {
        return BadRequest(new InvalidParamsErro("email"));
      }

      const account = await this.addAccount.add({
        name,
        email,
        password,
      });

      return Sucess(account);
    } catch (error) {
      return ServerError();
    }
  }
}

export { SingUpController };
