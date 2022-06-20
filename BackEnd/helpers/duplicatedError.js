function duplicatedError(error){
    const errors = Object.keys(error).map(field=>({
        message:`${field} "${error[field]}", duplicado`,
        field:error.path
    }))
    return
}

module.exports=duplicatedError;