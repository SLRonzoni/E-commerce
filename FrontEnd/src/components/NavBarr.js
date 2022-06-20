import React from "react";
import "./styles/styles.css"
import Swal from "sweetalert2";
import { Link, NavLink } from "react-router-dom";
import { Navbar,Container,Nav,NavDropdown, NavbarBrand ,Badge} from "react-bootstrap";
import { useContext } from "react";
import { Store } from '../Store';


export default function Navbarr () {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;
 
    const logout = ()=>{
      Swal.fire({
        icon: "success",
        title: `Sesión finalizada`,
        text: "Usuario desconectado con éxito" ,
        showConfirmButton:false
      })
      
      ctxDispatch({type:'USER_SIGNOUT'});
      localStorage.removeItem('userInfo');
      localStorage.removeItem('loginData');
      localStorage.removeItem('paymentMethod');
      localStorage.removeItem('cartItems');
      localStorage.removeItem('shippingAddress'); 
      
      setTimeout( function() { window.location.href = "/"; }, 1000 );
      }   
     
  return(
      <Navbar expand="lg" bg="dark" variant="dark">
        <Container>
          <NavbarBrand >MERCADO DE MATERIALES
            <Link to="/"className="nav-link" ></Link>
          </NavbarBrand>

          <Nav className="me-auto">
            <Link to="/cart" className="nav-link">
              Carrito...
              {cart.cartItems.length>0 && (
                <Badge pill bg="danger">
                  {cart.cartItems.reduce((a,c)=> a + c.quantity,0)}
                </Badge>
              )}
            </Link> 
          </Nav>        
           
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">

              <NavbarBrand >
              {userInfo.user && userInfo.user.role!==10 && (
                
                   userInfo.user ?
                  (
                   <NavDropdown title={userInfo.user.name } id="basic-nav-dropdown">
                    <NavDropdown.Item href="/UserAllProducts">Productos</NavDropdown.Item>
                    <NavDropdown.Item href="/MyOrders">Mis Pedidos</NavDropdown.Item>
                    <NavDropdown.Divider /> 
                    <NavLink to={`/users/put/${userInfo.user._id}`} className="renglonBtn nav p-3 col-1">Mi Perfil</NavLink>
                  </NavDropdown> ) 
                   : 
                  (<NavDropdown title='Clientes' id="basic-nav-dropdown">       
                    <NavDropdown.Item href="/UserAllProducts">Productos</NavDropdown.Item>
                    <NavDropdown.Item href="/">Mis Pedidos</NavDropdown.Item>
                    <NavDropdown.Divider /> 
                    <NavLink to="/users/put/:_id" className="renglonBtn nav p-3 col-1">Mi Perfil</NavLink>
                  </NavDropdown>)
                )} 
              </NavbarBrand>
            
              {userInfo.user && userInfo.user.role===10 && (
              <NavbarBrand>
                  <NavDropdown title="Administrador" id="basic-nav-dropdown">
                    <NavDropdown.Item href="/AllProducts">Productos</NavDropdown.Item>
                    <NavDropdown.Item href="/AllCategories">Categorias</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/AllUsers">Clientes</NavDropdown.Item>
                    <NavDropdown.Item href="/ordersClient">Pedidos</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/Informes">Informes</NavDropdown.Item>
                  </NavDropdown>
              </NavbarBrand>
               )} 
            </Nav>
            
            <Nav>
              <NavbarBrand > 
                  <Link to="/authUser/signup" className="login  nav-link  p-1 col-1 " >Registro</Link>
              </NavbarBrand>
              <NavbarBrand>
                  <Link to="/authUser/login" className="login  nav-link  p-1 col-1 " >Login</Link>
              </NavbarBrand>
              <NavbarBrand>
                 <Link  to="/authUser/logout" onClick={logout} className="login  nav-link  p-1 col-1 " >Logout</Link>
              </NavbarBrand>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
  );
 }

