import bcrypt from 'bcrypt'
import {BcryptAdapter} from './BcryptAdapter'

jest.mock('bcrypt', () => ({
    async hash(): Promise<string>{
        return new Promise(resolve => resolve('hash'))
    }
}))

const salt = 12
const makeSut = ():BcryptAdapter => {
    const sut = new BcryptAdapter(salt)
    return sut
}

describe('BcryptAdapter', () => {
    test('Should call bcrypt wiht correct value', async () => {
        const sut = makeSut()
        const hashSpy = jest.spyOn(bcrypt,'hash')
        await sut.encrypt('any_value')
        expect(hashSpy).toHaveBeenCalledWith('any_value',salt)
    })
    test('Should return a hash on sucess', async () => {
        const sut = makeSut()
        const hash = await sut.encrypt('any_value')
        expect(hash).toBe('hash')
    })
})