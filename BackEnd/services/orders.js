const OrderModel=require("../models/modelOrder")

class Orders{
    
    async getAll(){
        try{
            const orders=await OrderModel.find().populate({path:"orderItems"})
            return orders
        }
        catch(error){
            console.log('Error ! : ', error)
            return {error}
        }
    }


    async getOrdersByUser(user){
        try{
            const orders=await OrderModel.find({user:user}).populate({path:"orderItems"})
            
            return orders
        }
        catch(error){
            console.log('Error ! : ', error)
            return {error}
        }
    }

    
    async getCartByOrderByUser(user,_id){
        try{
            const orders=await OrderModel.find({user:user, _id:_id})
             return orders[0].orderItems.cartItems
        }
        catch(error){
            console.log('Error ! : ', error)
            return {error}
        }
    }

    
    async create(data){
        try{
            const order=await OrderModel.create(data)
            return order
        }
        catch(error){  
            console.log('Error ! : ', error)
           
        }
    }  


    async stripePay(idUser){
        try{

            return {
                success:true
            }

        }catch(error){  
            console.log('Error ! : ', error)
        }
    }
   
    async deleteAllOrdersByUser(_id){
        try{
            const orders=await OrderModel.deleteMany({user:_id})
            return orders
        }
        catch(error){
            console.log('Error ! : ', error)
            return {error}
        }
    }
    
}  

module.exports=Orders;