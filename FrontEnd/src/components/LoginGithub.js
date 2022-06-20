import React,{useContext} from "react";
import { Store } from "../Store";
import GithubLogin from 'react-login-github';
import Swal from "sweetalert2";
import axiosClient from "../configuration/axiosClient";

import Cookies from "universal-cookie";
const cookies=new Cookies();

const RespuestaGit = () => {

  const {state,dispatch:ctxDispatch}=useContext(Store)
  const {userInfo,token}=state
  
  if(localStorage.getItem('loginData')==='true') {
    Swal.fire({
      icon: "info",
      title: "Ya te encuentras logueado !",
      showConfirmButton: false,
      timer: 5000,
    })
    
  } else {

     
 //RESPUESTA OK GITHUB
  const onSuccess = (githubData)  => {

    let name='';

    const userData={
               user:{ 
                 name:githubData.data.name,
                 email:'slronzonin@gmail.com'
               }
    }
   
    ctxDispatch({type:'USER_SIGNIN',payload:githubData.data})
    localStorage.setItem('userInfo',JSON.stringify(userData))   
    localStorage.setItem('git',JSON.stringify(githubData))
    localStorage.setItem('shippingAddress',''); 
    localStorage.setItem('paymentMethod','');
    localStorage.setItem('loginData',true)


    const getUserData = async () => {
      //BUSCAR EN BD DATOS DEL ID Y ROLE DEL EMAIL LOGUEADO 
      //Busco id   
        const response = await axiosClient.get(`/users/redes?userEmail=${'slronzoni@gmail.com'}'.toUpperCase()}`,
          { withCredentials: true }
        );

        if(response.status===200){  
          userData.user.role=response.data.role
          userData.user._id=response.data._id  
         }
         localStorage.setItem('userInfo',JSON.stringify(userData)) 
     }
      getUserData();

      cookies.set('token',githubData)         

     //MENSAJE DE BIENVENIDA
      Swal.fire({
          icon: "success",
          title: `Bienvenid@ ${name} !`,
          showConfirmButton:false,
          timer:5000
      })  
      setTimeout( function() { window.location.href = "/"; },3000 );
  };   

      //RESPUESTA MAL GITHUB
      const onFailure =(response) => {
        console.error("Error Github ! ", response);
      Swal.fire({
        icon: "error",
        title: "Error !",
        text: response,
        showConfirmButton:false,
        timer:5000
      })
    };
 
    return(
      <div>
        <GithubLogin className="m-3 mr-md-2 btn-redes centrar "
            clientId="      "           
            buttonText=" Iniciar sesion con Github"
            //autoLoad={false}
            onSuccess={onSuccess}
            onFailure={onFailure}
            icon='AiFillGithub'
            cssClass='btn-redes'
        />
      </div>
    )
}
}
export default RespuestaGit;