const duplicatedError = require("./duplicatedError")
const validationError = require("./validationError")

function dbError(error) {
    //error en datos duplicados
    if(error.code===11000){
        return {
          created:false,
          errors:duplicatedError(error.keyValue)
        }
    }

    //error en validacion de datos
    return {
        created:false,
        errors:validationError(error.errors)
    }
}

module.exports=dbError;