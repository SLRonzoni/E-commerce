import React, { useState } from "react";
import axiosClient from "../configuration/axiosClient";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import "./styles/styles.css";

function FormCategories(props) {
  
  const [category, setCategory] = useState({
    _id: "",
    name: ""
  });

  const changes = (e) => {
    setCategory({
      ...category,
      [e.target.name]: e.target.value,
    });
  };

  const send = (e) => {
    e.preventDefault();
    saveCategory();
  };

  const saveCategory = async () => {
    await axiosClient
      .post("/categories", category,{withCredentials:true})
      .then((response) => {
        if (response) {
          Swal.fire({
            icon: "success",
            title: "Categoria Agregada!",
          });
          props.history.push("/AllCategories");
        }
      })
      .catch(function (error) {
        Swal.fire({
        icon:"error",
        title: "Error",
        text: error,
        });
      });
  };

  return (
    <div>
      <br></br>
      <br></br>
      <form onSubmit={send} className="container-sm col-6 col-md-4 bg-light">
        <br></br>
        <h3>Nueva categoría...</h3>
        <div className="form-group ">
          <label htmlFor="name">Categoría </label>
          <input
            type="text"
            className="form-control"
            name="name"
            placeholder="Ingrese nueva categoría"
            required
            onChange={changes}
          />
        </div>
        
        <div className="centrar">
          <button type="submit" className="m-3 btn btn-primary">
            Guardar
          </button>
          <Link
              to={"/AllCategories"}
              className="m-3 mr-md-2 btn btn-primary"
              role="button"
              aria-pressed="true"
            >
              {" "}
              Volver{" "}
            </Link>
        </div>
    </form>
    </div>
  );
}
export default FormCategories;