import React, { useState, useEffect,Fragment} from "react";
import axiosClient from "../configuration/axiosClient";
import './styles/styles.css';
import "./styles/All&EditStyles.css";
import {ListGroupItem} from 'react-bootstrap';
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const EditProduct = (props) => {
  const {_id} = props.match.params;

  const [product, setProduct] = useState({
    _id: "",
    name:"",
    img:"",
    description:"",
    size:"",
    unitPrice:"",
    stock:"",
    categoryId:"",
    createdAt:"",
    updatedAt:""
  });

  const [productShow, setProductShow] = useState({
    _id: "",
    name:"",
    img:"",
    description:"",
    size:"",
    unitPrice:"",
    stock:"",
    categoryId:"",
    createdAt:"",
    updatedAt:""
  });

 
  const changes = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const send = (e) => {
    e.preventDefault();
    saveChanges();
  };


  const saveChanges = async () => {
    await axiosClient
      .put(`/products/put/${_id}`, product,{withCredentials:true})
      
      .then(respuesta => {
        if(respuesta.status===200){
          Swal.fire({
            icon: "success",
            title: "Modificación del producto exitosa !",
           });
           props.history.push("/AllProducts");
        } 
      })
      .catch(error=> {
        console.log(error)
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error
        });
      });
    }

  useEffect(() => {
    const getProducts = async () => {
      await axiosClient.get(`/products/${_id}`,{withCredentials:true})
      .then((respuesta) => {
          setProduct(respuesta.data);
          setProductShow(respuesta.data);
      })
      .catch((error=>{
           console.log(error)
      }));
    };
    getProducts();
  }, [_id]);


  //BUSCAR NOMBRE DE LA CATEGORIA
  const [categoryN, setCategoryName] = useState([]);
  useEffect(() => {
  const getNameCategories = async () => {
    await axiosClient
      .get(`/categories/${productShow.categoryId}`)
      .then((respuesta) => {
        setCategoryName(respuesta.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  getNameCategories();
},[productShow.categoryId]);


  //BOTON DESPLEGABLE PARA categorias
  const [category, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      await axiosClient
        .get("/categories",{withCredentials:true})
        .then((respuesta) => {
          setCategories(respuesta.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getCategories();
  }, []);
  
  let fechaCrea=productShow.updatedAt.replace( "T"," , " )
  let fechaCreado=fechaCrea.replace("Z","  " )
  let fechaActualiza=productShow.updatedAt.replace( "T"," , " )
  let fechaActualizado=fechaActualiza.replace("Z","  " )
  

  return (
      <Fragment>  
        <br></br>
          <div className="containerEditChar" >
            <div className="centrar bgWhitesmoke">    
              <br></br>
              <h4 className="textTitulo" >Producto a modificar...</h4>
              <br></br>
              <div className="displayFlex centrar">
                <p className="divEditChar"> Producto   :   {productShow.name}</p>
                <img className='fotoEdit' src={productShow.img}  alt="Producto" /> 
              </div>
            </div>
            <br></br>

            <div className="displayFlex centrar">
                <div className="margen form-group form-control input-edit-char  ">
                    <label>Descripción actual : 
                         <p className="pEdit">  {productShow.description}</p>
                    </label>
                    <textarea
                    type="text"
                    className="form-control input-edit-char  "
                    placeholder="nueva descripción..."
                    name="description"
                    onChange={changes}
                    /> 
                </div>
              </div>

            <br></br>
            <div className=" container bg-light d-grid gap-2 d-md-flex  justify-content-md-center">
              <div className="displayFlex">
                <div className="margen form-group form-control input-edit-char inputMovie ">
                    <label>Tamaño</label>
                    <p className="pEdit">(actual) :  </p>
                    <p className="pEdit">{productShow.size}</p>
                    
                      <input
                      type="text"
                      className="form-control input-edit-char  "
                      placeholder="nuevo tamaño..."
                      name="size"
                      onChange={changes}
                      /> 
                </div>

                <div className="margen form-group form-control input-edit-char inputMovie ">
                    <label>Precio</label>
                    <p className="pEdit">(actual) : </p>
                    <p className="pEdit"> $ {productShow.unitPrice}</p>
                   
                      <input
                      type="text"
                      className="form-control input-edit-char  "
                      placeholder="nuevo precio..."
                      name="unitPrice"
                      onChange={changes}
                      /> 
                </div>
                              
                <div className="margen form-group form-control input-edit-char inputMovie ">
                  <label>Categoría</label>  
                  <p className="pEdit">(actual) : </p>
                  <p className="pEdit">{categoryN.name}</p>
                  <select 
                    type="text" 
                    className="form-select form-select-example" 
                    name="categoryId"defaultValue={productShow.categoryId}
                    onChange={changes} 
                    >                   
                    <option value={-1} >Seleccione...</option>
                    {category.map((oneCategory, i) => (
                      <option key={oneCategory._id} value={oneCategory._id}>
                        {oneCategory.name}
                      </option>
                    ))}
                  </select>   
                </div>

                <div className="margen form-group form-control input-edit-char inputMovie ">
                    <label>Stock</label>
                    <p className="pEdit">(actual) :</p>
                    <p className="pEdit">{productShow.stock}</p>
                   
                      <input
                      type="text"
                      className="form-control input-edit-char  "
                      placeholder="nuevo stock..."
                      name="stock"
                      onChange={changes}
                      /> 
                </div>
                </div>
              </div>
              <div className=" container bg-light centrar ">
                  <br></br>
                  <div className="  form-control  ">
                    <p className="pEdit">Creado :  {fechaCreado} <br></br>   Actualizado : {fechaActualizado}</p>
                  </div>
                  <br></br>
                <div className="container displayFlex">
                </div>                  
                
                </div>  
              <div>
                 <ListGroupItem>
                  <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                      <button
                        type="submit"
                        name="descripcion"
                        className="m-1 btn btn-primary md-end"
                        onClick={send}
                      >
                        Guardar
                      </button>
                      <Link
                        to={"/AllProducts"}
                        className="m-1 mr-md-2 btn btn-primary"
                        role="button"
                        aria-pressed="true"
                      >
                        {" "}
                        Volver{" "}
                      </Link>
                    </div>
                  </ListGroupItem>
               </div>                
          </div>
     </Fragment>
  );

};

export default EditProduct;
