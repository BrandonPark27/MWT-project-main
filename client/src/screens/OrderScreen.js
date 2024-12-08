import React, { useEffect, useState } from 'react';
import '../css/OrderScreen.css';
import { jwtDecode } from "jwt-decode"; 

const OrderScreen = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("authToken");

        if (!token) {
          console.error("No authentication token found.");
          setLoading(false);
          return;
        }

        const decodedToken = jwtDecode(token);
        const userId = decodedToken?.userId;

        if (!userId) {
          console.error("Invalid token: userId not found.");
          setLoading(false);
          return;
        }

        const response = await fetch(`https://mwt-project-main-server.vercel.app/api/orders`, {
          method: "GET",
          headers: { "Authorization": `Bearer ${token}` },
        });

        const data = await response.json();

        if (response.ok) {
          setOrders(data);
        } else {
          console.error("Failed to fetch orders:", data.message);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <div className="loading text-center">Loading Orders...</div>;
  }

  return (
    <div>
      <h1 className="my-4 text-center">Your Orders</h1>
      {orders.length > 0 ? (
        <div className="row">
          {orders.map((order) => (
            <div key={order._id} className="col-md-4 mb-4">
              <div className="card">
                <div className="card-body">
                  {order.product.map((prod) => (
                    <div key={prod._id} className="d-flex mb-3">
                      <img
                        src={prod.imageLink}
                        alt={prod.name}
                        style={{
                          width: "80px",
                          height: "80px",
                          borderRadius: "8px",
                          objectFit: "cover",
                        }}
                        className="mr-3"
                      />
                      <div>
                        <h5 className="card-title">{prod.name}</h5>
                        <p className="card-text">Artist: {prod.artist}</p>
                        <p className="card-text">Price: ${prod.price}</p>
                      </div>
                    </div>
                  ))}
                  <p><strong>Total Cost: ${order.totalCost}</strong></p>
                  <p>
                    <strong>Address:</strong> {order.address?.street}, {order.address?.city}, {order.address?.state}{" "}
                    {order.address?.postalCode}
                  </p>
                  <div className="order-meta">
                    <p><strong>Order Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center">No orders found.</p>
      )}
    </div>
  );
};

export default OrderScreen;
