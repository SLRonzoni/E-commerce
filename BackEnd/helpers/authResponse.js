const { production } = require("../config")

function authResponse(res,result,statusCode){ 
    if(result.success){
        //const token=result.token // cookie disponible para toda la aplicacion, si quiero una ruta part...usar path
        const{token,...data}=result
        console.log('tokenLoginLocal',token)
        return res.status(201).cookie("token",token
                                        ,
                                        {httpOnly:true,
                                        secure:production,//disponible solo en https*
                                        //sameSite:"none", //"lax", "strict"
                                        expires:new Date(new Date().setDate(new Date().getDate()+7))//7 dias mas de la fecha de mi sistema op
                                        }
                                        ).json(data)
                                        
    }
   
    return res.status(statusCode).json(result)
}

function providerResponse(res,result,statusCode){
    if(result.success){
        const{token,...data}=result
        console.log('tokenProvider',token,'dataProvider',data)
        return res.status(201).cookie("token",token
                                        ,
                                        {httpOnly:true,
                                        secure:production,   //disponible solo en https*
                                        //sameSite:"none",   //"lax", "strict"  OJO !!! hace token undefined para react
                                        expires:new Date(new Date().setDate(new Date().getDate()+7))//7 dias mas de la fecha de mi sistema op
                                        }
                                        ).redirect("http://localhost:3000")
                                        
    }
    return res.status(statusCode).json(result)
}

function deleteCookie(res){
    return res.cookie("token",""
    ,
        { httpOnly:true,
        expires:new Date(),
        //sameSite:"none",
        secure:production
       }
    ).json({
        success:true,
        message:"Te has deslogueado con exito !"
    })
}

module.exports = {authResponse,deleteCookie,authResponse,providerResponse};
