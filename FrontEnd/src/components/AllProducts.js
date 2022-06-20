import React, { Fragment, useState, useEffect } from "react";
import axiosClient from "../configuration/axiosClient";
import "./styles/styles.css";
import "./styles/All&EditStyles.css";
import LineProduct from "./LineProduct";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";


const AllProducts = (props) => { 

  const [products, setProducts] = useState([]);
  const getProducts = async () => {     
    const respuesta = await axiosClient.get('/products',{withCredentials:true});
    setProducts(respuesta.data);
  };

  //Eliminar producto 👍
  const confirmRemove = (_id) => {
    Swal.fire({
      title: "Está seguro de eliminar ? ",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar !",
    })
    .then((result) => {
      if (result.value) {
        removing(_id);
      }
    });
  };

  const removing = async (_id) => {
    await axiosClient
      .delete(`/products/del/${_id}`,{withCredentials:true})
      .then((respuesta) => {
        Swal.fire({
          icon: "success",
          title: "Producto Eliminado !",
        });
        getProducts();
      })
      .catch(function (error) {
        Swal.fire({
          icon: "error",
          title: "Error : No se puede eliminar",
          text: error
        });
     });
  };

  useEffect(() => {
    getProducts()
  },[]);

  //CATEGORIES
  const [category, setCategory] = useState([]); 
  const getCategories = async () => {
    const respuesta = await axiosClient.get('/categories',{withCredentials:true});
    setCategory(respuesta.data);
  };

  useEffect(() => {
    getCategories();
  }, []);
  

 //Obtener datos FILTRADOS x NOMBRE de Api 
   let filterBy;
  const getFilterProductsName = async () => {
     await axiosClient
      .get(`/products?productName=`+filterBy,{withCredentials:true})
      .then((respuesta) => {
        setProducts(respuesta.data)
      })
      .catch(function (error) {
        console.log(error)
      });
  };
  //evento de seleccion de filtro  
    const changesName=(e)=>{
        filterBy=e.target.value;
        if(filterBy === 'todos'){
           getProducts() 
        } else {
          getFilterProductsName()   
    };
  } 

//Obtener datos FILTRADOS x CATEGORIA de Api 
const getFilterProductsCategory = async () => {
  await axiosClient
    .get(`/products?categoryNameId=`+filterBy,{withCredentials:true})
    .then((respuesta) => {
      setProducts(respuesta.data)
    })
    .catch(function (error) {
      console.log(error)
    });
};
//evento de seleccion de filtro  
  const changesCategory=(e)=>{
      filterBy=e.target.value;
      if(e.target.value==='todas'){
         getProducts()
      } else {
        getFilterProductsCategory()
  };  
}   
 
const showProducts = (props) => {
  return (
    <tbody>
      {products.map((oneProduct) => (
        <LineProduct 
          key={oneProduct._id}
          _id={oneProduct._id}
          name={oneProduct.name}
          img={oneProduct.img}
          description={oneProduct.description}
          categoryId={oneProduct.categoryId}
          size={oneProduct.size}
          unitPrice={oneProduct.unitPrice}
          stock={oneProduct.stock}
          create={oneProduct.createdAt}
          update={oneProduct.updatedAt}
          remove={confirmRemove}
          />
      ))}
    </tbody>
  );
};

  return (
    <Fragment>
      <div>
        <h1 className="tituloTabla">Listado de Productos</h1>
        <p>{}</p>
      </div>
      <br></br>      
        <div className="containerBtnDesplegable displayFlex " >
          <div className="btnBuscaxNombre">
            <p className="pBtnDesplegable  ">Buscar por nombre</p>
              <select
                type="text"
                name="name"
                onChange={changesName}
                className="m-3 mr-md-1  selectBtnDesplegable form-select"
                >
                {products.map(oneProduct => (
                  <option  key={oneProduct._id} value={oneProduct.name}>
                    {oneProduct.name}
                  </option>
                ))}
                <option value={"todos"}>Mostrar todos los productos</option>
              </select>
          </div>
          <div className="colorBlanco">
            ......
          </div>
          <div className="btnBuscaxNombre" >
            <p className="pBtnDesplegable " >Buscar por categoría</p>
              <select
                type="text"
                name="categoryId"
                onChange={changesCategory}
                className="m-3 mr-md-1  selectBtnDesplegable form-select "
              >  
                {category.map(oneCategory => (
                  <option key={oneCategory._id} value={oneCategory._id}>
                    {oneCategory._id}  -  {oneCategory.name}
                  </option>
                ))}
                <option value={"todas"}>Mostrar todas las categorías</option>
              </select>
          </div> 
        </div> 

      <table className="table table-striped table-responsive table-bordered ">
        <thead>
          <tr>
            <th className="tituloItem "> Id </th>
            <th className="tituloItem "> Producto </th>
            <th className="tituloItem "> Imágen </th>
            <th className="tituloItem "> Descripción </th>
            <th className="tituloItem "> Categoría </th>
            <th className="tituloItem "> Tamaño </th>
            <th className="tituloItem "> Precio Unit. </th>
            <th className="tituloItem "> Stock </th>
            <th className="tituloItem "> Creado</th>
            <th className="tituloItem "> Actualizado </th>

            <th><Link to={'/FormProducts'} className=" m-3 mr-md-2 btn btn-success "
                  role="button" aria-pressed="true"  > Nuevo producto </Link> 
            </th>
          </tr>
        </thead>
        {showProducts()}
      </table>
    </Fragment>
  );
};

export default AllProducts;
