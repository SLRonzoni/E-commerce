import React, { Fragment, useEffect, useReducer } from "react";
import "../App.css";
import { Container, Row, Col } from "react-bootstrap";
import axiosClient from "../configuration/axiosClient";
import logger from "use-reducer-logger";
import Product from "./Product";
import LoadingBox from "./LoadingBox";
import MessageBox from "./MessageBox";
import {getError} from './utils';

//ICONOS
import "antd/dist/antd.css";

const reducer = (state, action) => {
  switch (action.type) {
    case "GET_REQUEST":
      return { ...state, loading: true };
    case "GET_SUCCESS":
      return { ...state, products: action.payload, loading: false };
    case "GET_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const UserAllProducts = (props) => {
  const [{ loading, error, products }, dispatch] = useReducer(logger(reducer), {
    products: [],
    loading: true,
    error: "",
  });

  useEffect(() => {
    const getProducts = async () => {
      dispatch({ type: "GET_REQUEST" });
      try {
        const result = await axiosClient.get("/products");
        dispatch({ type: "GET_SUCCESS", payload: result.data });
      } catch (error) {
        dispatch({ type: "GET_FAIL", payload: getError(error) });
      }
    };
    getProducts();
  }, []);

  return (
    <Fragment>
      <Container>
        <h1 className='h1Carrito'>Nuestros Productos</h1>

        <div className='products'>
          {/* para conexion lenta...mensaje 'cargando' */}
          {loading ? (
            <LoadingBox/>
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <Row>
              {products.map((product) => (
                <Col key={product._id} sm={6} md={4} lg={3} className='mb-3'>
                  <Product product={product}></Product>
                </Col>
              ))}
            </Row>
          )}
        </div>
      </Container>
    </Fragment>
  );
};

export default UserAllProducts;
