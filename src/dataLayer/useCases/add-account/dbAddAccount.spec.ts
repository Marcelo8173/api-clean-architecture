import { Encrypter } from '../../protocols/encrypter'
import {DbAddAccount} from './dbAddAccount'

interface sutTypes{
    sut: DbAddAccount,
    encrypterStub: Encrypter
}

const makeSut = ():sutTypes => {
    class EncrypterStub implements Encrypter {
        async encrypt(value:string): Promise<string>{
            return new Promise(resolve => resolve('hash_password') )
        }
    }
    
    const encrypterStub = new EncrypterStub()
    const sut = new DbAddAccount(encrypterStub)

    return {
        sut,
        encrypterStub
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
})