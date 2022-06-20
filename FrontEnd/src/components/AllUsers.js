import React, {Fragment,useState, useEffect } from "react"
import axiosClient from "../configuration/axiosClient";
import "./styles/styles.css";
import "./styles/All&EditStyles.css";
import LineUsers from "./LineUsers";
import Swal from 'sweetalert2';


const AllUsers = (props) => {

  const [users, setUser] = useState([]);
  const getUsers = async () => {
      const respuesta = await axiosClient.get('/users',{withCredentials:true});
      setUser(respuesta.data);
    };


  //Eliminar user
  const confirmRemove = (_id) => {
    Swal.fire({
      title: 'Está seguro de eliminar ? ',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar !'
    })
      .then((result) => {
        if (result.value) {
          remove(_id);
        }
      });
  };

  const remove = async (_id) => {
    //elimino cliente
    await axiosClient
    .delete(`/users/del/${_id}`,{withCredentials:true})
    .then ((respuesta) => {
        Swal.fire({
          icon: 'success',
          title: 'Cliente Eliminado!',
        });
        getUsers();
    })
    .catch(function (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error : No se puede eliminar',
        text: error
      }); 
    });

    //elimino todas las ordenes historicas
    await axiosClient
    .delete(`/ordersClient/myOrders/del/${_id}`,{withCredentials:true})
    .then ((respuesta) => {
       console.log('historico de ordenes,  eliminado')
       getUsers();
    })
    .catch(function (error) {
      console.log('error ! no se ha eliminado el historico de ordenes') 
    });

    //elimino carrito
    await axiosClient
    .delete(`/cart/delCart/${_id}`,{withCredentials:true})
    .then ((respuesta) => {
        console.log('carrito eliminado')
        getUsers();
    })
    .catch(function (error) {
      console.log('error ! no se ha eliminado el carrito del cliente borrado')
    });
  };

  useEffect(() => {
     getUsers()  
  },[]);  


 //Obtener datos FILTRADOS x APELLIDO de Api 
 let filterBy;
 const getFilterUsersName = async () => {
   await axiosClient
     .get(`/users?userLastName=`+filterBy,{withCredentials:true})
     .then((respuesta) => {
       setUser(respuesta.data)
     })
     .catch(function (error) {
       console.log(error)
     });
 };
 //seleccion de filtro  
   const changesName=(e)=>{
       filterBy=e.target.value;
       if(filterBy === 'todos'){
          getUsers()   
       } else {
         getFilterUsersName()   
   };
 } 

 
//Obtener datos FILTRADOS x LOCALIDAD de Api 
const getFilterUsersCity = async () => {
  await axiosClient
    .get(`/users?userCity=`+filterBy,{withCredentials:true})
    .then((respuesta) => {
      setUser(respuesta.data)
    })
    .catch(function (error) {
      console.log(error)
    });
};
//seleccion de filtro  
  const changesCity=(e)=>{
      filterBy=e.target.value;
      if(filterBy === 'todas'){
         getUsers()   
      } else {
        getFilterUsersCity()   
  };
} 

//Obtener datos FILTRADOS x PROVINCIA de Api 
const getFilterUsersSstate = async () => {
  await axiosClient
    .get(`/users?userSstate=`+filterBy,{withCredentials:true})
    .then((respuesta) => {
      setUser(respuesta.data)
    })
    .catch(function (error) {
      console.log(error)
    });
};
//seleccion de filtro  
  const changesSstate=(e)=>{
      filterBy=e.target.value;
      if(filterBy === 'todas'){
         getUsers()   
      } else {
        getFilterUsersSstate()   
  };
} 

const showUsers = (props) => {
  return (
    <tbody>
      {users.map((oneUser) => (
        <LineUsers key={oneUser._id}
          _id={oneUser._id}
          name={oneUser.name}
          lastName={oneUser.lastName}
          street={oneUser.street}
          number={oneUser.number}
          floor={oneUser.floor}
          unit={oneUser.unit}
          city={oneUser.city}
          zipCode={oneUser.zipCode}
          sstate={oneUser.sstate}
          country={oneUser.country}
          phone={oneUser.phone}
          email={oneUser.email}
          create={oneUser.createdAt}
          update={oneUser.updatedAt}
          remove={confirmRemove}
          />
      ))}
    </tbody>
  );
};


  return (
    <Fragment >
      <div >
        <h1 className="tituloTabla">Clientes</h1>
        <p>{}</p>
      </div>
      <br></br>
      <div className="containerBtnDesplegable displayFlex " >
          <div className="btnBuscaxNombre">
              <p className="pBtnDesplegable">Buscar por Apellido</p>
                <select
                  type="text"
                  name="lastName"
                  onChange={changesName}
                  className="m-3 mr-md-1  selectBtnDesplegable form-select "
                  >
                  {users.map(oneChar => (
                    <option  key={oneChar.id} value={oneChar.lastName}>
                      {oneChar.lastName}
                    </option>
                  ))}
                  <option value={"todos"}>Mostrar todos los clientes</option>
                </select>
            </div>
            <div className="colorBlanco">
               ......
            </div>
            <div className="divBtnDesplegable">
              <p className="pBtnDesplegable" > Buscar por Localidad</p>
                <select
                  type="text"
                  name="city"
                  onChange={changesCity}
                  className="m-3 mr-md-1  selectBtnDesplegable form-select "
                  > 
                  {users.map(oneChar => (
                    <option  key={oneChar._id} value={oneChar.city}>
                      {oneChar.city}
                    </option>
                  ))}     
                  <option value={"todas"}>Mostrar todos los clientes</option>
                </select>
                </div>
                <div className="colorBlanco">
                   ......
                </div>

                <div className="btnBuscaxNombre">
                  <p className="pBtnDesplegable" > Buscar por Provincia</p>
                    <select
                      type="text"
                      name="state"
                      onChange={changesSstate}
                      className="m-3 mr-md-1  selectBtnDesplegable form-select"
                      > 
                      {users.map(oneChar => (
                        <option  key={oneChar._id} value={oneChar.sstate}>
                          {oneChar.sstate}
                        </option>
                      ))}     
                      <option value={"todas"}>Mostrar todos los clientes</option>
                    </select>
                </div>           
              </div> 

             <table className="table table-striped table-responsive table-bordered ">
              <thead>
                <tr>
                  <th className="tituloItem "> Cliente </th>
                  <th className="tituloItem "> Apellido </th>
                  <th className="tituloItem "> Nombre </th>
                  <th className="tituloItem "> Calle </th>
                  <th className="tituloItem "> Número </th>
                  <th className="tituloItem "> Piso </th>
                  <th className="tituloItem "> Depto </th>
                  <th className="tituloItem "> Localidad </th>
                  <th className="tituloItem "> C.Postal </th>
                  <th className="tituloItem "> Provincia </th>
                  <th className="tituloItem "> Pais </th>
                  <th className="tituloItem "> Teléfono </th>
                  <th className="tituloItem "> Email </th>
                  <th className="tituloItem "> Creado</th>
                  <th className="tituloItem "> Actualizado </th>
                </tr>
              </thead>
              {showUsers()}
            </table>
    </Fragment>   
  );

};

export default AllUsers;
