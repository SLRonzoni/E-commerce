const mongoose=require('mongoose');
const { dbUserName,dbPassword,dbHost,dbName } = require('.');

//EVENTO .on PARA CONFIRMAR CONEXION CORRECTA
mongoose.connection.on('open',()=> console.log(`MongoDB conectada : ${dbHost}`));

const connection =async ()=>{
    const conn= await mongoose.connect(`mongodb+srv://${dbUserName}:${dbPassword}@${dbHost}/${dbName}?retryWrites=true&w=majority`, function (err) {
       if (err) {
          console.log('Error en conexion MongoDB: ',err) 
       } 
    })
}

module.exports={connection,mongoose};