import {EmailValidatorAdapter} from './EmailValidatorAdapter'

describe('Email validator adapter', () =>{
    test('Should return false if validator return false', () => {
        const sut = new EmailValidatorAdapter()
        const isValid = sut.isValid('invalid@mail.com')
        expect(isValid).toBe(false)
    })
})