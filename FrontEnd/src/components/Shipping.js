import React,{useState,useContext,useEffect} from 'react'
import "./styles/styles.css";
import { Store } from '../Store';
import {Link} from 'react-router-dom';
import { Button } from 'react-bootstrap';
import axiosClient from '../configuration/axiosClient';


export default function Shipping() {
  
const {state,dispatch:ctxDispatch}=useContext(Store);

const {userInfo,cart:{shippingAddress}}=state 

  useEffect(() =>{
    const getUser= async () => {
      await axiosClient.get(`/users/${userInfo.user._id}`,{withCredentials:true})
      .then(respuesta =>{
        setStreet(respuesta.data.street);
        setNumber(respuesta.data.number);
        setFloor(respuesta.data.floor);
        setUnit(respuesta.data.unit);
        setCity(respuesta.data.city);
        setSstate(respuesta.data.sstate);
        setZipCode(respuesta.data.zipCode);
        setCountry(respuesta.data.country);
       
      })
      .catch((error=>{
           console.log(error)
      }));
    };
    getUser();
  },[userInfo.user._id]);

  

const [name,setName]=useState(shippingAddress.name || userInfo.user.name ||'');
const [lastName,setLastName]=useState(shippingAddress.lastName|| userInfo.user.lastName || '');
const [street,setStreet]=useState(shippingAddress.street|| userInfo.user.street ||'');
const [number,setNumber]=useState(shippingAddress.number|| userInfo.user.number ||'');
const [floor,setFloor]=useState(shippingAddress.floor|| userInfo.user.floor ||'');
const [unit,setUnit]=useState(shippingAddress.unit|| userInfo.user.unit ||'');
const [city,setCity]=useState(shippingAddress.city|| userInfo.user.city ||'');
const [zipCode,setZipCode]=useState(shippingAddress.zipCode|| userInfo.user.zipCode ||'');
const [sstate,setSstate]=useState(shippingAddress.sstate||userInfo.user.sstate ||'');
const [country,setCountry]=useState(shippingAddress.country||userInfo.user.country ||'');


const submit=(e)=> {
  //e.preventDefault();
  ctxDispatch({
    type:'SAVE_SHIPPING_ADDRESS',
    payload:{
      name,
      lastName,
      street,
      number,
      floor,
      unit,
      city,
      zipCode,
      sstate,
      country
    }
  })
}

localStorage.setItem('shippingAddress',JSON.stringify({
  name,
  lastName,
  street,
  number,
  floor,
  unit,
  city,
  zipCode,
  sstate,
  country 
}))


return (
  <div className="container-sm col-6 col-md-4 bg-light" >   
  <br></br>
    <h3>Domicilio de entrega</h3>
    
    <div className="form-control">
        <div className="form-group" >    
          <label className="formLabel">Nombre </label>  
          <input type="text" className="form-control" name="name" id="name" onChange={(e)=> setName(e.target.value) } defaultValue ={userInfo.user.name} required autoFocus  />
       </div>
       <div className="form-group" >    
          <label className="formLabel">Apellido </label>
          <input type="text" className="form-control" name="lastName" id="lastName" onChange={(e)=> setLastName(e.target.value)} defaultValue ={userInfo.user.lastName}required   />
       </div>
       <br></br>
        <div className="form-group" >  
        <div className=' gap-3 d-md-flex  justify-content-md-center'>
          <label className="formLabel">Autocompletar con su dirección registrada   👉
          <Link  to={'/shipping'}  >
            <Button type="submit" variant="primary"onClick={()=>submit()} className="m-1 btn btn-primary" >Click </Button>
          </Link>
          </label>
        </div> 
          <label className="formLabel">Calle</label>
          <input type="text" className="form-control" name="street" id="street"  onChange={(e)=> setStreet(e.target.value)} defaultValue ={shippingAddress.street} required  />
        </div>  
        <div className="container"> 
            <div className="row">
              <div className="col-xs-12 col-md-12">
                <div className="form-group two-fields">
                <div className="form-group">
                    <label ></label>
                      <div className="input-group">
                        <input type="text" className="form-control" name="number" id="number"  onChange={(e)=> setNumber(e.target.value)} defaultValue ={shippingAddress.number}placeholder="Número"  />
                        <input type="text" className="form-control" name="floor" id="floor"  onChange={(e)=> setFloor(e.target.value)}defaultValue ={shippingAddress.floor} placeholder="Piso" />
                        <input type="text" className="form-control" name="unit" id="unit"  onChange={(e)=> setUnit(e.target.value)}defaultValue ={shippingAddress.unit} placeholder="Depto"/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div> 
          <div className="form-group">
            <label >Localidad</label>
            <input type="text" className="form-control" name="city" id="city"  onChange={(e)=> setCity(e.target.value)}defaultValue ={shippingAddress.city}  required />
          </div>
          <div className="form-group">
            <label >Código Postal</label>         
            <input type="text" className="form-control" name="zipCode" id="zipCode"  onChange={(e)=> setZipCode(e.target.value)} defaultValue ={shippingAddress.zipCode} required />
          </div>              
          <div className="form-group">
            <label >Provincia</label>
            <input type="text" className="form-control" name="sstate" id="sstate"  onChange={(e)=> setSstate(e.target.value)} defaultValue ={shippingAddress.sstate} required />
          </div>          
          <div className="form-group">
            <label >Pais</label>    
            <input type="text" className="form-control" name="country" id="country"  onChange={(e)=> setCountry(e.target.value)} defaultValue ={shippingAddress.country} required />
          </div>
           
    </div>
    <br></br>
                    
    <div  className=''>
      <div className="d-grid gap-4 d-md-flex justify-content-md-center">
        <Link
          to={"/cart"}
          className="m-2 btn btn-warning"
          role="button"
          aria-pressed="true"
        >
        {" "}
        Atras{" "}
        </Link>
        <Link  to={'/paymentMethod'}  >
          <Button type="submit" variant="primary"onClick={()=>submit()} className="m-2 btn btn-primary" >Continúe </Button>
        </Link>
      
        
      </div>
   
    </div>      
  
  </div> 

 )
}




   