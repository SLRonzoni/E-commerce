import React from "react";
//ESTILOS
import "../App.css";
import "./styles/All&EditStyles.css";
//BOOSTRAP
import "bootstrap/dist/css/bootstrap.min.css";
//ICONOS
import "antd/dist/antd.css";
import { DeleteOutlined } from "@ant-design/icons";

const UserAllProductsItem = ({ data, quitar_carro }) => {
  let { _id, name, unitPrice, cantComprada, subtotal } = data;

  subtotal = cantComprada * unitPrice;
  return (
    <div className=' '>
      <table>
        <tbody>
          <tr>
            <td className='marginCarrito'>{name}</td>
            <td className='colorBlanco'> --- </td>
            <td className='marginCarrito'>{cantComprada}</td>
            <td className='colorBlanco'>----</td>
            <td className='marginCarrito'>$ {unitPrice}</td>
            <td className='colorBlanco'> --</td>
            <td className='marginCarrito'>$ {subtotal}</td>
            <td>
              <button
                className='botonResiduos'
                onClick={() => quitar_carro(_id)}
              >
                <DeleteOutlined />{" "}
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default UserAllProductsItem;
