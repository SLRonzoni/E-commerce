import React from 'react';
import './styles/lineStyles.css';

const LineMyCart = ({name,img,quantity,unitPrice}) => {

return (
  <tr>
    
    <td className="renglonNro">{name}</td>
    <td className="imagenChar centrar " ><img src={img}  alt="product" ></img> </td>
    <td className="renglonNro">{quantity}</td>
    <td className="renglonNro">{unitPrice}</td>
 </tr>
 );

 };
export default LineMyCart;