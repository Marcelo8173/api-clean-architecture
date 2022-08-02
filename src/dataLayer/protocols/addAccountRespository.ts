import {
  AccountModel,
  AddAccountModel,
} from "../useCases/add-account/dbAddAccountProtocols";

export interface AddAccountRepository {
  add(accountData: AddAccountModel): Promise<AccountModel | null>;
}
