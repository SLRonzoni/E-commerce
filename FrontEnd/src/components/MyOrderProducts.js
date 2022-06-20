import React, {Fragment,useState, useEffect,useContext } from "react"
import axiosClient from "../configuration/axiosClient";
import "./styles/styles.css";
import "./styles/All&EditStyles.css";
import { Store } from "../Store";
import LineMyCart from "./LineMyCart";
import { Link } from "react-router-dom";


const MyOrderProduct = (props) => {
  const  {_id}=props.match.params;
  
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo, } = state;

  const [carrito, setCarrito] = useState([]);
  const getCarrito = async () => {     
    const respuesta = await axiosClient.get(`/ordersClient/myOrders/products/${_id}`,{credentials:"include"});
    setCarrito(respuesta.data);
  }

  const [products, setProducts] = useState([]);
  const getProducts = async () => {     
    const respuesta = await axiosClient.get('/products',{credentials:"include"});
    setProducts(respuesta.data);
  }

  useEffect(() => {
     getCarrito()
     getProducts()
  },[]);  

 let carritoComplete=[]
  for (let i=0;i<carrito.length;i++){
    for (let j=0;j<products.length;j++){
      if(carrito[i]._id===products[j]._id){
        carritoComplete=([...carritoComplete,{_id:carrito[i]._id,
                    name:products[j].name,
                    quantity:carrito[i].quantity,
                    img:products[j].img,
                    unitPrice:products[j].unitPrice}])
      }
  }
}

const showProducts = () => {
 return (    
    <tbody>
     {carritoComplete.map((oneOrder) => (
        <LineMyCart
          key={oneOrder._id}
          _id={oneOrder._id}
          name={oneOrder.name}
          img={oneOrder.img}
          quantity={oneOrder.quantity}
          unitPrice={oneOrder.unitPrice}
          />
      ))}         
    </tbody>
  );
};

  return (
    <Fragment >
      <div  >
        <h3 className="tituloTabla centrar">Mis productos del pedido :<br></br> </h3>
        <p className=" centrar">{_id}</p>
      </div>
      <br></br>
                 
        <div className="me-md-6 large tablaPedidosProductos centrar">
        <table className=" table-responsive table-bordered  table-striped  table ">
                        <thead className="">
                          <tr>
                            <th className="tituloItem "> Producto </th>
                            <th className="tituloItem "> Imagen </th>
                            <th className="tituloItem "> Cantidad </th>
                            <th className="tituloItem "> Precio Unitario </th>
                           </tr>
                        </thead>
                         {showProducts()}
                      </table>
              <br></br>           
        </div>  
        <div className="centrar">
          {userInfo.user.role===10 ? (
            <Link
              to={"/Orders"}
              className="m-3 mr-md-2 btn btn-primary"
              role="button"
              aria-pressed="true"
            >
              {" "}
              Volver{" "}
            </Link>
          ) : 
          ( <Link
              to={"/MyOrders"}
              className="m-3 mr-md-2 btn btn-primary"
              role="button"
              aria-pressed="true"
            >
              {" "}
              Volver{" "}
            </Link>
          )}  
        </div>
    </Fragment> 
  )  
};

export default MyOrderProduct;
