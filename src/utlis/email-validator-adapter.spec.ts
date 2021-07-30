import {EmailValidatorAdapter} from './EmailValidatorAdapter'
import validator from 'validator'

jest.mock('validator',() =>({
    isEmail(): boolean{
        return true
    }
}))

const makeStu = () => {
    return new EmailValidatorAdapter()
}

describe('Email validator adapter', () =>{
    test('Should return false if validator return false', () => {
        const sut = makeStu()
        jest.spyOn(validator,'isEmail').mockReturnValueOnce(false)
        const isValid = sut.isValid('invalid@mail.com')
        expect(isValid).toBe(false)
    })
    test('Should return true if validator return true', () => {
        const sut = makeStu()
        const isValid = sut.isValid('invalid@mail.com')
        expect(isValid).toBe(true)
    })
    test('Should call validator with correct email', () => {
        const sut = makeStu()
        const isEmailSpy = jest.spyOn(validator,'isEmail')
        sut.isValid('invalid@mail.com')
        expect(isEmailSpy).toHaveBeenCalledWith('invalid@mail.com')
    })
})