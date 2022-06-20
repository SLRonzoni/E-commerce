import React, {Fragment,useState, useEffect,useContext } from "react"
import axiosClient from "../configuration/axiosClient";
import "./styles/styles.css";
import "./styles/All&EditStyles.css";
import { Store } from "../Store";
import LineMyOrders from "./LineMyOrders";
// import LineMyCart from "./LineMyCart";
// import Swal from 'sweetalert2';


const MyOrders = (props) => {
  
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const [orders, setOrders] = useState([]);
  const [,setCart]=useState([]);

  const getOrders = async () => {
      const respuesta = await axiosClient.get(`/ordersClient/myOrders/${userInfo.user._id}`,{credentials:"include"});
      setOrders(respuesta.data);
      setCart(respuesta.data[0].orderItems)
  };

  
  useEffect(() => {
     getOrders()  
  },[]);  

 
 
const showOrders = (props) => {
  return (    
    <tbody>
      {orders.map((oneOrder) => (
        <LineMyOrders
          key={oneOrder._id}
          _id={oneOrder._id}
          createdAt={(oneOrder.createdAt).slice(0,10)}
          paymentMethod={oneOrder.paymentMethod}
          itemsPrice={oneOrder.itemsPrice}
          shippingPrice={oneOrder.shippingPrice}
          taxPrice={oneOrder.taxPrice}
          totalPrice={oneOrder.totalPrice}
          // paidAt={(oneOrder.paidAt)}
          // deliveredAt={(oneOrder.deliveredAt)}
          /> 
      ))}      
    </tbody>
  );
};




  return (
    <Fragment >
      <div  >
        <h1 className="tituloTabla">Mis Pedidos</h1>
        <p>{}</p>
      </div>
      <br></br>
                 
      <div className="  me-md-6 small tablaPedidos">
            <table className=" table  table-responsive table-bordered  table-striped  ">
              <thead>
                <tr>
                  <th className="tituloItem "> Pedido Nro. </th>
                  <th className="tituloItem "> Realizado el</th>
                  <th className="tituloItem "> Forma Pago </th>
                  <th className="tituloItem "> $ Productos </th>
                  <th className="tituloItem "> $ envío </th>
                  <th className="tituloItem "> $ Impuestos </th>
                  <th className="tituloItem "> $ Total </th>
                  {/* <th className="tituloItem "> Pagado </th>
                  <th className="tituloItem "> Enviado </th>    */}
                  <th className="tituloItem "> Productos </th>  
                </tr>
              </thead>
             
              {showOrders()}
                        
            </table>  
             
        </div>  
      
    </Fragment> 
  )  
};

export default MyOrders;
