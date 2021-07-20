import { ServerErro } from "../Erros/ServerErro"
import { HttpResponse } from "../protocols/http"

export const BadRequest = (error: Error): HttpResponse =>{
    return{
        statusCode: 400,
        body: error
    }
}

export const ServerError = (): HttpResponse =>{
    return{
        statusCode: 500,
        body: new ServerErro()
    }
}

export const Sucess = (data:any): HttpResponse =>{
    return{
        statusCode: 200,
        body: data
    }
}