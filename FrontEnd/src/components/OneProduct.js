import { Link, useParams } from "react-router-dom";
import React, { useEffect, useReducer ,useState} from "react";
import axiosClient from "../configuration/axiosClient";
import { Row, Col, ListGroup, Badge, Button ,Card} from "react-bootstrap";
import Rating from "./Rating";

const reducer = (state, action) => {
  switch (action.type) {
    case "GET_REQUEST":
      return { ...state, loading: true };
    case "GET_SUCCESS":
      return { ...state, product: action.payload, loading: false };
    case "GET_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function OneProduct() {
  const params = useParams();
  const { _id } = params;

  const [{ loading, error, product }, dispatch] = useReducer(reducer, {
    product: [],
    loading: true,
    error: "",
  });

  useEffect(() => {
    const getProducts = async () => {
      dispatch({ type: "GET_REQUEST" });
      try {
        const result = await axiosClient.get(`/products/${_id}`,{withCredentials:true});
        dispatch({ type: "GET_SUCCESS", payload: result.data });
      } catch (error) {
        dispatch({ type: "GET_FAIL", payload: error.message });
      }
    };
    getProducts();
  }, [_id]);

   //BUSCAR NOMBRE DE LA CATEGORIA
   const [categoryN, setCategoryName] = useState({ _id: "", name: "" });

   useEffect(() => {
     const getNameCategories = async () => {
       await axiosClient
         .get(`/categories/${product.categoryId}`)
         .then((respuesta) => {
           setCategoryName(respuesta.data);
         })
         .catch((error) => {
           console.log(error);
         });
     };
     getNameCategories();
   }, [product.categoryId]);



  return (
    <div>
      {loading ? (
        <div> Cargando...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div>
          
          <Row style={{ justifyContent: 'center' }} >
            <Col md={4}>
              <img
                className='img-large product-img card-img-top'
                src={product.img}
                alt={product.name}
              />
            </Col>
            
            <Col md={2} >
              <ListGroup variant='flush'>
                <ListGroup.Item >
                  <h1 className="text-center">{product.name}</h1>
                </ListGroup.Item>
                
                <ListGroup.Item>
                  <Rating>
                    rating={product.rating}
                    numReviews={product.numReviews}
                  </Rating>
                   </ListGroup.Item>
                   <br></br><br></br>
                  <Card style={{ width: '24rem' }} > 
                    <ListGroup.Item>
                      <br></br>
                      <Row>
                        <Col>Precio :</Col>
                        <Col> $ {product.unitPrice}</Col>
                      </Row>  
                      </ListGroup.Item>   
                      <ListGroup.Item>
                        Categoría:<p>{categoryN.name}</p>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        Descripción :<p>{product.description}</p>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <Row>
                        <Col>Estado :</Col>
                        <Col className="oneProductStatus">  
                          {product.stock>0 ? (
                            <Badge bg='success'>En stock</Badge>
                          ) : (
                            <Badge bg='danger'>Sin Stock</Badge>
                          )}
                       
                        </Col>
                      </Row>
                      </ListGroup.Item> 
                      <br></br>
                        <div > 
                        <Link  to={`/`}className="d-grid" >
                          <Button variant="primary"> Volver </Button>
                        </Link>
                        </div>
                      
                    </Card>
                  </ListGroup>                 
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
}

export default OneProduct;



 
