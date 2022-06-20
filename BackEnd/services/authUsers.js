const bcrypt=require('bcrypt')
const User=require("./users")
const jwt=require('jsonwebtoken')
const {tokenSecret, tokenExpires}= require('../config')


class AuthUser{
    
    //LOGUEO  👌
    async login(data){
        const {email,password}=data
        const userServ=new User()
        const user=await  userServ.getByEmail(email)

        if(user && await this.#compare(password,user.password)){
            return this.#getUserData(user)
        }
        return {
            success:false,
            errors:['Error ! : Email y/o Password incorrectas'] 
        }
    }

    //REGISTRO  👌
    async signup(data){
        //VALIDAR QUE ENVIEN TODOS LOS DATOS Y ENCRIPTAR LA PASSWORD
        if ( data && data.password  ){
            data.password= await this.#encrypt(data.password)
        }
        data.provider={local:true}
        const userServ = new User()
        const result= await userServ.create(data)
        
        if(!result.created){
            //error duplicados
            return {
                success:false,
                errors:result.errors                        
            }
         }
                                                               
        return this.#getUserData(result.user)
    } 


    //SOCIAL LOGIN  👌
     async socialLogin(data){
        const userServ = new User()
        // //Asigno los datos que envia el proveedor, a mis variables de base de datos users
        let user,providerLastName,providerName,providerEmail='';

        if(data.provider==='google' || data.provider==='facebook' ){
            providerName=data.name.givenName,
            providerLastName=data.name.familyName,
            providerEmail=data.emails[0].value
        };

        if(data.provider==='github'){
            providerName=data.displayName,
            providerLastName=data.displayName,
            providerEmail=data.email       

            if(data._json.email===null ||  data.emails ===null){
            providerEmail='slronzoni@gmail.com'
            };
        };   
        
         user={
            idProvider:data.id,
            //name:data.displayName,
            //email:data.emails[0].value,
            //lastName:data.displayName,
            name:providerName,
            lastName:providerLastName,
            email:providerEmail,
            pic:data.photos[0].value,
            provider:data.provider
            }
        
        const result = await userServ.getOrCreateByProvider(user)

        if(!result.created){
            return {
                success:false,
                errors:result.errors
            }
        }
       
        return this.#getUserData(result.user)
    } 

    
    //DATOS DEL USUARIO Y TOKEN  👌
    #getUserData(user){ 
        const userData={
            name:user.name,
            lastName:user.lastName,
            role:user.role, 
            provider:user.provider,
            idProvider:user.idProvider,
            // stripeCustomerID:user.stripeCustomerID,
            email:user.email,
            _id:user._id 
        }
        const token=this.#createToken(userData)                                         
        return{
            success:true,
            user:userData,
            token
        }
        
    }

    //CREAR TOKEN con tiempo de expiracion en .env  👌
    #createToken(payload){
        const token= jwt.sign(payload,tokenSecret,{
            expiresIn:tokenExpires
        }) 
        return token
    }

    //ENCRIPTAR PASSWORD  👌
    async #encrypt(string){
        try{
            const salt = await bcrypt.genSalt()
            const hash = await bcrypt.hash(string,salt)
            return hash
        }
        catch(error){
            console.log(error)
        }
    }

    //VERIFICAR SI ES CORRECTA PASSWORD  👌
    async #compare(string,hash){
        try{      
            return await bcrypt.compare(string,hash)
        } catch(error){
            return false
        }
    }

}


module.exports=AuthUser;