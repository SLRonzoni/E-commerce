import React from 'react';
import { Link } from 'react-router-dom';
import './styles/lineStyles.css';

const LineMyOrders = ({_id,createdAt,paymentMethod,itemsPrice,shippingPrice,taxPrice,totalPrice}) => {


return (
  <tr>
    <td className="renglonNro">{_id}</td>
    <td className="renglonNro">{createdAt}</td>
    <td className="renglonNro">{paymentMethod}</td>
    <td className="renglonNro">{itemsPrice}</td>
    <td className="renglonNro">{shippingPrice}</td>
    <td className="renglonNro">{taxPrice}</td>
    <td className="renglonNro">{totalPrice}</td>
    {/* <td className="renglonNro">{paidAt}</td>
    <td className="renglonNro">{deliveredAt}</td> */}
    <td className="renglonNro"><Link to={`/ordersClient/myOrders/products/${_id}`} className=" btn btn-primary myOrderButton"
                                role="button" > Detalle
                               </Link> 
    </td>
 </tr>
 );

 };
export default LineMyOrders;