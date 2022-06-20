const express=require('express');
const ProductService=require('../services/products');
const {app_host,port} = require('../config');
const path=require('path');
const authValidation = require('../middlewares/auth');
const upload=require('../libs/storage')

function products(app){
    const router=express.Router()
    const productServ=new ProductService()

    app.use('/api/products',router)

    //GET 👌
    router.get('/',async (req,res)=>{
        const {productName} = req.query;
        const {categoryNameId} = req.query;

        //filtrar x nombre 👌
        if( (typeof(productName)!=='undefined') ){        
            const products = await productServ.getByName(productName);
            return res.status(200).json(products)
        };

        //filtrar x categoria 👌
        if( (typeof(categoryNameId)!=='undefined')){
            const products = await productServ.getByCategory(categoryNameId);
            return res.status(200).json(products)
        };


        //get todos los productos 👌
        const products = await productServ.getAll();
        return res.status(200).json(products)
    })


    //GET ONE 👌
    router.get('/:_id',async (req,res)=>{
        const product = await productServ.getOne(req.params._id);
        return res.status(200).json(product)
    })

    //POST
    router.post("/",authValidation(10),upload.single('img'),async (req,res)=>{ 
                     
        const product = {
            name:req.body.name,
            description:req.body.description,
            size:req.body.size,
            unitPrice:req.body.unitPrice,
            categoryId:req.body.categoryId,
            stock:req.body.stock
        }

        //asignar a img la ruta de la imagen para guardarla en la bd
        //Ejemplo "http://localhost:4000/public/img-1654900409245.png",
        if(req.file){
            const filename = req.file.filename
            product.img=`${app_host}:${port}/public/${filename}`                           
        };  

        const products=await productServ.create({...product,owner:req.user._id})    
        
        if(products.errors){
            return res.status(403).json(products.errors);
        } 
        return res.status(200).json({ msg:'Producto creado correctamente', products});
    })
   


    //PUT 👌
    router.put("/put/:_id",authValidation(10),async (req,res)=>{
        const product = {
            name:req.body.name,
            img:req.body.img,
            description:req.body.description,
            size:req.body.size,
            unitPrice:req.body.unitPrice,
            categoryId:req.body.categoryId,
            stock:req.body.stock
        }
        const products=await productServ.update(req.params._id,product)
        if(products.error || products.created===false){
            return res.status(403).json(products);
        } 
        return res.status(200).json({ msg:'Producto modificado correctamente', products});
        
    })
    
    //DELETE 👌
    router.delete("/del/:_id",authValidation(10),async (req,res)=>{
        const products=await productServ.delete(req.params._id)
        if(!products.errors){
            console.log(products)
            return res.status(200).json({ msg: 'Producto eliminado', products}); 
        }
        return res.status(403).json({msg : "ERROR : Producto inexistente"}); 
    })
};

module.exports=products;