import { AccountModel,AddAccount,AddAccountModel,Encrypter,AddAccountRepository } from './dbAddAccountProtocols'


class DbAddAccount implements AddAccount {
    private readonly encrypter:Encrypter
    private readonly addAccountRespository:AddAccountRepository

    constructor(encrypter:Encrypter,addAccountRespository:AddAccountRepository){
        this.encrypter = encrypter
        this.addAccountRespository = addAccountRespository
    }

    async add(account: AddAccountModel): Promise<AccountModel | null>{
        await this.encrypter.encrypt(account.password)
        return new Promise(resolve => resolve(null))
    }

}

export {DbAddAccount}