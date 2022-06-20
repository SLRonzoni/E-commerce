const{mongoose}=require('../config/db');
const Schema=mongoose.Schema;

const CategoriesSchema = new Schema({
    name: { type: String,  uppercase:true, trim:true,
        unique:[true,"ya existe una categoria registrada con este nombre"],
        required: [true,"el nombre es obligatorio"]
    }  
},
{   timestamps:true }
);

const CategoryModel=mongoose.model("categories",CategoriesSchema);
module.exports=CategoryModel;


