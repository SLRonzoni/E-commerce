import React from 'react';
import { Link } from 'react-router-dom';
import './styles/lineStyles.css';

const LineProduct = ({_id, name, img, description, categoryId,  size, unitPrice,stock, create,update,remove}) =>{
 
    return (
        <tr   >
            <td className="renglonNro">{_id}</td>
            <td className="renglon" >{name}</td>
            <td className="imagenChar centrar" ><img src={img}  alt="productos" ></img> </td>
            <td className="renglon productDescrip" >{description}</td>
            <td className="renglon centrar" >{categoryId}</td>
            <td className="renglon centrar" >{size}</td>
            <td className="renglon centrar" >{unitPrice}</td>
            <td className="renglon centrar" >{stock}</td>
            <td className="renglon centrar" >{create}</td>
            <td className="renglon centrar" >{update}</td>
            
            <td className='centrar '>   
                <Link to={`/products/put/${_id}`} className="m-1 mr-md-2 btn btn-primary" role="button"> Modificar </Link>            
                <button type="button" className="m-1 mr-md-2 btn btn-danger"onClick={()=>{remove(_id);}} >.Eliminar.  </button>          
            </td>      
        </tr>
    );
};
export default LineProduct;