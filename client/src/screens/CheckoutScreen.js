import React, { useState, useEffect } from 'react';
import {jwtDecode}from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const CheckoutScreen = () => {
  const [address, setAddress] = useState({
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
  });
  const [cartItems, setCartItems] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); 

  useEffect(() => {
    
    const storedCartItems = JSON.parse(localStorage.getItem('cart')) || [];
    console.log(storedCartItems)
    const storedTotalCost = parseFloat(localStorage.getItem('total')) || 0;

    

    setCartItems(storedCartItems);
    setTotalCost(storedTotalCost);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({ ...prevAddress, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Prepare product data
    const products = cartItems.map((item) => ({
      id: item._id,
      name: item.name,
      price: item.price,
      artist: item.artist,
      imageLink: item.imageLink,
    }));
  
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setErrorMessage("You must be logged in to place the order.");
        return;
      }
  
      const decodedToken = jwtDecode(token);
      const userId = decodedToken?.userId;
  
      // Send the order to the server
      const response = await fetch('http://localhost:5000/api/orders/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          address,
          product: products, // Pass the products array
          totalCost,
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Failed to place the order.');
        return;
      }
  
      const data = await response.json();
      console.log('Order created:', data);
      navigate(`/order/${data._id}`); 
    } catch (error) {
      console.error('Checkout Error:', error);
      setErrorMessage('Failed to place the order.');
    }
  };
  

  return (
    <div
      style={{
        backgroundColor: '#121212',
        color: '#FFFFFF',
        fontFamily: 'Circular, Helvetica, Arial, sans-serif',
        padding: '20px',
        maxWidth: '600px',
        margin: '0 auto',
      }}
    >
      <h1 style={{ fontSize: '24px', marginBottom: '20px' }}>Checkout</h1>

      {errorMessage && (
        <div style={{ color: 'red', marginBottom: '20px' }}>{errorMessage}</div>
      )}

      <form onSubmit={handleSubmit}>
        <h2 style={{ fontSize: '20px', marginBottom: '10px' }}>Address</h2>
        <div style={{ marginBottom: '15px' }}>
          <label>Street:</label>
          <input
            type="text"
            name="street"
            value={address.street}
            onChange={handleInputChange}
            required
            style={{
              backgroundColor: '#282828',
              border: 'none',
              color: '#FFF',
              padding: '10px',
              width: '100%',
              borderRadius: '5px',
              marginTop: '5px',
            }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>City:</label>
          <input
            type="text"
            name="city"
            value={address.city}
            onChange={handleInputChange}
            required
            style={{
              backgroundColor: '#282828',
              border: 'none',
              color: '#FFF',
              padding: '10px',
              width: '100%',
              borderRadius: '5px',
              marginTop: '5px',
            }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>State:</label>
          <input
            type="text"
            name="state"
            value={address.state}
            onChange={handleInputChange}
            required
            style={{
              backgroundColor: '#282828',
              border: 'none',
              color: '#FFF',
              padding: '10px',
              width: '100%',
              borderRadius: '5px',
              marginTop: '5px',
            }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>Postal Code:</label>
          <input
            type="text"
            name="postalCode"
            value={address.postalCode}
            onChange={handleInputChange}
            required
            style={{
              backgroundColor: '#282828',
              border: 'none',
              color: '#FFF',
              padding: '10px',
              width: '100%',
              borderRadius: '5px',
              marginTop: '5px',
            }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>Country:</label>
          <input
            type="text"
            name="country"
            value={address.country}
            onChange={handleInputChange}
            required
            style={{
              backgroundColor: '#282828',
              border: 'none',
              color: '#FFF',
              padding: '10px',
              width: '100%',
              borderRadius: '5px',
              marginTop: '5px',
            }}
          />
        </div>
        <button
          type="submit"
          style={{
            backgroundColor: '#1DB954',
            border: 'none',
            color: '#FFF',
            padding: '10px 20px',
            borderRadius: '50px',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          Place Order
        </button>
      </form>

      <h2 style={{ fontSize: '20px', margin: '20px 0 10px' }}>Cart Items</h2>
      {cartItems.length > 0 ? (
        <ul>
          {cartItems.map((item, index) => (
            <li key={index} style={{ marginBottom: '10px' }}>
              {item.name} - ${item.price} x {item.quantity}
            </li>
          ))}
        </ul>
      ) : (
        <p>Your cart is empty.</p>
      )}

      <h3 style={{ fontSize: '18px', marginTop: '20px' }}>
        Total Cost: ${totalCost.toFixed(2)}
      </h3>
    </div>
  );
};

export default CheckoutScreen;
