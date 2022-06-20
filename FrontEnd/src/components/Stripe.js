import React, { useContext,useState,useEffect} from "react";
import { Store } from "../Store";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./CheckoutForm";
import "../App.css";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe("pk_test_51L993ZIYrRaPILiLPyyVwSoGcorqR9ySjHfswK0qchq4KNQbMZWm0DG6QR8gPZilRmBNl81dk3UmquUqNSrRAKv500OkPa6IZt");

export default  function App () {

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const [clientSecret, setClientSecret] = useState("");

  useEffect(  ()  => {
    // Create PaymentIntent as soon as the page loads
    fetch("http://localhost:4000/api/cart/pay",{
      credentials:"include"
  
    })
      .then((res) =>  res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  localStorage.removeItem('cartItems'); 
  localStorage.removeItem('shippingAddress'); 
  localStorage.removeItem('paymentMethod');

  return (
    <div className="App stripe centrar">
      <br></br>
      <h1>Stripe</h1>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <br></br>
          <CheckoutForm />
          <br></br>
        </Elements>
      )}
    </div>
  );
}