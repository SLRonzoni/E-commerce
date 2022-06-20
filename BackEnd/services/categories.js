const CategoryModel=require("../models/modelCategory")
const dbError = require("../helpers/dbError")

class Categories{
    
    async getAll(){
        try{
            const categories=await CategoryModel.find().sort({name:1})
            return categories
        }
        catch(error){
            console.log('Error ! : ', error)
            return {error}
        }
    }


    async getOne(_id){
        try{
            const category=await CategoryModel.findById(_id)
            return category
        }
        catch(error){
            console.log('Error ! : ', error)
            return {error}
        }
    }


    async create(data){
        try{
            const category=await CategoryModel.create(data) 
            return {
                created:true,
                category
            }
        }
        catch(error){
            console.log('Error ! : ', error)
            return dbError(error)
        }
    } 


    async update(_id,data){
        try{
            const category=await CategoryModel.findByIdAndUpdate(_id,data,{new:true}) 
            return category
        }
        catch(error){
            console.log('Error ! : ', error)
            return {error}
        }
    } 


    async delete(_id){
        try{
            const category=await CategoryModel.findByIdAndDelete(_id) 
            return category.name
        }
        catch(error){
            console.log('Error ! : ', error)
            return {error}
        }
    } 
        
}  

module.exports=Categories;