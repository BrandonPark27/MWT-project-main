import React, { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link, useNavigate } from "react-router-dom";
import "../css/App.css";

export default function CartScreen() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(cart);
  }, []);

  const handleRemoveItem = (index) => {
    const updatedCart = cartItems.filter((_, i) => i !== index);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartItems(updatedCart);
  };

  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => total + (parseFloat(item.price) || 0), 0)
      .toFixed(2);
  };

  const handleCheckout = () => {
    const total = calculateTotal();
    localStorage.setItem("total", total);
    navigate("/checkout");
  };

  return (
    <div className="cart-screen">
      <title>Shopping Cart</title>
      <h1>Shopping Cart</h1>
      <Row>
        <Col md={8}>
          {cartItems.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            <ListGroup>
              {cartItems.map((item, index) => (
                <ListGroup.Item key={index}>
                  <Row className="align-items-center">
                    <Col md={4}>
                      <img
                        src={item.imageLink}
                        alt={item.name}
                        style={{ width: "100px", height: "auto" }}
                      />
                      <Link to={`/product/${item.name}/${item.artist}`}>
                        {item.name}
                      </Link>
                    </Col>
                    <Col md={3}>${item.price}</Col>
                    <Col md={3}>{item.conditionDescription}</Col>
                    <Col md={2}>
                      <Button variant="light" onClick={() => handleRemoveItem(index)}>
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <h3>Subtotal: ${calculateTotal()}</h3>
              <Button
                type="button"
                variant="primary"
                disabled={cartItems.length === 0}
                onClick={handleCheckout} 
              >
                Proceed to Checkout
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
    
  );
  
}