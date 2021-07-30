import {EmailValidator} from '../presentation/protocols/EmailValidator'

class EmailValidatorAdapter implements EmailValidator {
    
    isValid(email: string): boolean {
        return false
    }

}

export { EmailValidatorAdapter }