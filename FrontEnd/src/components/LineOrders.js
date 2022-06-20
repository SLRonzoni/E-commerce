import React from 'react';
import { Link } from 'react-router-dom';
import './styles/lineStyles.css';

const LineOrders = ({_id, user, createdAt,paymentMethod, itemsPrice, shippingPrice, taxPrice, totalPrice}) => {

  return (
    <tr>
        <td className="renglonNro" >{user}</td>
        <td className="renglonNro">{_id}</td>
        <td className="renglonNro">{createdAt}</td>
        <td className="renglonNro "> {paymentMethod} </td>
        <td className="renglonNro "> {itemsPrice} </td>
        <td className="renglonNro "> {shippingPrice} </td>
        <td className="renglonNro "> {taxPrice} </td>
        <td className="renglonNro "> {totalPrice}l </td>
        {/* <td className="renglonNro "> {paidAt} </td>
        <td className="renglonNro "> {deliveredAt} </td> */}
       
        
        {/* <td className="renglonNro"><Link to={`/ordersClient/myOrders/${user}/products/${_id}`} className="btn btn-primary myOrderButton"
                    role="button" > Ver Productos </Link>
        </td>     */}
    </tr>

    
  );
};
export default LineOrders;