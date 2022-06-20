const express = require("express");
const { port, app_host } = require("./config");

//DB
const { connection } = require("./config/db");

//IMPORTAR ROUTES
const authUsers = require("./routes/authUsers");
const users = require("./routes/users");
const products = require("./routes/products");
const orders = require("./routes/orders");
const cart = require("./routes/cart");
const webhooks=require("./routes/webhooks");
const categories = require("./routes/categories");
const bodyParser = require("body-parser");
const cookie = require("cookie-parser");

connection();
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const passport = require("passport");
const {
  useGoogleStrategy,
  useFacebookStrategy,
  useGithubStrategy,
} = require("./middlewares/authProvider");

//MIDDLEWARES
app.use(morgan("dev"));
app.use(
  cors({
    origin: ["http://localhost:3000","http://localhost:5500"],
    credentials: true,
    maxAge: 600
  })
);
app.use("/api/webhooks/stripe",express.raw({type:'application/json'})) // tiene que ir antes de express.json()
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/public", express.static(`${__dirname}/images/imgs`));
app.use(cookie());

//auth con redes sociales
app.use(passport.initialize());
passport.use(useGoogleStrategy());
passport.use(useFacebookStrategy());
passport.use(useGithubStrategy());

//USAR ROUTES
authUsers(app);
users(app);
products(app);
orders(app);
cart(app);
webhooks(app);
categories(app);

app.get("/", async (req, res) => {
  res.send("Ecommerce Mercado de Materiales V1");
});

app.get("/*", async (req, res) => {
  console.log("Ruta no encontrada");
  await res.status(404).json("Error : Ruta no encontrada");
});

app.listen(port, () => {
  console.log(`Servidor escuchando en ${app_host} ${port}`);
});
