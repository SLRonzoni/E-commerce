import React, { Fragment, useState, useEffect } from "react";
import axiosClient from "../configuration/axiosClient";
import Swal from "sweetalert2";
import "./styles/All&EditStyles.css";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";

const EditCategory = (props) => {

  const {_id } = props.match.params;

  const [category, setCategory] = useState({
    _id: "",
    name: ""
  });


  const [categoryShow, setCategoryShow] = useState({
    _id: "",
    name:""
  });


  const changes = (e) => {
    setCategory({
      ...category,
      [e.target.name]: e.target.value,
    });
  };

  const send = (e) => {
    e.preventDefault();
    save();
  };

  

  useEffect(() => {
    const getCategory = async () => {
      await axiosClient.get(`/categories/${_id}`,{withCredentials:true})
      .then((respuesta) => {
          setCategory(respuesta.data);
          setCategoryShow(respuesta.data);
      })
      .catch((error=>{
           console.log(error);
      }));
    };
    getCategory();
  }, [_id]);

  const save = async () => {
    await axiosClient
      .put(`/categories/put/${_id}`, category,{withCredentials:true})
      .then((respuesta) => {
        Swal.fire({
          icon: "success",
          title: "Modificación de categoria exitosa !",
        });
        props.history.push("/AllCategories");
        
      })
      .catch(function (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error
        });
      });
  };


  return (

    <Fragment  >
      <br></br> 
        <div >
        <div className="containerEditGender">         
           <Card.Text className="card-text-edit-gender centrar"> 
              <br></br>
              <h5 className="text colorBlack" >Categoría a modificar...</h5>   
           </Card.Text>
           
            <div className="list-group-char">
                <div className="list-group-char" >
                  Categoría 
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    defaultValue={categoryShow.name}
                    onChange={changes}
                    />
                    <br></br>
                  
                </div>

                <div >
                  <div className="d-grid gap-4 d-md-flex justify-content-md-center">
                    <button
                      type="submit"
                      name="save"
                      className="m-2 btn btn-primary"
                      onClick={send}
                    >
                      Guardar
                    </button>
                    <Link
                      to={"/AllCategories"}
                      className="m-2 btn btn-primary"
                      role="button"
                      aria-pressed="true"
                    >
                      {" "}
                      Volver{" "}
                    </Link>
                  </div>
                </div>
                <br></br>
            </div>  
          </div>              
      </div>
</Fragment>

  );
};

export default EditCategory;