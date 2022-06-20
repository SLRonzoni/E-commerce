const express = require("express");
const CategoryService = require("../services/categories");
const authValidation = require("../middlewares/auth");

function categories(app) {
  const router = express.Router();
  const categoryServ = new CategoryService();

  app.use("/api/categories", router);

    //GET 👌
    router.get("/", authValidation(10), async (req, res) => {
        const categories = await categoryServ.getAll();
        return res.status(200).json(categories);
    });

    //GET ONE 👌
    router.get("/:_id", authValidation(10), async (req, res) => {
        const categories = await categoryServ.getOne(req.params._id);
        return res.status(200).json(categories);
    });

    //POST👌
    router.post("/", authValidation(10), async (req, res) => {
        const category = {
            name: req.body.name,
        };

        const categories = await categoryServ.create(category);
        return res
            .status(200)
            .json({ msg: "Categoria creada correctamente", categories });
    });

    //PUT👌
    router.put("/put/:_id", authValidation(10), async (req, res) => {
        const category = {
            name: req.body.name,
        };
        const categories = await categoryServ.update(req.params._id, category);
        return res.status(200).json({ msg: "Categoria modificada", categories });
    });

    //DELETE👌
    router.delete("/del/:_id", authValidation(10), async (req, res) => {
        const categories = await categoryServ.delete(req.params._id);
        return res.status(200).json({ msg: "Categoría eliminada", categories });
    });
}

module.exports = categories;
