import { Encrypter, AddAccountModel,AccountModel,AddAccountRepository } from './dbAddAccountProtocols'
import {DbAddAccount} from './dbAddAccount'

interface sutTypes{
    sut: DbAddAccount,
    encrypterStub: Encrypter,
    addAccountRepositoryStub: AddAccountRepository
}

const makeAddAccountRepository = (): AddAccountRepository => {
    class AddAccountRespositoryStub implements AddAccountRepository{
        async add(accountData: AddAccountModel): Promise<AccountModel | null>{
            const fakeAccount = {
                id:'valid_id',
                name:'valid name',
                email: 'valideEmail@mail.com',
                password:'hash_password'
            }

            return new Promise(resolve => resolve(fakeAccount))
        }
    }

    return new AddAccountRespositoryStub()
}

const makeSut = ():sutTypes => {
    class EncrypterStub implements Encrypter {
        async encrypt(value:string): Promise<string>{
            return new Promise(resolve => resolve('hash_password') )
        }
    }
    
    const encrypterStub = new EncrypterStub()
    const addAccountRepositoryStub = makeAddAccountRepository() 
    const sut = new DbAddAccount(encrypterStub,addAccountRepositoryStub)

    return {
        sut,
        encrypterStub,
        addAccountRepositoryStub
    }
}

describe('dbAddAccount usecase',() => {
    test('Should call encrypter with correct password', async () => {
        const {encrypterStub,sut} = makeSut()
        const encryptSpy = jest.spyOn(encrypterStub, 'encrypt')
        const accountDate = {
            name:'valid name',
            email: 'valideEmail@mail.com',
            password:'validPassword'
        }
        await sut.add(accountDate)

        expect(encryptSpy).toHaveBeenCalledWith('validPassword')
    })
    test('Should throw if encrypter throws', async () => {
        const {encrypterStub,sut} = makeSut()
        jest.spyOn(encrypterStub, 'encrypt')
            .mockReturnValueOnce(new Promise((resolve,reject) => reject(new Error())))
        
        const accountDate = {
            name:'valid name',
            email: 'valideEmail@mail.com',
            password:'validPassword'
        }

        const promise = sut.add(accountDate)

        await expect(promise).rejects.toThrow()
    })
    test('Should call add account repository with correct values', async () => {
        const {sut, addAccountRepositoryStub} = makeSut()
        const addSpy = jest.spyOn(addAccountRepositoryStub, 'add')
        
        const accountDate = {
            name:'valid name',
            email: 'valideEmail@mail.com',
            password:'validPassword'
        }

        await sut.add(accountDate)

        expect(addSpy).toHaveBeenCalledWith({
            name:'valid name',
            email: 'valideEmail@mail.com',
            password:'hash_password'
        })
    })
    test('Should return an account on sucess', async () => {
        const {sut} = makeSut()
        
        const accountDate = {
            name:'valid name',
            email: 'valideEmail@mail.com',
            password:'validPassword'
        }

       const account = await sut.add(accountDate)

        expect(account).toEqual({
            id: 'valid_id',
            name:'valid name',
            email: 'valideEmail@mail.com',
            password:'hash_password'
        })
    })
})