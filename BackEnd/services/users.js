const dbError = require("../helpers/dbError");
const UserModel = require("../models/modelUser");
const CartService= require("../services/cart")
const uuid = require("uuid");

class Users {
  async getAll() {
    try {
      const users = await UserModel.find()
        .sort({ lastName: 1 })
        .sort({ name: 1 });
      return users;
    } catch (error) {
      console.log("Error ! : ", error);
      return { error };
    }
  }

  async getByEmail(email) {
    try {
      const user = await UserModel.findOne({ email });
      return user;
    } catch (error) {
      console.log("Error ! : ", error);
      return { error };
    }
  }

  async getOne(_id) {
    try {
      const user = await UserModel.findById(_id);
      return user;
    } catch (error) {
      console.log("Error ! : ", error);
      return { error };
    }
  }

  
  async getByLastName(userLastName) {
    try {
      const users = await UserModel.find({ lastName: userLastName });
      return users;
    } catch (error) {
      console.log("Error ! : ", error);
      return { error };
    }
  }

  async getByState(userSstate) {
    try {
      const users = await UserModel.find({ sstate: userSstate });
      return users;
    } catch (error) {
      console.log("Error ! : ", error);
      return { error };
    }
  }

  async getByCity(userCity) {
    try {
      const users = await UserModel.find({ city: userCity });
      return users;
    } catch (error) {
      console.log("Error ! : ", error);
      return { error };
    }
  }

  async getOrCreateByProvider(data) {
    
   const userData={
      provider: {
        [data.provider]: true,
      },
      idProvider: {
        [data.provider]: data.idProvider,
      }
    }

    const email=data.email

    let user = await UserModel.findOne(userData)
   
    if (!user) { 
    data.password = uuid.v4() // contraseña temporal sin encriptar
    const newData = {
      ...data,
      ...userData }
    
        try {
             user = await UserModel.create(newData)
             const cartServ = new CartService()
             const cart = await cartServ.create(user.id)
    }
    catch (error) {
        if (error.code === 11000 && error.keyValue.email) {
        // Duplicated entry
        const email=error.keyValue.email.toUpperCase()
        const provider = "provider." + data.provider
        const idProvider = "idProvider." + data.provider
      
        user = await UserModel.findOneAndUpdate({email },{ 
            [provider]: true,
            [idProvider]: data.idProvider,
          },{ new: true })



          // {"$set":{
                // "userObjects":{
                //     "$mergeObjects":[
                //     "$userObjects",
                //     {"newerItem":"newervalue","newestItem":"newestvalue"}
                //     ]
                // }
                // }}
        return {
          created: true,
          user
        }
      }
      return dbError(error)
   }
  }
  return {
    created: true,
    user
  }
  }
  

  async create(data) {
    try {
      const user = await UserModel.create(data);
      const cartServ = new CartService()
      const cart =await cartServ.create(user.id)
      return {
        created: true,
        user

      }
    } catch (error) {
      console.log("Error ! : ", error);
      return dbError(error);
    }
  }

  async update(_id, data) {
    try {
      if ((_id, data)) {
        const userExist = await UserModel.findById(_id);
        if (userExist) {
          const user = await UserModel.findByIdAndUpdate(_id, data, {
            new: true,
          });
          return user;
        } else {
          return (error = "id inexistente");
        }
      }
    } catch (error) {
      console.log("Error ! : ", error);
      return dbError(error);
    }
  }

  async delete(_id) {
    try {
      const user = await UserModel.findByIdAndDelete(_id);
      return user;
    } catch (error) {
      console.log("Error ! : ", error);
      return { error };
    }
  }
}

module.exports = Users;
