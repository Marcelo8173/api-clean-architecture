import {SingUpController} from './SingUpController'
import { EmailValidator } from '../protocols'
import { ServerErro,InvalidParamsErro,MissingParamsErro } from '../Erros'
import { AddAccount, AddAccountModel } from '../../domain/useCase/addAccount'
import { AccountModel } from '../../domain/models/AccountModel'

interface SutTypes {
    sut: SingUpController
    emailValidatorStub: EmailValidator,
    addAccountStub: AddAccount
}

const makeSut = (): SutTypes => {
    
    class EmailValidatorStub implements EmailValidator{
        isValid (email:string): Boolean{
            return true
        }
    }

    class AddAccountStub implements AddAccount{
        add(account: AddAccountModel): AccountModel{
            const fakeAccount = {
                id: 'valid_id',
                name: 'valid_name',
                email: 'valid_email@email.com',
                password: 'valid_password'
            }

            return fakeAccount
        }
    }

    const emailValidatorStub = new EmailValidatorStub()
    const addAccountStub = new AddAccountStub()
    const sut = new SingUpController(emailValidatorStub,addAccountStub)
    return {
        sut,
        emailValidatorStub,
        addAccountStub
    }
}

describe('SingUpController', () => {
    test('Should return 400 if no name is provided', () =>{
        const {sut} = makeSut()
        const httpRequest = {
            body: {
                // name: "any_name",
                email: "any_name@gmail.com",
                password: "any_password",
                passwordConfirmation: "any_password"
            }
        }
       const httpResponse =  sut.handle(httpRequest)
       expect(httpResponse?.statusCode).toBe(400)
       expect(httpResponse?.body).toEqual(new MissingParamsErro('name'))
    })
    test('Should return 400 if no email is provided', () =>{
        const {sut} = makeSut()
        const httpRequest = {
            body: {
                name: "any_name",
                // email: "any_name@gmail.com",
                password: "any_password",
                passwordConfirmation: "any_password"
            }
        }
       const httpResponse =  sut.handle(httpRequest)
       expect(httpResponse?.statusCode).toBe(400)
       expect(httpResponse?.body).toEqual(new MissingParamsErro('email'))
    })
    test('Should return 400 if no password is provided', () =>{
        const {sut} = makeSut()
        const httpRequest = {
            body: {
                name: "any_name",
                email: "any_name@gmail.com",
                // password: "any_password",
                passwordConfirmation: "any_password"
            }
        }
       const httpResponse =  sut.handle(httpRequest)
       expect(httpResponse?.statusCode).toBe(400)
       expect(httpResponse?.body).toEqual(new MissingParamsErro('password'))
    })
    test('Should return 400 if no passwordConfirmation is provided', () =>{
        const {sut} = makeSut()
        const httpRequest = {
            body: {
                name: "any_name",
                email: "any_name@gmail.com",
                password: "any_password",
                // passwordConfirmation: "any_password"
            }
        }
       const httpResponse =  sut.handle(httpRequest)
       expect(httpResponse?.statusCode).toBe(400)
       expect(httpResponse?.body).toEqual(new MissingParamsErro('passwordConfirmation'))
    })
    test('Should return 400 if an invalid email is provider', () =>{
       
        const {sut, emailValidatorStub} = makeSut()
        
        jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)

        const httpRequest = {
            body: {
                name: "any_name",
                email: "invalid_name@gmail.com",
                password: "any_password",
                passwordConfirmation: "any_password"
            }
        }
       const httpResponse =  sut.handle(httpRequest)
       expect(httpResponse?.statusCode).toBe(400)
       expect(httpResponse?.body).toEqual(new InvalidParamsErro('email'))
    })
    test('Should return 400 if passworConfirmationFails', () =>{
       
        const {sut, emailValidatorStub} = makeSut()
        
        jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)

        const httpRequest = {
            body: {
                name: "any_name",
                email: "invalid_name@gmail.com",
                password: "any_password",
                passwordConfirmation: "another_password"
            }
        }
       const httpResponse =  sut.handle(httpRequest)
       expect(httpResponse?.statusCode).toBe(400)
       expect(httpResponse?.body).toEqual(new InvalidParamsErro('passwordConfirmation'))
    })
    test('Should call EmailValidator with correct email', () =>{
       
        const {sut, emailValidatorStub} = makeSut()
        
        const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid')

        const httpRequest = {
            body: {
                name: "any_name",
                email: "invalid_name@gmail.com",
                password: "any_password",
                passwordConfirmation: "any_password"
            }
        }
       sut.handle(httpRequest)
       expect(isValidSpy).toHaveBeenCalledWith('invalid_name@gmail.com')
    })
    test('Should return 500 if EmailValidator throws', () =>{
       
        const {sut,emailValidatorStub} = makeSut()
        
        jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() =>{
            throw new Error()
        })
        
        const httpRequest = {
            body: {
                name: "any_name",
                email: "invalid_name@gmail.com",
                password: "any_password",
                passwordConfirmation: "any_password"
            }
        }
       const httpResponse =  sut.handle(httpRequest)
       expect(httpResponse?.statusCode).toBe(500)
       expect(httpResponse?.body).toEqual(new ServerErro())
    })
    test('Should call AddAccount with correct values', () =>{
       
        const {sut,addAccountStub} = makeSut()
        
        const addSpy = jest.spyOn(addAccountStub, 'add')

        const httpRequest = {
            body: {
                name: "any_name",
                email: "invalid_name@gmail.com",
                password: "any_password",
                passwordConfirmation: "any_password"
            }
        }
       sut.handle(httpRequest)
       expect(addSpy).toHaveBeenCalledWith({
            name: "any_name",
            email: "invalid_name@gmail.com",
            password: "any_password",
       })
    })
})