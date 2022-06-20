const ProductModel=require("../models/modelProduct")
const dbError = require("../helpers/dbError")
const { stripeSecretKey } = require("../config")
// const stripe=require('stripe')(stripeSecretKey)


class Products{
    
    async getAll(){
        try{
            const products=await ProductModel.find().sort({name:1})
            return products
        }
        catch(error){
            console.log('Error ! : ', error)
            return {error}
        }
    }

    async getOne(_id){
        try{
            const product=await ProductModel.findById(_id)
            if(product) {
            return product
            }
        }
        catch(error){
            console.log('Error ! : ', error)
            return {error}
        }
    }
    
    async getByName(productName){              
        try{
            const products=await ProductModel.find({name:productName})
            return products
        }
        catch(error){
            console.log('Error ! : ', error)
            return {error}
        }
    }

    async getByCategory(categoryNameId){              
        try{
            const products=await ProductModel.find({categoryId:categoryNameId})
            return products
        }
        catch(error){
            console.log('Error ! : ', error)
            return {error}
        }
    }

    async create(data){
        try{
            const product=await ProductModel.create(data)
            return product
        }
        catch(error){  
            console.log('Error ! : ', error)
            return dbError(error)
        }
    } 


    async update(_id,data){
        try{
            if(_id,data){
                const productExist=await ProductModel.findById(_id)
                if(productExist){
                    const product=await ProductModel.findByIdAndUpdate(_id,data,{new:true}) 
                    return product
                } else {
                    return error='id inexistente'
                }
            }
        }
        catch(error){
            console.log('Error ! : ', error)
            return dbError(error)
        }
    } 


    async delete(_id){
        try{
            const product=await ProductModel.findByIdAndDelete(_id) 
            return `${product.name}`
        }
        catch(error){
            console.log('Error ! : ', error)
            return {error}
        }
    } 
        
}  

module.exports=Products;