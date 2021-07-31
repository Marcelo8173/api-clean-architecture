import { AccountModel } from '../../../domain/models/AccountModel'
import {AddAccount, AddAccountModel} from '../../../domain/useCase/addAccount'
import { Encrypter } from '../../protocols/encrypter'

class DbAddAccount implements AddAccount {
    private readonly encrypter:Encrypter
    
    constructor(encrypter:Encrypter){
        this.encrypter = encrypter
    }

    async add(account: AddAccountModel): Promise<AccountModel | null>{
        await this.encrypter.encrypt(account.password)
        return new Promise(resolve => resolve(null))
    }

}

export {DbAddAccount}