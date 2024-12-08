import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../css/placedOrder.css'; 

function PlacedOrder() {
  const { id } = useParams();
  const [order, setOrder] = useState(null); // Initialize as null
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/orders/${id}`);
        const data = await response.json();

        if (response.ok) {
          setOrder(data);
        } else {
          console.error("Failed to fetch order:", data.message);
        }
      } catch (error) {
        console.error("Error fetching order:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (loading) {
    return <p>Loading order...</p>;
  }

  if (!order) {
    return <p>No order data available.</p>;
  }

  const { _id, product = [], totalCost, date, address = {} } = order;

  return (
    <div className="receipt-page">
      <h1 className="title">Order Receipt</h1>
      <div className="receipt-container">
        <p><strong>Order ID:</strong> {_id}</p>
        <p><strong>Order Date:</strong> {new Date(date).toLocaleDateString()}</p>
        
        <h2>Products</h2>
        <div className="product-list">
          {product.map((prod) => (
            <div key={prod.id} className="product-item">
              <img
                src={prod.imageLink}
                alt={prod.name}
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '8px',
                  objectFit: 'cover',
                  marginRight: '15px',
                }}
              />
              <div className="product-details">
                <p >{prod.name}</p>
                <p >Artist: {prod.artist}</p>
                <p >Price: ${prod.price.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>

        <h2>Shipping Address</h2>
        <p>
          {address.street}, {address.city}, {address.state}, {address.postalCode}, {address.country}
        </p>

        <h2>Total Cost</h2>
        <p><strong>${totalCost.toFixed(2)}</strong></p>
      </div>
    </div>
  );
}

export default PlacedOrder;
