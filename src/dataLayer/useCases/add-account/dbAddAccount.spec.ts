import {DbAddAccount} from './dbAddAccount'

describe('dbAddAccount usecase',() => {
    test('Should call encrypter with correct password', async () => {
        
        class EncrypterStub {
            async encrypt(value:string): Promise<string>{
                return new Promise(resolve => resolve('hash_password') )
            }
        }
        
        
        const encrypterStub = new EncrypterStub()
        const sut = new DbAddAccount(encrypterStub)
        const encryptSpy = jest.spyOn(encrypterStub, 'encrypt')
        const accountDate = {
            name:'valid name',
            email: 'valideEmail@mail.com',
            password:'validPassword'
        }
        await sut.add(accountDate)

        expect(encryptSpy).toHaveBeenCalledWith('validPassword')
    })
})