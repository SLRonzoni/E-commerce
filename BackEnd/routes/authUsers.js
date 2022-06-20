const express = require("express");
const authValidation = require("../middlewares/auth");
const {
  authResponse,
  providerResponse,
  deleteCookie,
} = require("../helpers/authResponse");
const AuthService = require("../services/authUsers");
const passport = require("passport");
const window = require("coffee-script");

function authUsers(app) {
  const router = express.Router();
  app.use("/api/authUser", router);
  const authServ = new AuthService();

  router.post("/login", async (req, res) => {
    const result = await authServ.login(req.body);
    return authResponse(res, result, 401);
  });

  router.post("/signup", async (req, res) => {
    const result = await authServ.signup(req.body);
    return authResponse(res, result, 400);
  });

  router.get("/logout", (req, res) => {
    return deleteCookie(res);
  });

  router.get("/validate", authValidation(1), (req, res) => {
    return res.json({
      success: true,
      user: req.user,
    });
  });

  //GOOGLE
  //passport devuelve el FORMULARIO de autenticación GOOGLE
  router.get("/google",passport.authenticate("google",{
      scope: ["email", "profile"], // los datos que queremos que devuelva google
   }));

  //passport devuelve los datos que recibimos de google y los hace disponibles en la funcion que ejecutamos
  router.get("/google/callback", passport.authenticate("google", { session: false }), async (req, res) => {
      const user = req.user.profile;
       //console.log(user);
      const result = await authServ.socialLogin(user);
      //console.log(result);
      return providerResponse(res, result, 401);
    }
  );

  //FACEBOOK
  router.get("/facebook",passport.authenticate("facebook", { scope: ["email"], }) );

  router.get("/facebook/callback", passport.authenticate("facebook", { session: false }), async (req, res) => {
      const user = req.user.profile;
      //console.log(user);
      const result = await authServ.socialLogin(user);
      return providerResponse(res, result, 401);
    }
  );

  //GITHUB
  //passport devuelve el formulario de autenticación GITHUB  , { scope: ["user:email"] }
  router.get("/github",passport.authenticate("github") );
 
  router.get("/github/callback", passport.authenticate("github", { session: false }),async (req, res) => {
      const user = req.user.profile;
      //console.log(user);
      const result = await authServ.socialLogin(user);
      return providerResponse(res, result, 401);
    }
  );
}
module.exports = authUsers;
