const{mongoose}=require('../config/db');
const Schema=mongoose.Schema;

const OrderSchema = new Schema({
    orderItems:{ 
        _id:{ type:mongoose.Schema.Types.ObjectId, ref:"users"},// RELACION CON LA COLECCION USERS         
        cartItems:[        
                {
                _id:String ,
                quantity:Number
                },
            ]
        },
    shippingAddress :{
        name: { type:String,uppercase:true},
        lastName: { type:String,uppercase:true},
        street : { type:String,uppercase:true},
        number : { type:Number},
        floor :  { type:String},
        unit :   { type:String ,uppercase:true},
        city :   { type:String ,uppercase:true},
        zipCode :{ type:String ,uppercase:true},
        sstate : { type:String ,uppercase:true},
        country :{ type:String ,uppercase:true},
    },
    paymentMethod:{ type:String ,required:true},
   
    itemsPrice:{ type:Number,required:true},
    shippingPrice:{ type:Number,required:true},
    taxPrice:{ type:Number,required:true},
    totalPrice:{ type:Number,required:true},
    user:{ type: mongoose.Types.ObjectId, ref:"users", required:[true,""]},
    //isPaid:{type:Boolean, default:"false"},
    paidAt:{type:Date},
    //isDelivered:{type:Boolean, default:"false"},
    deliveredAt:{type:Date}
},
{  timestamps:true }
);

const OrderModel=mongoose.model("Order",OrderSchema);
module.exports=OrderModel;
