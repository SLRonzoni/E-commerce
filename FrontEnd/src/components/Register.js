import React,{useState} from "react";
import "./styles/styles.css";
import axiosClient from "../configuration/axiosClient";
import Swal from "sweetalert2";
import {Link} from 'react-router-dom';

const Register=()=> {
  const [form, setForm] = useState({
    name:"",
    lastName:"",
    street:"",
    number:"",
    floor:"",
    unit:"",
    city:"",
    zipCode:"",
    sstate:"",
    country:"",
    phone: "",     
    email:"",
    password:"",
    confirmpassword:""
    });

   

   //capturar datos que el usuario ingresa
    const handleChange = async e => {
      e.preventDefault()
      await setForm({
        ...form,
        [e.target.name]: e.target.value
       
      });
    };

    //peticion a API y salvado de los datos
     const send = async () => {

      // if(form.password !== form.confirmpassword){
      //       Swal.fire({
      //         icon: "warning",
      //         title: "Las contraseñas no coinciden !",
      //         time:3000,
      //         showConfirmButton:true
      //       })
      //       return;
      // };


      await axiosClient.post('/authUser/signup',{"name":form.name,"lastName":form.lastName,
                                                "street":form.street,"number":form.number,
                                                "floor":form.floor, "unit":form.unit,
                                                "city":form.city, "zipCode":form.zipCode,
                                                "sstate":form.sstate, "coutry":form.country,
                                                "phone":form.phone,
                                                "email":form.email,"password":form.password},{withCredentials:true})
      
      .then(respuesta=>{
          if(respuesta.status===201  ){            
              Swal.fire({
                  icon: "success",
                  title: `Te has registrado correctamente !`,
                  showConfirmButton:false
                  })
                 
                 window.location.href="/authUser/login"
          } else {             
               Swal.fire({
                  icon: "error",
                  title: "Error !",
                  text: respuesta.message,
                  showConfirmButton:true
                })
               
             };          
      })     
      .catch(error=>{
         console.log(error)
         Swal.fire({
          icon: "error",
          title: "Error",
          text: error
        });
      });
    }
    
   
       return (
          <div className="container-sm col-6 col-md-4 bg-light" > 
            
            <h3>Formulario de Registro</h3>
              <div className="form-control">
                <div className="form-group">    
                    <label className="formLabel">Nombre</label>
                    <input type="text" className="form-control" name="name" id="name"  onChange={handleChange} required  autoFocus/>
                </div> 

                <div className="form-group" >    
                    <label className="formLabel">Apellido</label>
                    <input type="text" className="form-control" name="lastName" id="lastName"  onChange={handleChange}  required />
                </div> 
              </div>
              <br></br>
                <div className="form-control">

                  <div className="form-group" >    
                    <label className="formLabel">Calle</label>
                    <input type="text" className="form-control" name="street" id="street"  onChange={handleChange}   />
                   
                    <div className="container">
                      <div className="row">
                        <div className="col-xs-12 col-md-12">
                         <div className="form-group two-fields">
                          <div className="form-group">
                              <label >Número, Piso y Departamento</label>
                                <div className="input-group">
                                  <input type="text" className="form-control" name="number" id="number"  onChange={handleChange} placeholder="Número"  />
                                  <input type="text" className="form-control" name="floor" id="floor"  onChange={handleChange} placeholder="Piso" />
                                  <input type="text" className="form-control" name="unit" id="unit"  onChange={handleChange} placeholder="Depto"/>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                     </div>
                     
                     <div className="container">
                      <div className="row">
                        <div className="col-xs-12 col-md-12">
                         <div className="form-group two-fields">
                          <div className="form-group">
                              <label >Localidad y Código Postal</label>
                              <div className="input-group">
                              <input type="text" className="form-control" name="city" id="city"  onChange={handleChange} placeholder="Localidad" />
                              <input type="text" className="form-control" name="zipCode" id="zipCode"  onChange={handleChange} placeholder="Código Postal"  />
                              </div>
                              </div>
                            </div>
                          </div>
                        </div>
                     </div>
                     
                     <div className="container">
                      <div className="row">
                        <div className="col-xs-12 col-md-12">
                         <div className="form-group two-fields">
                          <div className="form-group">
                              <label >Provincia y Pais</label>
                              <div className="input-group">
                              <input type="text" className="form-control" name="sstate" id="sstate"  onChange={handleChange} defaultValue="Buenos Aires" />
                              <input type="text" className="form-control" name="country" id="country"  onChange={handleChange} defaultValue="Argentina" />
                              </div>
                              </div>
                            </div>
                          </div>
                        </div>
                     </div>
                     
                    <label className="formLabel">Teléfono</label>
                    <input type="text" className="form-control" name="phone" id="phone"  onChange={handleChange} />
                </div> 
              </div>
              <br></br>
              <div className="form-control">
                <div className="form-group" >    
                    <label className="formLabel">Email</label>
                    <input type="email" className="form-control" name="email" id="email"  onChange={handleChange}  required  />
                </div> 

                <div className="form-group" >    
                    <label className="formLabel">Contraseña</label>
                    <input type="password" className="form-control" name="password" id="password"  onChange={handleChange}  required />
                </div> 

                <div className="form-group" >    
                    <label className="formLabel">Confirmar contraseña</label>
                    <input type="password" className="form-control" name="confirmpassword" id="confirmpassword"    required />
                </div> 
              </div>
              <div >
              <div className="d-grid gap-4 d-md-flex justify-content-md-center">
                <button
                  className="m-2 btn btn-primary"
                  onClick={()=>send()} 
                >
                  Enviar
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
            </div>      
            </div>
   
        );
  }

export default Register;
