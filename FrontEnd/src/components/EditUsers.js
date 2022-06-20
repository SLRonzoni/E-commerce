import React, {useState,useEffect,Fragment} from 'react';
import axiosClient from '../configuration/axiosClient';
import './styles/styles.css';
import "./styles/All&EditStyles.css";
import Swal from "sweetalert2";

const EditUsers = (props) =>{
      
  const  {_id}=props.match.params;

  const [user, setUser] = useState({
      _id:'',
      name:'',
      lastName:'',
      street:'',
      number:'',
      floor:'',
      unit:'',
      city:'',
      zipCode:'',
      sstate:'',
      country:'',
      phone:'',
      // email:'',
      password:'',
      myList:'',
      myFavProducts:'',
      createdAt:'',
      updatedAt:''
  });

  const [userShow, setUserShow] = useState({
      _id:'',
      name:'',
      lastName:'',
      street:'',
      number:'',
      floor:'',
      unit:'',
      city:'',
      zipCode:'',
      sstate:'',
      country:'',
      phone:'',
      // email:'',
      password:'',
      myList:'',
      myFavProducts:'',
      createdAt:'',
      updatedAt:''
  });

   
  const changes=(e)=>{
    setUser({
        ...user,
        [e.target.name]:e.target.value  
    });
  };

  const send = (e) =>{
    //e.preventDefault();
    editUser();
  };
 

  const editUser= async ()=>{
    await axiosClient.put(`/users/put/${_id}`,user,{withCredentials:true})
    .then (respuesta=>{
      if(respuesta.status===200){
      Swal.fire({
        icon: 'success', 
        title:"Modificación de perfil exitosa !",
        showConfirmButton:false
      }); 
      }       
    })
    .catch(function (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message
      });
    });
    setTimeout( function() { window.location.href = "/"; }, 1000 );
  }

  useEffect(() =>{
    const getUser= async () => {
      await axiosClient.get(`/users/${_id}`,{withCredentials:true})
      .then(respuesta =>{
        setUser(respuesta.data);
        setUserShow(respuesta.data);
      })
      .catch((error=>{
           console.log(error)
      }));
    };
    getUser();
  },[_id]);

  //let fechaActualiza=userShow.updatedAt.replace( "T"," , " )
  //let  fechaActualizado=fechaActualiza.replace("Z","  " )
  let fechaActualizado=userShow.updatedAt

  return (
    <Fragment>  
    <div className="container-sm col-6 col-md-4 bg-light " > 
            <h2>Mi Perfil</h2>
            <h6>( última actualización : {fechaActualizado} )</h6>
              <div className="form-control">
                <div className="form-group">    
                    <label className="formLabel">Nombre</label>
                    <input type="text" className="form-control" name="name" id="name"  onChange={changes} defaultValue={user.name}  autoFocus/>
                </div> 

                <div className="form-group" >    
                    <label className="formLabel">Apellido</label>
                    <input type="text" className="form-control" name="lastName" id="lastName"  onChange={changes}  defaultValue={user.lastName} />
                </div> 
              </div>
              <br></br>
                <div className="form-control">

                  <div className="form-group" >    
                    <label className="formLabel">Calle</label>
                    <input type="text" className="form-control" name="street" id="street"  onChange={changes} defaultValue={user.street} />
                  
                    <div className="container">
                      <div className="row">
                        <div className="col-xs-12 col-md-12">
                         <div className="form-group two-fields">
                          <div className="form-group">
                              <label >Número, Piso y Departamento</label>
                                <div className="input-group">
                                  <input type="text" className="form-control" name="number" id="number"  onChange={changes} defaultValue={user.number} />
                                  <input type="text" className="form-control" name="floor" id="floor"  onChange={changes} defaultValue={user.floor}/>
                                  <input type="text" className="form-control" name="unit" id="unit"  onChange={changes} defaultValue={user.unit} />
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
                              <input type="text" className="form-control" name="city" id="city"  onChange={changes} defaultValue={user.city} />
                              <input type="text" className="form-control" name="zipCode" id="zipCode"  onChange={changes} defaultValue={user.zipCode} />
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
                              <input type="text" className="form-control" name="sstate" id="sstate"  onChange={changes} defaultValue={user.sstate} />
                              <input type="text" className="form-control" name="country" id="country"  onChange={changes} defaultValue={user.country}/>
                              </div>
                              </div>
                            </div>
                          </div>
                        </div>
                     </div>
                    
                    <label className="formLabel">Teléfono</label>
                    <input type="text" className="form-control" name="phone" id="phone"  onChange={changes} defaultValue={user.phone}/>
                </div> 
              </div>
              <br></br>
              <div className="form-control">
                <div className="form-group" >    
                    <label className="formLabel">Email ( no se permite modificar )</label>
                    <input type="email" className="form-control" name="email" id="email"  defaultValue={user.email}/>
                </div> 

                <div className="form-group" >    
                    <label className="formLabel">Nueva contraseña</label>
                    <input type="password" className="form-control" name="password" id="password"  onChange={changes} />
                </div> 
              </div>
              <br></br>
                <div>
                <button className=" mr-md-2 btn btn-primary btn-derecha" onClick={()=>send()} >Guardar cambios</button>
            </div>
            </div>
   </Fragment>
        );
  
}
export default EditUsers;

