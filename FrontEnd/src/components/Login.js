import React,{useState,useContext} from "react";
import "./styles/styles.css";
import axiosClient from "../configuration/axiosClient";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import LoginGoogle from './LoginGoogle';// boton login con google
import LoginFacebook from './LoginFacebook';// boton login con facebook
// import LoginGithub from './LoginGithub';// boton login con github
import { Store } from "../Store";


const Login =()=>{   
 
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const {state,dispatch:ctxDispatch}=useContext(Store)
  const {userInfo}=state

  if(localStorage.getItem('loginData')==='true') {
    Swal.fire({
      icon: "info",
      title: "Ya te encuentras logueado !",
      showConfirmButton: false
    })
    setTimeout( function() { window.location.href = `/UserAllProducts`; },1000 ); 
  } else {
    
    const loginOK = (usuario)=>{
      Swal.fire({
          icon: "success",
          title: `Bienvenid@ ${usuario} !`,
          showConfirmButton:false,
          timer:5000
      })    
    }

    const loginError = (response)=>{
      Swal.fire({
         icon: "error",
         title: "Error !",
         text: response,
         showConfirmButton:false,
         timer:5000
       })
   }
    
    //peticion a API e inicio sesion
     const beginSession = async (e) => { 
      e.preventDefault();   

      await axiosClient.post('/authUser/login',{"email":email,"password":password},{withCredentials:true})
      .then(response=>{
        console.log(response)
        
        if(response.status===204 ||response.status===201 ){
          let name=response.data.user.name;

          ctxDispatch({type:'USER_SIGNIN',payload:response.data.user})
           localStorage.setItem('userInfo',JSON.stringify(response.data))
           localStorage.setItem('shippingAddress',''); 
           localStorage.setItem('paymentMethod','');   
           localStorage.setItem('loginData',true)

          //MENSAJE DE BIENVENIDA
          loginOK(name);
          window.location.href='/'  
        
        } else {
          loginError(response);
          console.log(response)            
        }
      }) 
      
      .catch(error=>{
        console.log(error)
        Swal.fire({
         icon: 'error',
         title: 'Error',
         text: error
       });
      });
     }  

     
     
    return (
      <div className="container-sm col-6 col-md-4 bg-light" >  
        <div className="displayFlex" >  
        
          <div className="center">
           <LoginGoogle> </LoginGoogle>
          </div>
          <div className="center">
            <LoginFacebook ></LoginFacebook>
          </div>
          <div className="center" >
            {/* <LoginGithub></LoginGithub> */}
          </div>

        <br></br>
        <br></br>
        </div>
        <br></br>
     
        <h3>Inicio de sesión</h3>
        <div className="form-group">
         <label className="formLabel">Email </label>
         <input type="email" 
                className="form-control" 
                name="email"  
                placeholder="correo@correo.com.ar" 
                required
                uppercase="true"
                onChange={(e)=>setEmail(e.target.value)}
                />
       </div>
       <br></br>
      
      <div className="form-group" >
         <label className="formLabel">Password </label>
         <input type="password" 
                className="form-control"  
                name="password"  
                placeholder="Password" 
                required
                onChange={(e)=>setPassword(e.target.value)}
                />
      </div>
     
      
                  <div className="d-grid gap-4 d-md-flex justify-content-md-center">
                    <button
                      className="m-2 btn btn-primary"
                      onClick={beginSession}
                    >
                      Login
                    </button>
                    <Link
                      to={"/"}
                      className="m-2 btn btn-primary"
                      role="button"
                      aria-pressed="true"
                    >
                      {" "}
                      Volver{" "}
                    </Link>
                  </div>
                  <div>
                    <span>No tienes cuenta ? 
                      <Link to={"/authUser/signup"}
                      className="m-2 ">
                      {" "}
                      registrarse{" "}
                    </Link>
                    </span>
                  </div>
                </div>
);
}

}
export default Login;