import React, {  useContext } from "react";
import FacebookLogin from "react-facebook-login";
import { Store } from "../Store";
import Swal from "sweetalert2";
import axiosClient from "../configuration/axiosClient";

const RespuestaFacebook = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  if(localStorage.getItem('loginData')==='true') {
    Swal.fire({
      icon: "info",
      title: "Ya te encuentras logueado !",
      showConfirmButton: false,
      timer: 5000,
    })
     
  } else {

   
  //RESPUESTA OK FACEBOOK
  const onSuccess = (facebookData) => {

    let name = facebookData.displayName;

    const userData={
                user:{ 
                  name:facebookData.profileObj.name,
                  email:facebookData.profileObj.email
                }
    }   

    ctxDispatch({ type: "USER_SIGNIN", payload: facebookData.data.user });
    localStorage.setItem("userInfo", JSON.stringify(facebookData.data));
    localStorage.setItem("shippingAddress", "");
    localStorage.setItem("paymentMethod", "");
    localStorage.setItem('loginData',true)


    const getUserData = async () => {
      //BUSCAR EN BD DATOS DEL ID Y ROLE DEL EMAIL LOGUEADO
      //Busco id
      const response = await axiosClient.get(`/users/redes?userEmail=${facebookData.profileObj.email.toUpperCase()}`,
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
      title: `Bienvenid@ ${name} !`,
      showConfirmButton: false,
      timer: 5000,
    });
    setTimeout( function() { window.location.href = "/"; },3000 );
  }

  //REPUESTA MAL FACEBOOK
  const onFailure = (response) => {
    console.error("Error Facebook ! ", response);
    Swal.fire({
      icon: "error",
      title: "Error !",
      text: response,
      showConfirmButton: false,
      timer: 5000,
    });
  };

  return (
    <div>
      <FacebookLogin
          className='m-3 mr-md-2 btn-redes centrar '
          appId='    '
          textButton=' Iniciar sesion con Facebook'
          fields='name,email,photo'
          autoLoad={false}
          onSuccess={onSuccess}
          onFailure={onFailure}
          icon='fa-facebook'
          cssClass='btn-redes'
        />
    </div>
  );
  } 
};

export default RespuestaFacebook;
