import React, { useEffect,useState } from "react";
import axiosClient from "../configuration/axiosClient";
import Swal from "sweetalert2";
import "./styles/styles.css";
import { Link } from "react-router-dom";

const FormProducts = (props) => {

    
  const [product, setProduct] = useState({
    _id:"",
    name: "",
    img: "",
    description:"",
    size:"",
    unitPrice:"",
    stock:"",
    categoryId:""
  });

  const changes = (e) => {   
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  
  //  const changesImg = (m) => {   
  //   if(m.target.name && m.target.value.length > 0){
  //     const img =`"http://localhost:4000/public/img-${m.target.value}"` 
  //     console.log(img)
    
  //     setProduct({
  //     ...product,
  //     img
  //   });
  // }
  // }

  const send = (e) => {
    e.preventDefault();
    saveProduct();
  };
  
  const saveProduct = async () => {
    await axiosClient
      .post("/products", product,{withCredentials:true})
      .then(respuesta => {
        if (respuesta) {
        Swal.fire({
          icon: "success",
          title: "Alta de producto exitosa !",
        });
        props.history.push("/AllProducts");
        }
      })
      .catch(function (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error
        });
      });
  };

  //BOTON DESPLEGABLE PARA categorias
  const [category, setCategories] = useState([]);

  //obtener tabla de categorias
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
  

  return (
    <div>
    <br></br>
    <form onSubmit={send} className="container-sm col-6 col-md-4 bg-light">
      <br></br>
      <h3>Ingrese nuevo producto...</h3>
      <div className="form-group ">
        <label htmlFor="name">Producto </label>
        <input
          type="text"
          className="form-control"
          name="name"
          placeholder="Ingresar nombre"
          required
          onChange={changes}
        />
      </div>

      <div className="form-group">
        <label htmlFor="name">Imágen </label>
        <input
          type="file"
          className="form-control"
          encType="multipart/formdata"
          name="img"
          onChange={changes}
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="name">Descripción </label>
        <input
          type="text"
          className="form-control"
          name="description"
          placeholder="Ingresar descripcion"
          onChange={changes}
        />
      </div>

      <div className="form-group">
        <label htmlFor="name">Presentación(tamaño) </label>
        <input
          type="text"
          className="form-control"
          name="size"
          placeholder="Ingresar tamaño"
          onChange={changes}
        />
      </div>

      <div className="form-group">
        <label htmlFor="name">Precio </label>
        <input
          type="text"
          className="form-control"
          name="unitPrice"
          placeholder="Ingresar precio unitario"
          onChange={changes}
        />
      </div>

      <div className="form-group">
        <label htmlFor="name">Stock </label>
        <input
          type="text"
          className="form-control"
          name="stock"
          placeholder="Ingresar stock"
          onChange={changes}
        />
      </div>

      <div className="form-group">
        <label htmlFor="categoryId">Categoría </label>
        <select
          type="text"
          className="form-select"
          aria-label="Default select example"
          name="categoryId"
          required
          onChange={changes}
        >
          <option value={-1}>Seleccione...</option>
          {category.map((oneCategory, i) => (
            <option key={oneCategory._id} value={oneCategory._id}>
             {oneCategory.name}
            </option>
          ))}
        </select>
      </div>
    <br></br>
     
      <br></br>
      <div className="centrar">
        <button type="submit" className="m-2 btn btn-primary md-end "> Guardar </button>
        <Link
          to={"/AllProducts"}
          className="m-3 mr-md-2 btn btn-primary"
          role="button"
        >
          {" "}
          Volver{" "}
        </Link>
        
      </div>
    </form>
    </div>
  );
};

export default FormProducts;
