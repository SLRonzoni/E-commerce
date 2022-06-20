import React from "react";
import {BrowserRouter,Route} from 'react-router-dom';
import "./App.css";


import Register from './components/Register';
import Login from './components/Login';
import LoginGoogle from './components/LoginGoogle';
import LoginFacebook from './components/LoginFacebook';
import LoginGithub from './components/LoginGithub';
import NavBarr from './components/NavBarr';

import UserAllProducts from './components/UserAllProducts';
import MyOrders from "./components/MyOrders";
import MyOrderProducts from "./components/MyOrderProducts";
import Cart from "./components/Cart";
import PaymentMethod from "./components/PaymentMethod";
import Payment from "./components/Payment";
import Stripe from "./components/Stripe";

import Paypal from "./components/Paypal";
import Shipping from "./components/Shipping";
import PlaceOrder from "./components/PlaceOrder";
import Orders from "./components/Orders";
import AllProducts from './components/AllProducts';
import FormProducts from './components/FormProducts';
import EditProduct from './components/EditProduct';
import OneProduct from './components/OneProduct';

import Informes from './components/Informes';
import AllCategories from './components/AllCategories';
import FormCategories from './components/FormCategories';
import EditCategories from './components/EditCategories';

import AllUsers from './components/AllUsers';
import EditUsers from './components/EditUsers';


function App() {
  return (  
  
  <BrowserRouter>  
    <div className="d-flex flex-column site-container">
      
      <header>
        <NavBarr/>
      </header>

      <main className="mt-3">
        <Route exact path="/" component={UserAllProducts}/>       

        {/* BOTH */}
        <Route exact path="/products/:_id" component={OneProduct}/>
        <Route exact path="/UserAllProducts"component={UserAllProducts}/>

        {/* USER */}
        <Route exact path="/authUser/signup" component={Register}/>
        <Route exact path="/authUser/login" component={Login}/>
        <Route exact path="/LoginGoogle" component={LoginGoogle}/>
        <Route exact path="/redes" component={LoginGoogle}/>
        <Route exact path="/LoginFacebook" component={LoginFacebook}/>
        <Route exact path="/LoginGithub" component={LoginGithub}/>
        <Route exact path="/authUser/logout"component={UserAllProducts}/>
        <Route exact path="/cart" component={Cart}/>
        <Route exact path="/ordersClient/myOrders/products/:_id" component={MyOrderProducts}/>
        <Route exact path="/Stripe" component={Stripe}/>
        <Route exact path="/paypal" component={Paypal}/>
        <Route exact path="/users/:_id"component={EditUsers}/>
        <Route exact path="/users/put/:_id"component={EditUsers}/>
        <Route exact path="/shipping" component={Shipping}/>
        <Route exact path="/payment" component={Payment}/>
        <Route exact path="/paymentMethod" component={PaymentMethod}/>
        <Route exact path="/placeOrder" component={PlaceOrder}/>
        <Route exact path="/orders" component={PlaceOrder}/>
        <Route exact path="/myOrders" component={MyOrders}/>
        <Route exact path="/MyOrderProducts" component={MyOrderProducts}/>

        {/* ADMIN */}
        <Route exact path="/AllProducts" component={AllProducts}/>
        <Route exact path="/myOrders/del/:_id"component={AllUsers}/>
        <Route exact path="/FormProducts"component={FormProducts}/>
        <Route exact path="/products/put/:_id"component={EditProduct}/>
        
        <Route exact path="/AllUsers"component={AllUsers}/>
        <Route exact path="/ordersClient" component={Orders}/>
        <Route exact path="/Informes" component={Informes}/>
        
        <Route exact path="/FormCategories" component={FormCategories}/>
        <Route exact path="/AllCategories" component={AllCategories}/>
        <Route exact path="/categories/put/:_id"component={EditCategories}/>        
      </main>

      <footer className="footer">
        <p className="footer-p">{Date()}</p>
      </footer>

    </div>
   </BrowserRouter>
 
  );
}

export default App;
