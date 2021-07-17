import {SingUpController} from './SingUpController'

describe('SingUpController', () => {
    test('Should return 400 if no name is provided', () =>{
        const sut = new SingUpController()
        const httpRequest = {
            body: {
                // name: "any_name",
                email: "any_name@gmail.com",
                password: "any_password",
                passwordConfirmation: "any_password"
            }
        }
       const httpResponse =  sut.handle(httpRequest)
       expect(httpResponse.statusCode).toBe(400)
       expect(httpResponse.body).toEqual(new Error('Missing param: name'))
    })
    test('Should return 400 if no email is provided', () =>{
        const sut = new SingUpController()
        const httpRequest = {
            body: {
                name: "any_name",
                // email: "any_name@gmail.com",
                password: "any_password",
                passwordConfirmation: "any_password"
            }
        }
       const httpResponse =  sut.handle(httpRequest)
       expect(httpResponse.statusCode).toBe(400)
       expect(httpResponse.body).toEqual(new Error('Missing param: email'))
    })
    
})