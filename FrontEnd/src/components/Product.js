import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Row } from "react-bootstrap";
import { Link} from "react-router-dom";
// import Rating from "./Rating";
import { useContext } from "react";
import { Store } from "../Store";
import axiosClient from "../configuration/axiosClient";
import Swal from "sweetalert2";
// import LoadingBox from './LoadingBox';
// import MessageBox from "./MessageBox";

function Product(props) {
  const { product } = props;

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart,userInfo } = state;

  const addToCartHandler = async () => {

    if(userInfo) {
    const existItem = cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axiosClient.get(`/products/${product._id}`);

    if (data.stock < quantity) {
      setTimeout(
        Swal.fire({
           icon: "warning",
           title: "Disculpe, producto sin stock ",
           showConfirmButton:false
         })
      ,3000);
      return;
    }
  

    ctxDispatch({
      type: "CART_ADD_ITEM",
      payload: { ...product, quantity},
    });
  

} else {
  setTimeout(
    Swal.fire({
       icon: "warning",
       title: "Para comprar debe loguearse ",
       showConfirmButton:false
     })
  ,3000);
  window.location.href="/authUser/login"
}
}
  return (
  // { loading ? (
  //     <LoadingBox/>
  //   ) : error ? (
  //     <MessageBox variant="danger">{error}</MessageBox>
  //   ) :(
    <Row className="g-2">
    <Card className='product'  >
     <div className='product'  >
      <Link to={`/products/${product._id}`}>
        <img
          className='product-img card-img-top'
          src={product.img}
          alt={product.name}
        />
      </Link>
      </div>
      <Card.Body>
        <Link className='letraNegro' to={`/products/${product._id}`}>
          <Card.Title className='letraNegro'>{product.name}</Card.Title>
        </Link>
        {/* <Rating rating={product.rating} numReviews={product.numReviews} /> */}
        <Card.Text>$ {product.unitPrice}</Card.Text>
        {product.stock === 0 ? <Button variant='light' disabled>Sin stock</Button>
        :
        <Button
          onClick={addToCartHandler}
          className='m-1 mr-md-2 btn btn-primary'
        >
          Agregar
        </Button>
        }
        
      </Card.Body>
    </Card>
    </Row>
  );
}

export default Product;
