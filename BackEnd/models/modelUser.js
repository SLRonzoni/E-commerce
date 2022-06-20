const{mongoose}=require('../config/db');
const Schema=mongoose.Schema;

const UsersSchema = new Schema({
    name: { type: String, uppercase:true, required: [true,"el nombre es obligatorio"], 
        minlength:[2,"No menor a 3 caracteres"],
        maxlength:[100,"No mayor a 100 caracteres"],trim:true },
    
    lastName: {type: String, uppercase:true, required: [true,"el apellido es obligatorio"], 
        minlength:[2,"No menor a 3 caracteres"],
        maxlength:[100,"No mayor a 100 caracteres"] ,trim:true },

   
    street : { type:String,uppercase:true},
    number : { type:Number},
    floor :  { type:String},
    unit :   { type:String ,uppercase:true},
    city :   { type:String ,uppercase:true},
    zipCode :{ type:String ,uppercase:true},
    sstate : { type:String ,uppercase:true},
    country :{ type:String ,uppercase:true},
    phone :  { type:String},
    
    
    email:{ type: String,uppercase:true,
        unique:[true,"ya existe un usuario registrado con este email"],
        required:[true,"el email es obligatorio"],trim:true,
        match:[/^[\w\.-]+@[\w]+\.[\.\w]+$/,"Email no valido"]
    },
    
    password:{ type: String,
               required:[true,"la password es obligatoria"]      
    },

    myList:{type:Array},

    myFavProducts:{type:Array},
        
    //escala de roles numerica : 10 Admin, 1 User
    role:{ type: Number, required:true, default:1 },

    pic:{type:String,default:""},

    stripeCostumerID:{ type:String},

    provider:{local:Boolean,
              facebook:Boolean,
              google:Boolean,
              github:Boolean},
                    
    idProvider:{facebook:String,
                google:String,
                github:String}
},
{ timestamps:true }
);

const UserModel=mongoose.model("users",UsersSchema);
module.exports=UserModel;

