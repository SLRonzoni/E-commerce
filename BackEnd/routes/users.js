const express = require("express");
const authValidation = require("../middlewares/auth");
const UserService = require("../services/users");
const bcrypt = require("bcrypt");

function users(app) {
  const router = express.Router();
  const userServ = new UserService();

  app.use("/api/users", router);

  //GET 👌
  router.get("/", authValidation(10), async (req, res) => {
    const { userLastName } = req.query;
    const { userSstate } = req.query;
    const { userCity } = req.query;

    //filtrar x Provincia 👌
    if (typeof userSstate !== "undefined") {
      const users = await userServ.getByState(userSstate);
      return res.status(200).json(users);
    }

    //filtrar x Apellido 👌
    if (typeof userLastName !== "undefined") {
      const users = await userServ.getByLastName(userLastName);
      return res.status(200).json(users);
    }

    //filtrar x Localidad 👌
    if (typeof userCity !== "undefined") {
      const users = await userServ.getByCity(userCity);
      return res.status(200).json(users);
    }

      //get todos los usuarios 👌
      const users = await userServ.getAll();
      return res.status(200).json(users);
  });

  //GET ONE BY EMAIL...SOLO PARA LOGUEO CON REDES 👌
  router.get("/redes", async (req, res) => {
    const { userEmail } = req.query;
    //filtrar x email 👌
    if (typeof userEmail !== "undefined") {
      const users = await userServ.getByEmail(userEmail);
      return res.status(200).json(users);
    }
  });

  //GET ONE BY ID 👌
  router.get("/:_id", authValidation(1), async (req, res) => {
    //VERIFICAR QUE EL USUARIO LOGUEADO SEA EL DUEÑO DE LOS DATOS A VER
    if (req.user._id === req.params._id) {
      const user = await userServ.getOne(req.params._id);
      return res.status(200).json(user);
    } else {
      return res
        .status(403)
        .json({ msg: "Solo puede acceder a sus datos de perfil" });
    }
  });

  //POST 👌
  router.post("/", async (req, res) => {
    const user = {
      name: req.body.name,
      lastName: req.body.lastName,
      street: req.body.street,
      number: req.body.number,
      floor: req.body.floor,
      unit: req.body.unit,
      city: req.body.city,
      zipCode: req.body.zipCode,
      sstate: req.body.sstate,
      street: req.body.street,
      country: req.body.country,
      phone: req.body.phone,
      email: req.body.email,
      password: req.body.password,
    };

    const users = await userServ.create(user);
    if (users.errors) {
      return res.status(403).json(users.errors);
    }
    return res
      .status(200)
      .json({ msg: "Usuario creado correctamente", users });
  });

  //PUT 👌
  router.put("/put/:_id", authValidation(1), async (req, res) => {
    const user = {
      name: req.body.name,
      lastName: req.body.lastName,
      street: req.body.street,
      number: req.body.number,
      floor: req.body.floor,
      unit: req.body.unit,
      city: req.body.city,
      zipCode: req.body.zipCode,
      sstate: req.body.sstate,
      street: req.body.street,
      country: req.body.country,
      phone: req.body.phone,
      //email:req.body.email,              NO SE PERMITE MODIFICAR EL EMAIL
      password: req.body.password,
      myfavProduct: req.body.myfavProduct,
      myList: req.body.myList,
      //role:'USER',                       NO SE PERMITE MODIFICAR
    };

    //VERIFICAR QUE EL USUARIO LOGUEADO SEA EL DUEÑO DE LOS DATOS A MODIFICAR
    //Y SI HAY PASSWORD ENCRIPTARLA
    if (req.user._id === req.params._id) {
      if (user.password) {
  
          const salt = await bcrypt.genSalt();
          const hash = await bcrypt.hash(user.password, salt);
          user.password = hash;
      }

      const users = await userServ.update(req.params._id, user);

      if (users.created === false || users.error) {
        return res.status(403).json(users);
      }

      return res
        .status(200)
        .json({ msg: "Usuario modificado correctamente", users });
    } else {
      return res
        .status(403)
        .json({ msg: "Solo puede acceder a sus datos de perfil" });
    }
  });

  //DELETE 👌
  router.delete("/del/:_id", authValidation(10), async (req, res) => {
    const users = await userServ.delete(req.params._id);
    const email = users.email;
    if (users.message) {
      return res.status(403).json(users.message);
    }
    return res.status(200).json({ msg: "Usuario eliminado", email });
  });
}

module.exports = users;
