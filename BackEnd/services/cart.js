const CartModel = require("../models/modelCart")
const PaymentsService = require("./payment")

class Cart{

    //muestra solo name y unitPrice
    async getItems(idUser){
        try{
           const result = await CartModel.findById(idUser)
          .populate({path:"cartItems._id",select:"name unitPrice"})
           return result
        }
        catch(error){
            console.log('Error ! : ', error)
            return {error}
        }
    }

    //muestra todos los datos en populate
    async getOneUser(idUser){
        try{
           const result = await CartModel.findById(idUser).populate({path:"cartItems._id"})
           return result
        }
        catch(error){
            console.log('Error ! : ', error)
            return {error}
        }
    }   


    async addToCart(idUser,idProd,quantity){
        try{
            let flag=false;
            //buscar si el producto está en el carrito
            const ifProdInCart  = await CartModel.findById(idUser)
            let cart=ifProdInCart.cartItems
            for(let i=0;i<cart.length;i++){
                if(cart[i]._id==idProd){     
                    flag=true
                }
            };

            if(flag===true){
            //actualizar la cantidad
            const prod = await CartModel.findByIdAndUpdate(idUser,{
                 $set:{
                    cartItems:{
                        _id:idProd,
                        quantity:quantity
                    }
                }
            },{new:true})
            .populate({path:"cartItems._id"})
            console.log('nuevo producto ',prod)
            flag=false
            return prod
        
            } else {                            
                //agregar producto que no está en el carrito
                const prod = await CartModel.findByIdAndUpdate(idUser,{
                    $push:{
                        cartItems:{
                            _id:idProd,
                            quantity:quantity
                        }
                    }
                },{new:true})
                .populate({path:"cartItems._id"})
                console.log('nuevo producto ',prod)
                flag=false
                return prod
            }
        }
        catch(error){
            console.log('Error ! : ', error)
            return {error}
        }
    }

    async removeFromCart(idUser,_id){
        try{
            const result = await CartModel.findByIdAndUpdate(idUser,{
                $pull:{
                    cartItems:{
                        _id:_id
                    }
                }
            },{new:true})

            return result
        }
        catch(error){
            console.log('Error ! : ', error)
            return {error}
        }
    }

    async clearCart(idUser){
        try{
             //busco carrito
             const resultado = await CartModel.findByIdAndUpdate(idUser)
             .populate({path:"cartItems._id"})
 
             //limpiar carrito
             const result = await CartModel.findByIdAndUpdate(idUser,{
                     cartItems:[]
                     },{new:true})      
 
                
                     
                                                 // DESCONTAR DE STOCK
 
             return result
         }
         catch(error){
             console.log('Error ! : ', error)
             return {error}
         }
     }     
          

    //stripe
    async pay(idUser){
        try{ 
            const result = await this.getItems(idUser)
            console.log(result)
            if(result){
                const result = await this.getItems(idUser)
                let total=0;
                for(let i=0;i<result.cartItems.length;i++){
                    total+=result.cartItems[i].quantity*result.cartItems[i]._id.unitPrice
                    total=Math.round(total) // el valor tiene que ser en centavos, entero sin decimales
                }

                if(total>0){                 
                    const paymentsServ = new PaymentsService()
                    const clientSecret = await paymentsServ.createIntent(total)


                    //vaciar el carrito
                    const cart=await this.clearCart(idUser) 
                    console.log('carrito limpio',cart)
          

                    return {
                        success:true,
                        total,
                        clientSecret 
                    }
                } else{
                    return {
                        success:false,
                        message : 'El total a pagar debe ser mayor a 0'
                    }
                }

            } else {
                return {
                    success:false,
                    message : 'Ocurrió un error'
                }
            }
        }
        catch(error){
            console.log('Error ! : ', error)
            return {error}
        }
    }

    async create(idUser){
        try{
            const cart = await CartModel.create({
                _id:idUser,
                cartItems:[]
            })

            return cart
        }
        catch(error){
            console.log('Error ! : ', error)
            return {error}
        }
    }

    async removeCart(idUser){
        try{
            const cart = await CartModel.delete({
                _id:idUser
            })
            return cart
        }
        catch(error){
            console.log('Error ! : ', error)
            return {error}
        }
    }

    async deleteCart(idUser){
        try{
            const result = await CartModel.findOneAndDelete(idUser)
            return result
        }
        catch(error){
            console.log('Error ! : ', error)
            return {error}
        }
    }
}

module.exports = Cart