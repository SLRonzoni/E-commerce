import React from 'react';
import { Link } from 'react-router-dom';
import './styles/lineStyles.css';

const LineCategories = ({_id, name, remove }) =>{
    return (
    <tr className="">
        <td className="categoryItem" >{_id}</td>
        <td className="categoryItem" >{name}</td>
        <td >
            <div>
                <Link to={`/categories/put/${_id}`} className=" btn btn-primary btn-sm  medio"
                        role="button" aria-pressed="true"> Editar </Link>

                <button type="button" className=" btn btn-danger btn-sm btn-sm mr-2 me-md-1 medio" 
                        onClick= {() =>{remove(_id); }} >Eliminar </button>
                        
            </div>
        </td>      
    </tr>
    )
};        
    
export default LineCategories;