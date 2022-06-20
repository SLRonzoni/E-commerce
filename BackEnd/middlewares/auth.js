const jwt=require('jsonwebtoken')
const { tokenSecret } = require("../config")

//AÑADE A REQ EL ROLE NECESARIO PARA LA RUTA
function authValidation(role){
    return (req,res,next)=>{
        req.necesarioRole=role
        return validateToken(req,res,next)
    }
};

//VALIDA QUE EXISTA TOKEN
function validateToken(req,res,next){
    const token=req.cookies.token
    if(!token){
        return res.status(403).json({
            success:false,
            message:"Token requerido, ruta no autorizada"
        })
    }
    return  verifyToken(token,req,res,next)
};

//VALIDA QUE EL TOKEN SEA VALIDO
function verifyToken(token,req,res,next){
    try{
        const decoded=jwt.verify(token,tokenSecret)
        delete decoded.iat
        delete decoded.exp
        req.user=decoded
        return validateRole(req,res,next)
    }
    catch({message,name}){
        res.status(403).json({
                    success:false,
                    message:"Token inválido, ruta no autorizada",
                    type:name
        })
    }
};

// VALIDA QUE EL ROLE SEA EL AUTORIZADO PARA LA RUTA
function validateRole(req,res,next){
    if(req.user.role>=req.necesarioRole){
        return next()
    }
    res.status(403).json({
        success:false,
        message:"Permisos insuficientes, ruta no autorizada"
    })
}


module.exports = authValidation;
