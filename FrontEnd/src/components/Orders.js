import React, {Fragment,useState, useEffect } from "react"
import axiosClient from "../configuration/axiosClient";
import "./styles/styles.css";
import "./styles/All&EditStyles.css";
import LineOrders from "./LineOrders";

const Orders = (props) => {

  const [orders, setOrders] = useState([]);
  const getOrders = async () => {
      const respuesta = await axiosClient.get(`/ordersClient`,{withCredentials:true});
      setOrders(respuesta.data);
      console.log(respuesta)
    };

  useEffect(() => {
     getOrders()  
  },[]);  


 //Obtener datos FILTRADOS x CLIENTE
 let filterBy;
 const getFilterUser = async () => {
   await axiosClient
     .get(`/ordersClient?user=`+filterBy,{withCredentials:true})
     .then((respuesta) => {
       setOrders(respuesta.data)
     })
     .catch(function (error) {
       console.log(error)
     });
 };
 //seleccion de filtro  
   const changesName=(e)=>{
       filterBy=e.target.value;
       if(filterBy === 'todos'){
          getOrders()   
       } else {
         getFilterUser()   
   };
 } 

  

const showOrders = (props) => {
  return (
    <tbody>
      {orders.map((oneUser) => (
        <LineOrders 
          key={oneUser._id}
          user={oneUser.user}
          _id={oneUser._id}
          createdAt={(oneUser.createdAt).slice(0,10)}
          paymentMethod={oneUser.paymentMethod}
          itemsPrice={oneUser.itemsPrice}
          shippingPrice={oneUser.shippingPrice}
          taxPrice={oneUser.taxPrice}
          totalPrice={oneUser.totalPrice}
          // paidAt={oneUser.paidAt}
          // deliveredAt={oneUser.deliveredAt}
          // orderItems={oneUser.orderItems}
          />
      ))}
    </tbody>
  );
};


  return (
    <Fragment >
      <div >
        <h1 className="tituloTabla">Pedidos de clientes</h1>
      </div>
      <br></br>
      <div className="containerBtnDesplegable displayFlex tablaPedidos" >
          <div className="btnBuscaxNombre">
              <p className="pBtnDesplegable">Buscar por Cliente</p>
                <select
                  type="text"
                  name="user"
                  onChange={changesName}
                  className="m-3 mr-md-1  selectBtnDesplegable form-select "
                  >
                  {orders.map(oneChar => (
                    <option  key={oneChar._id} value={oneChar.user}>{oneChar.user}
                    </option>
                  ))}
                  <option value={"todos"}>Mostrar todos los clientes</option>
                </select>
            </div>
      </div>
           
      <div className=" me-md-6 small tablaPedidos">
          <table className="table  table-responsive table-bordered  table-striped  ">
              <thead>
                <tr>
                  <th className="tituloItem "> Cliente </th>
                  <th className="tituloItem "> Pedido Nro. </th>
                  <th className="tituloItem "> Realizado el </th>
                  <th className="tituloItem "> Forma Pago </th>
                  <th className="tituloItem "> $ Productos </th>
                  <th className="tituloItem "> $ envío </th>
                  <th className="tituloItem "> $ Impuestos </th>
                  <th className="tituloItem "> $ Total </th>
                  {/* <th className="tituloItem "> Pagado </th>
                  <th className="tituloItem "> Enviado </th>  */}
                  {/* <th className="tituloItem "> Productos </th>  */}
                  
                </tr>
              </thead>
              {showOrders()}
            </table>  
      </div>  

       
    </Fragment> 
  )  
};

export default Orders;
