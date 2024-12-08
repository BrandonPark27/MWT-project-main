import React from "react";
import "../css/App.css";
import SearchBox from "../components/SearchBox";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode"; 

function Header() {
  const navigate = useNavigate(); 
  const token = localStorage.getItem("authToken"); 
  const isAuthenticated = !!token; 

  let first_name = "Guest";
  if (isAuthenticated) {
    try {
      const decodedToken = jwtDecode(token);
      console.log(token);
      first_name = decodedToken?.first_name || "User";
    } catch (error) {
      console.error("Error decoding token", error);
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("authToken"); 
    navigate("/"); 
  };

  return (
    <Navbar expand="lg" className="header">
      <Container className="header_brand">
        <Navbar.Brand as={Link} to="/">
          <h1>Albumzone</h1>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="header_search">
            <div className="header_search">
              <SearchBox />
            </div>
          </Nav>
          <Nav className="header_nav">
            {isAuthenticated ? (
              <>
                <Nav.Link as={Link} to="/profile">
                  <div className="header_option">
                    <span className="header_option_line1">Hello,</span>
                    <span className="header_option_line2">{first_name}!</span>
                  </div>
                </Nav.Link>
              </>
            ) : (
              <Nav.Link as={Link} to="/Sign-up">
                <div className="header_option">
                  <span className="header_option_line1">Hello Guest</span>
                  <span className="header_option_line2">Sign In</span>
                </div>
              </Nav.Link>
            )}
            <Nav.Link as={Link} to="/Order">
            <div className="header_option">
              <span className="header_option_line1">Returns</span>
              <span className="header_option_line2">& Orders</span>
            </div>
          </Nav.Link>
            <Nav.Link as={Link} to="/cart" className="header_option_cart">
              <ShoppingBasketIcon />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;

