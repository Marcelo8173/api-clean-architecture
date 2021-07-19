import { BadRequest, ServerError } from '../Helpers/HttpHelpers'
import { MissingParamsErro,InvalidParamsErro } from '../Erros'
import { Controller,EmailValidator,HttpRequest,HttpResponse } from '../protocols'

class SingUpController implements Controller{

    private readonly emailValidator :EmailValidator

    constructor(emailValidator :EmailValidator){
        this.emailValidator = emailValidator
    } 

    handle(httpRequest:HttpRequest):HttpResponse | undefined{

        try {
            const requiredFields = ['name','email', 'password', 'passwordConfirmation']
    
            for (const field of requiredFields){
                if(!httpRequest.body[field]){
                    return BadRequest( new MissingParamsErro(field))
                }
            }
            
            if(httpRequest.body.password !== httpRequest.body.passwordConfirmation){
                return BadRequest(new InvalidParamsErro('passwordConfirmation'))
            }

            const isValid = this.emailValidator.isValid(httpRequest.body.email)
            if(!isValid){
                return BadRequest( new InvalidParamsErro('email'))
            }
        } catch (error) {
            return ServerError()
        }


    }
}

export {SingUpController}