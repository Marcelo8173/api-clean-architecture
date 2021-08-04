import { AccountModel,AddAccount,AddAccountModel,Encrypter,AddAccountRepository } from './dbAddAccountProtocols'


class DbAddAccount implements AddAccount {
    private readonly encrypter:Encrypter
    private readonly addAccountRespository:AddAccountRepository

    constructor(encrypter:Encrypter,addAccountRespository:AddAccountRepository){
        this.encrypter = encrypter
        this.addAccountRespository = addAccountRespository
    }

    async add(accountData: AddAccountModel): Promise<AccountModel | null>{
        const hashPassword = await this.encrypter.encrypt(accountData.password)
        const account = await this.addAccountRespository.add(Object.assign({},accountData,{
            password: hashPassword
        }))
        return account
    }

}

export {DbAddAccount}