import React, { useContext} from "react";
import { Store } from "../Store";
import axiosClient from '../configuration/axiosClient'

export default function Paypal() {

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;
    
  //vaciar carrito
  const clearCart = async (props) => {
    await axiosClient.post('/cart/paymentCompleted',{withCredentials:true})
    .then(respuesta => {
      if (respuesta) {
        console.log('carrito limpio')
      }
    })
    .catch(error =>{
      console.log(error)
    })
  }  
  clearCart()

  
  localStorage.removeItem('cartItems'); 
  localStorage.removeItem('shippingAddress'); 
  localStorage.removeItem('paymentMethod');

  setTimeout( function() { window.location.href = `/UserAllProducts`; },2000 )

  return (
    <div >
      <h1>Paypal</h1>
      
    </div>
  );
 
}