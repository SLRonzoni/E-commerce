const express = require("express");
const CartService = require("../services/cart");
const authValidation = require("../middlewares/auth");

function cart(app) {
  const router = express.Router();
  const cartServ = new CartService();

  app.use("/api/cart", router);

  //Stripeπ
  router.get("/pay",authValidation(1), async(req, res)=>{
    const result = await cartServ.pay(req.user._id)
    return res.json(result)
})

  //GET itemsπ
  router.get("/", authValidation(1), async (req, res) => {
    const result = await cartServ.getItems(req.user._id);
    return res.json(result);
  });

  //GET By USER π
  router.get("/:user", authValidation(1), async (req, res) => {
    const result = await cartServ.getOneUser(req.user._id);
    return res.json(result);
  })

  //POST π
  router.post("/add", authValidation(1), async (req, res) => {
    const { _id, quantity } = req.body;
    const result = await cartServ.addToCart(req.user._id, _id, quantity);
    return res.json(result);
  });

  //DELETE UN PRODUCTO π
  router.delete("/del", authValidation(1), async (req, res) => {
    const { _id } = req.body;
    const result = await cartServ.removeFromCart(req.user._id, _id);
    return res.json(result);
  });


  //VACIAR CARRITO π
  router.post("/paymentCompleted", authValidation(1), async (req, res) => {
    const result = await cartServ.clearCart(req.user._id);
    return res.json(result);
  });


   //DELETE CARRITO ( cuando se elimina el cliente ) π
   router.delete("/delCart/:_id", authValidation(1), async (req, res) => {
    const result = await cartServ.deleteCart(req.params._id);
    return res.json(result);
  });
  


}

module.exports = cart;
