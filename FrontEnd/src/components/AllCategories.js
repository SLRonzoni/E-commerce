import React, { Fragment, useState, useEffect } from "react";
import axiosClient from "../configuration/axiosClient";
import "./styles/styles.css";
import "./styles/All&EditStyles.css";
import LineCategories from "./LineCategories";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";

const AllCategories = (props) => {

    const [category, setCategories] = useState([]);
    const getCategories = async () => {
    const respuesta = await axiosClient.get("/categories",{withCredentials:true})
    
    if(respuesta.status!==200){
    Swal.fire({
      icon: 'error', 
      title:"Error !",
        text: respuesta.message || respuesta.error.message
    });
      props.history.push('/');
    }
    
    setCategories(respuesta.data);   
    };
  

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
        remove(_id);
      }
    });
  };

  const remove = async (_id) => {
    await axiosClient
      .delete(`/categories/del/${_id}`,{withCredentials:true})
      .then((respuesta) => {
        
        Swal.fire({
          icon: "success",
          title: "Categoria Eliminada!",
        });
        getCategories();
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
    getCategories();
  }, []);

  const showCategory = (props) => {
    
    return (
      <tbody>
        {category.map((oneCategory) => (
          <LineCategories
            key={oneCategory._id}
            _id={oneCategory._id}
            name={oneCategory.name}
            remove={confirmRemove}
          />
        ))}
      </tbody>
    );
  };

 
  return (
    <Fragment>
      <Container>
      <br></br>
      <div>
        <h1 className="tituloTabla ">Listado de Categorías</h1>
      </div>
      <br></br>
      <table className="table  table-responsive table-bordered  table-striped lineAllCategory">
        <thead>
          <tr>
            <th className="tituloItem" >Id</th>   
            <th className="tituloItem" >Categoría</th>          
            <th className="tituloItem " >
            
              <Link to={"/FormCategories"} className="m-3 mr-md-2 btn btn-success"
                    role="button" aria-pressed="true"> Nueva Categoria </Link> 
            
            </th>
          </tr>
        </thead>
        {showCategory()}
      </table>
      </Container>
    </Fragment>
  );
  
  };
export default AllCategories;
