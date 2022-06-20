const{mongoose}=require('../config/db');
const Schema=mongoose.Schema;

const CartSchema = new Schema({

    // RELACION CON LA COLECCION USERS
    _id:{
        type:mongoose.Schema.Types.ObjectId, ref:"users"
    },

    // RELACION CON LA COLECCION PRODUCTS
    cartItems:[        
                {
                _id:{ type:mongoose.Schema.Types.ObjectId, ref:"products" },
                quantity:Number
                },
             ]
},
{   timestamps:true }
);


const CartModel=mongoose.model("cart",CartSchema);
module.exports=CartModel;
