const jwt = require("jsonwebtoken")
const { tokenSecret } = require("../config")

//VALIDACION DE TOKEN
function authValidation(req,res,next){ 
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')  ) {
        let [,Btoken]=req.headers.authorization.split("Bearer ");
        if(Btoken){
            try{
                const decoded=jwt.verify(Btoken,tokenSecret)
                //console.log(decoded)
                req.user=decoded
                return next()
            } catch ({message,name}) {
                return res.status(403).json({ error :true, 
                                              message:" Permisos insuficientes, verifique token",
                                              type:name});
            } 
        } else {
            return res.status(403).json({msg:`Token Inexistente`});
        }
    };

    return res.status(403).json({
        error:true,
        message:"Permisos insuficientes, verifique token"
    })
}

//VALIDACIONES DE ROLE
function adminValidation(req,res,next){
    if(req.user.role==="10"){
        return next()
    }else{
        return res.status(403).json({
            error:true,
            message:"Permisos insuficientes, ruta no autorizada"
        })
    }
}

function userValidation(req,res,next){
    if(req.user.role==="1"){
        return next()
    }else{
        return res.status(403).json({
            error:true,
            message:"Permisos insuficientes, ruta no autorizada"
        })
    }
}

function userAdminValidation(req,res,next){
    if(req.user.role==="1" || req.user.role==="10"){
        return next()
    }else{
        return res.status(403).json({
            error:true,
            message:"Permisos insuficientes, ruta no autorizada"
        })
    }
}


function authMiddleware(type){
    let middlewares
    if(type==="1"){
        middlewares=[authValidation,userValidation]
    }else if(type==="10"){
        middlewares=[authValidation,adminValidation]
    }else if(type==="10-1"){
        middlewares=[authValidation,userAdminValidation]
    }else{
        middlewares=[]
    }

    return middlewares
}



module.exports = authMiddleware