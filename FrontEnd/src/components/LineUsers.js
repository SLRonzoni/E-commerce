import React from 'react';
// import { Link } from 'react-router-dom';
import './styles/lineStyles.css';

const LineUsers = ({_id, name, lastName, email,street, number, floor, unit, city, zipCode, sstate, country, phone, create, update, remove }) => {

  return (
    <tr   >
        <td className="renglonNro">{_id}</td>
        <td className="renglon " >{lastName}</td>
        <td className="renglon " >{name}</td>
        <td className="renglon centrar" >{street}</td>
        <td className="renglon centrar" >{number}</td>
        <td className="renglon centrar" >{floor}</td>
        <td className="renglon centrar" >{unit}</td>
        <td className="renglon centrar" >{city}</td>
        <td className="renglon centrar" >{zipCode}</td>
        <td className="renglon centrar" >{sstate}</td>
        <td className="renglon centrar" >{country}</td>
        <td className="renglon centrar" >{phone}</td>
        <td className="renglon centrar" >{email}</td>
        <td className="renglon centrar" >{create}</td>
        <td className="renglon centrar" >{update}</td>
        
        <td className='  centrar justify'>   
            {/* <Link to={`/products/put/${_id}`} className="btn btn-primary btn-sm mr-1 me-md-2 "
                    role="button" aria-pressed="true"> Modificar </Link>             */}
            <button type="button" className="btn btn-danger btn-sm mr-1 me-md-2 "onClick={()=>{remove(_id);}} >Eliminar </button>
        </td>      
    </tr>
  );
};
export default LineUsers;