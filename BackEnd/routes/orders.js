const express = require("express")
const OrderService = require("../services/orders")
const CartService = require("../services/cart")
const authValidation = require("../middlewares/auth")

function orders(app){
    const router = express.Router()
    const orderServ = new OrderService()
    const cartServ = new CartService()

    app.use("/api/ordersClient",router)

    //GET todas las ordenes 👌
    router.get("/",authValidation(10), async (req,res)=>{
        const {user} = req.query;

        //filtrar x cliente 👌
        if( (typeof(user)!=='undefined') ){        
            const orders = await orderServ.getOrdersByUser(user);
            return res.status(200).json(orders)
        };

        const result = await orderServ.getAll()
        return res.json(result)
    })

    //GET ordenes por usuario 👌
    router.get("/myOrders/:user",authValidation(1), async (req,res)=>{
        const result = await orderServ.getOrdersByUser(req.user)
        return res.json(result)
    })

    //GET productos por orden por usuario 👌
    router.get("/myOrders/products/:_id",authValidation(1), async (req,res)=>{
        const result = await orderServ. getCartByOrderByUser(req.user,req.params._id)
        return res.json(result)
    })
    


    //POST 👌
    router.post("/",authValidation(1),async (req,res)=>{ 
        
        //busco el carrito
        const cart=await cartServ.getItems(req.user._id) 
        
        const order = {
            orderItems:cart,
            user:req.user._id,
            shippingAddress: req.body.shippingAddress,
            paymentMethod:req.body.paymentMethod,
            itemsPrice:req.body.itemsPrice,
            shippingPrice:req.body.shippingPrice,
            taxPrice:req.body.taxPrice,
            totalPrice:req.body.totalPrice,
            isPaid:"",
            paidAt:"",
            isDelivered:"",
            deliveredAt:""
        }
    
        const orders=await orderServ.create({...order})  

    
        if(order.errors){
            return res.status(403).json(order.errors);
        } 
        return res.status(200).json({ msg:'Orden exitosa', orders});
    })

    
    //GET pagos
    router.get("/stripePay",authValidation(1),async (req,res)=>{ 
        const result = await orderServ.stripePay(req.user._id)
        return res.json(result)
    })


    //DELETE todas las ordenes ( cuando se da de baja un cliente )  👌
    router.delete("/myOrders/del/:_id",authValidation(10), async (req,res)=>{
        const result = await orderServ.deleteAllOrdersByUser(req.params._id)
        return res.json(result)
    })
}

module.exports = orders