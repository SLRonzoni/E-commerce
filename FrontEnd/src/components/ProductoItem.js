import React from 'react';
import './styles/lineStyles.css';
import '../App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card } from 'react-bootstrap';
//ICONOS
import 'antd/dist/antd.css';
import {ShoppingCartOutlined} from '@ant-design/icons';


const ProductoItem = ({_id,name,img,description,unitPrice,size,agregar_carro}) => {   
    return (
        <div className="displayFlex">
            <br></br> <br></br>
            <div className=''>
                <Card style={{ height:'15rem', width:'17rem', marginLeft:'2rem'}} className='box-card '>
                    <Card.Body>
                        <Card.Title className="mayuscula">{name}</Card.Title>
                        <img className="imagenChar centrar" src={img} alt='foto'/>    
                        <Card.Text >Descripción :{description}  </Card.Text>
                        <Card.Text >Tamaño :{size}  </Card.Text>
                        <Card.Text >Precio : $ {unitPrice}  </Card.Text>
                    </Card.Body>   
                    <button className='botonAgregar'  onClick={()=>agregar_carro(_id)}>
                    <ShoppingCartOutlined style={{fontSize:'30px', color:'green'}}/>
                    </button>
                </Card>
            </div>           
        </div>
    );
};

export default ProductoItem;

