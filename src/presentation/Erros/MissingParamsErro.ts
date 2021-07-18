class MissingParamsErro extends Error{
    constructor(paramName:string){
        super(`Missing param: ${paramName}`)
        this.name = 'MissingParamsErro'
    }
}

export {MissingParamsErro}