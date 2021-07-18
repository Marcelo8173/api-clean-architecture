class InvalidParamsErro extends Error{
    constructor(paramName:string){
        super(`Invalid param: ${paramName}`)
        this.name = 'InvalidParamsErro'
    }
}

export {InvalidParamsErro}