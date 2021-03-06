import React, { useContext,useEffect } from "react";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";
import Swal from "sweetalert2";
import axiosClient from "../configuration/axiosClient";
import { Store } from "../Store";

// import Cookies from "universal-cookie";
// const cookies=new Cookies(); 

function RespuestaGoogle() {

  const {state,dispatch:ctxDispatch}=useContext(Store)
  const {userInfo}=state

  //Migracion que exige google  
 useEffect(() => {
  function start() {
    gapi.client.init({
      clientId:"",
        scope: "email",
    });
  }
  gapi.load("client:auth2", start);
}, [])


  if(localStorage.getItem('loginData')==='true') {
    Swal.fire({
      icon: "info",
      title: "Ya te encuentras logueado !",
      showConfirmButton: false,
      timer: 5000,
    })
    
  } else {


  //RESPUESTA OK GOOGLE
  const onSuccess = (googleData) => {  

    let name=googleData.profileObj.name;
   
    const userData={
               user:{ 
                 name:googleData.profileObj.name,
                 email:googleData.profileObj.email
               }
    }
   
    ctxDispatch({type:'USER_SIGNIN',payload:googleData.profileObj})
    localStorage.setItem('userInfo',JSON.stringify(googleData.profileObj))
    localStorage.setItem('shippingAddress',''); 
    localStorage.setItem('paymentMethod','');   
    localStorage.setItem('loginData',true)



    const getUserData = async () => {
      //BUSCAR EN BD DATOS DEL ID Y ROLE DEL EMAIL LOGUEADO 
      //Busco id   
        const response=await axiosClient.get(`/users/redes?userEmail=${googleData.profileObj.email.toUpperCase()}`,
          { withCredentials: true }
        );
       
        if(response.status===200){  
         userData.user.role=response.data.role
         userData.user._id=response.data._id  
        }
        localStorage.setItem('userInfo',JSON.stringify(userData)) 
    }
    getUserData();
  
         
      //MENSAJE DE BIENVENIDA
      Swal.fire({
        icon: "success",
        title: `Bienvenid@ ${name}  !`,
        showConfirmButton: false,
        timer: 5000,
      });
      setTimeout( function() { window.location.href = "/"; },3000 );
  }  
  
    //RESPUESTA MAL GOOGLE
    const onFailure = (response) => {
      console.error("Error Google ! ", response);
      Swal.fire({
        icon: "error",
        title: "Error !",
        text: response,
        showConfirmButton:false,
        timer:5000
      })
    };
    
  return (
    <div>
        <GoogleLogin
          className='m-3 mr-md-2 btn-redes centrar '
          clientId='     '
          onSuccess={onSuccess}
          onFailure={onFailure}
          buttonText=' Iniciar sesion con Google'
        />
    </div>
  );
 } 
};

export default RespuestaGoogle;
