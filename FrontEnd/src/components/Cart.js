import { Fragment, useContext } from "react";
import  './styles/styles.css';
import { Store } from "../Store";
import { Link } from "react-router-dom";
import { ListGroup, Row, Col, Button, Card } from "react-bootstrap";
import MessageBox from "./MessageBox";
import axiosClient from "../configuration/axiosClient";
import Swal from "sweetalert2";

export default function Cart() {

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const {userInfo}=state

  const updateCart = async (item, quantity) => {
    const { data } = await axiosClient.get(`/products/${item._id}`);
    if (data.stock < quantity) {
      setTimeout(
        Swal.fire({
          icon: "warning",
          title: "Disculpe, stock agotado ",
          showConfirmButton: false,
        }),
        2000
      );
      return;
    }

    ctxDispatch({
      type: "CART_ADD_ITEM",
      payload: { ...item, quantity },
    });
  };

  const delItem = (item) => {
    ctxDispatch({ type: "CART_REMOVE_ITEM", payload: item });
  };

  
  
  const saveCart = async () => {
      
    await cartItems.map((item) =>
      axiosClient
        .post("/cart/add", item, { withCredentials: true })
        .then((respuesta) => {
          if (respuesta) {
            Swal.fire({
              icon: "success",
              title: "Carrito guardado !",
              showConfirmButton:false,
              timer: 1500,
            });
           }
        })
        .catch(function (error) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: error,
          });
        })
    );
  };

  return (
    <Fragment>
      { (!userInfo ||  userInfo.user.role!==10 ) ? (
        
      <div style={{ margin: "2rem", padding: "1.5rem" }}>
        
        <h1 className="cart-titulo">Carrito</h1>
        <Row>
          <Col md={8} className='text-center'>
            {cartItems.length === 0 ? (
              <MessageBox>
                Carrito vacío.....
                <Link to='/'> - Volver a productos - </Link>
              </MessageBox>
            ) : (
              <ListGroup>
                {cartItems.map((item) => (
                  <ListGroup.Item key={item._id}>
                    <Row className='align-items-center'>
                      <Col md={4}>
                        <img
                          src={item.img}
                          alt={item.name}
                          className='img-thumbnail img-cart'
                        ></img>{" "}
                        <Link to={`/products/${item._id}`}>{item.name}</Link>
                      </Col>
                      <Col md={2}>
                        <Button
                          variant='light'
                          onClick={() => updateCart(item, item.quantity - 1)}
                          disabled={item.quantity === 0}
                        >
                          <i className='fas fa-minus-circle'></i>
                        </Button>
                        <span> {item.quantity}</span>{" "}
                        <Button
                          variant='light'
                          onClick={() => updateCart(item, item.quantity + 1)}
                          disabled={item.quantity > item.stock}
                        >
                          <i className='fas fa-plus-circle'></i>
                        </Button>
                      </Col>
                      <Col md={3}> ${item.unitPrice}</Col>
                      <Col md={3} >
                        <div className="cart-total-button">
                        <Button onClick={() => delItem(item)} variant='danger'>
                          <i className='fas fa-trash'></i><br></br>
                        </Button>
                      
                        <Link to={`/`} className=' displayFlex'>
                        <Button variant='light'>
                         Volver a Productos
                        </Button>
                      </Link>
                      </div>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </Col>
          <Col md={3}>
            <Card style={{ width: "24rem" }}>
              <Card.Body>
                <ListGroup variant='flush'>
                  <ListGroup.Item className="centrar">
                    <h3>
                      {" "}
                      Subtotal ({cartItems.reduce(
                        (a, c) => a + c.quantity,
                        0
                      )}{" "}
                      items ) : $
                      {cartItems.reduce(
                        (a, c) => a + c.unitPrice * c.quantity,
                        0
                      )}
                    </h3>
                  </ListGroup.Item>
                  <ListGroup.Item >
                    <div className='cart-total-button'>
                      <Button
                        variant='primary'
                        disabled={cartItems.length === 0}
                        onClick={saveCart}
                      >
                        Guardar
                      </Button>
                      <br></br><br></br>
                      <Link to={`/shipping`} >
                        <Button
                          variant='primary'
                          disabled={cartItems.length === 0}
                          onClick={saveCart}
                        >
                          Pagar
                        </Button>
                      </Link>
                    </div>
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      
      </div>
      ):(
      <h3 className="centrar">El administrador no tiene acceso al carrito</h3>  
     )}  
    </Fragment>
  );
}
