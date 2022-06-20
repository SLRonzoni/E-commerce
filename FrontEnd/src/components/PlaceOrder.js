import React, { useContext,useReducer } from "react";
import axiosClient from '../configuration/axiosClient'
import "./styles/styles.css";
import { Card } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { ListGroup } from "react-bootstrap";
import { Store } from "../Store";
import LoadingBox from './LoadingBox';
import Swal from "sweetalert2";


const reducer = (state,action)=> {
    switch (action.type){
      case 'CREATE_REQUEST':
        return {...state,loading:true}
      case 'CREATE_SUCCESS':
        return {...state,loading:false}
      case 'CREATE_FAIL':
        return {...state,loading:false}
      default :
             return state;
    }
}


export default function PlaceOrder(props) {

  const [{loading,error},dispatch]=useReducer(reducer, {
    loading:false,
    error:''
  })

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;
  cart.itemsPrice = round2(
    cart.cartItems.reduce((a, c) => a + c.quantity * c.unitPrice, 0)
  );

  cart.shippingPrice = cart.itemsPrice > 100 || cart.itemsPrice=== 0 ? round2(0) : round2(10);

  cart.taxPrice = round2(0.15 * cart.itemsPrice);

  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

  const placeOrderHandler = async () => {

    try{
      dispatch({type:'CREATE_REQUEST'})
      const {data}=await axiosClient.post('/ordersClient',
                    { orderItems:userInfo.user._id,
                      shippingAddress:cart.shippingAddress,
                      paymentMethod:cart.paymentMethod,
                      itemsPrice:cart.itemsPrice,
                      shippingPrice:cart.shippingPrice,
                      taxPrice:cart.taxPrice,
                      totalPrice:cart.totalPrice,
                      user:userInfo.user._id },
                      {withCredentials:true}
      )
      .then(respuesta => {
        if (respuesta) {
        Swal.fire({
          icon: "success",
           title: "Gracias por su compra !",
          text: "Orden registrada con éxito",
          timer:1000,
          showConfirmButton:false
        });

        if(localStorage.getItem('paymentMethod')==="Stripe"){
           window.location.href = `/Stripe`;
        }
  
        if(cart.paymentMethod==="Paypal"){
          setTimeout( function() { window.location.href = `/Paypal`; },1000 );
        }
  
        if(cart.paymentMethod==="MercadoPago"){
          setTimeout( function() { window.location.href = `/Payment`; },1000 );
        }
  
  
        if(cart.paymentMethod==="Efectivo" || cart.paymentMethod==="Debito" || cart.paymentMethod==="Credito" ){
          setTimeout( function() { window.location.href = `/Payment`; },1000 )
        }

        ctxDispatch({type:'CART_CLEAR'});
        ctxDispatch({type:'CREATE_SUCCESS'});
        
       
      }
      })
        
      
      
    }
    catch (error) {
      dispatch({type: 'CREATE_FAIL'})
      console.log(error)
    }
  };

    
  return (
    <div className="cardPlaceOrder">
    <div  className="">
      <h1 className='my-3'>Pedido</h1>
      <Row className=''>
        <Col md={8}>
          <Card className='mb-3'style={{ width: "auto", height:"auto"}} >
            <Card.Body >
              <Card.Title>Datos de entrega</Card.Title>
              <Card.Text >
                <strong >Name : </strong>{userInfo.user.name}  {userInfo.user.lastName}
                <br></br>
                <strong>Dirección de entrega : </strong>{cart.shippingAddress.street} {' '}
                                                        {cart.shippingAddress.number} {', piso '}
                                                        {cart.shippingAddress.floor} {', depto '}
                                                        {cart.shippingAddress.unit} {',  '}
                                                        {cart.shippingAddress.city} {', Cod.Postal '}
                                                        {cart.shippingAddress.zipCode} {',  '}
                                                        {cart.shippingAddress.sstate} {', '}
                                                        {cart.shippingAddress.country}
              </Card.Text>
              <Link to='/shipping'>Editar</Link>
            </Card.Body>
          </Card>

          <Card className='mb-3'style={{ width: "auto",height:"auto" }} >
            <Card.Body>
              <Card.Title>Datos del pago</Card.Title>
              <Card.Text>
                <strong>Forma de pago : </strong>{cart.paymentMethod}
              </Card.Text>
              <Link to='/paymentMethod'>Editar</Link>
            </Card.Body>
          </Card>

          <Card className='mb-3' style={{ width: "auto" ,height:"auto"}} >
            <Card.Body  >
              <Card.Title>Productos elegidos</Card.Title>
              <ListGroup variant='flush'  style={{ width: "48rem", height:"auto" }}>
                {cart.cartItems.map((item) => (
                  <ListGroup.Item key={item._id} >
                    <Row className=' ' > 
                       <Col  >
                        <img
                          src={item.img}
                          alt={item.name}
                          className='img-fluid rounded img-thumbnail'
                        ></img>{" "}
                      </Col> 
                      <Col> <Link to={`/products/${item._id}`}>{item.name}</Link>
                      </Col>
                      <Col >
                        <span>{item.quantity}</span>
                      </Col>
                      <Col >$ {item.unitPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
              <Link to='/cart'>Editar</Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card style={{ width: "25rem", height:"auto" }} >
            <Card.Body>
              <Card.Title>Resumen</Card.Title>
              <ListGroup >
                <ListGroup.Item>
                  <Row>
                    <Col>Productos</Col>
                    <Col>$ {cart.itemsPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Costo de Envío</Col>
                    <Col>$ {cart.shippingPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Impuestos</Col>
                    <Col>$ {cart.taxPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
              <ListGroup.Item>
                <Row>
                  <Col><strong>TOTAL A PAGAR</strong></Col>
                  <Col><strong>$ {cart.totalPrice.toFixed(2)}</strong></Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <div className=''>
                <Link
                  to={"/cart"}
                  className=" "
                  role="button"
                >
                Volver a carrito
                </Link>
                  <Button 
                    onClick={placeOrderHandler}
                    type='button'
                    variant="primary"
                    disabled={cart.cartItems.length === 0}
                  >
                    Realizar Pago
                  </Button>
                </div>
                {loading && <LoadingBox></LoadingBox>}
              </ListGroup.Item>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
    </div>
  );
}
