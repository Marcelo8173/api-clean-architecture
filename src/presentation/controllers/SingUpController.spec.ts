import {SingUpController} from './SingUpController'
import { EmailValidator } from '../protocols'
import { ServerErro,InvalidParamsErro,MissingParamsErro } from '../Erros'

interface SutTypes {
    sut: SingUpController
    emailValidatorStub: EmailValidator
}

const makeSut = (): SutTypes => {
    
    class EmailValidatorStub implements EmailValidator{
        isValid (email:string): Boolean{
            return true
        }
    }

    const emailValidatorStub = new EmailValidatorStub()
    const sut = new SingUpController(emailValidatorStub)
    return {
        sut,
        emailValidatorStub
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
       
        class EmailValidatorStub implements EmailValidator{
            isValid (email:string): Boolean{
                throw new Error()
            }
        }

        const emailValidatorStub = new EmailValidatorStub()
        const sut = new SingUpController(emailValidatorStub)

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
})