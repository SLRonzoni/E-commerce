const config = require('../config');
const{mongoose}=require('../config/db');
const Schema=mongoose.Schema;

const ProductsSchema = new Schema({
    name: { type: String, uppercase:true, trim:true,
        unique:[true,"ya existe un producto registrado con este nombre"],
        required: [true,"el nombre del producto es obligatorio"]
    },

    img:{type:String,required: [true,"la imagen del producto es obligatoria"]},

    description:{type:String,required: [true,"la descripción del producto es obligatoria"]},

    size:{type: String, required:[true, "el tamaño es obligatorio"]},

    unitPrice: { type: Number, required: [true,"el precio unitario es obligatorio"] },

    // RELACION CON LA COLECCION CATEGORIES
    categoryId:{type: mongoose.Types.ObjectId, ref:"Categories", required:[true,"la categoria es obligatoria"] },
    
    // RELACION CON LA COLECCION USERS
    owner:{type:mongoose.Schema.Types.ObjectId, ref:"users"},

    stock:{type:Number,required: [true,"el stock del producto es obligatorio"]},

    rating:{type: Number},
    
    numReviews:{type: Number},
},
{   timestamps:true }
);



const ProductModel=mongoose.model("products",ProductsSchema);
module.exports=ProductModel;


