import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "../css/App.css";

export default function ProductScreen() {
  const { albumName, artistName } = useParams(); 
  const [album, setAlbum] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAlbumDetails = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/albums");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Fetched data:", data);

        if (!Array.isArray(data)) {
          throw new Error("API returned data in an unexpected format.");
        }

        const foundAlbum = data.find(
          (item) =>
            item.name === decodeURIComponent(albumName) &&
            item.artist === decodeURIComponent(artistName)
        );

        if (foundAlbum) {
          setAlbum(foundAlbum);
        } else {
          console.error("Album not found.");
        }
      } catch (error) {
        console.error("Error fetching album details: ", error);
      }
    };

    fetchAlbumDetails();
  }, [albumName, artistName]);

  const handleAddToCart = () => {
    try {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      if (album) {
        cart.push(album);
        localStorage.setItem("cart", JSON.stringify(cart));
        alert(`${album.name} has been added to your cart!`);
      }
    } catch (error) {
      console.error("Error updating cart: ", error);
      alert("Failed to add the album to your cart.");
    }
  };

  if (!album) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px", color: "#00ff00" }}>
        <p>Loading album details...</p>
      </div>
    );
  }

  return (
    <div className="product-screen" style={{ textAlign: "center", padding: "20px" }}>
      <div className="product-card" style={{
        background: "#111",
        borderRadius: "10px",
        padding: "20px",
        maxWidth: "800px",
        margin: "0 auto",
        boxShadow: "0px 0px 15px 5px rgba(0, 255, 0, 0.2)",
        color: "#fff",
      }}>
        <div className="product-details" style={{ display: "flex", justifyContent: "space-between" }}>
          <div className="product-image" style={{ flex: "1", marginRight: "20px" }}>
            <img
              src={album.imageLink || "default-placeholder.png"}
              alt={album.name || "Album Image"}
              style={{
                width: "100%",
                maxWidth: "300px",
                borderRadius: "10px",
                border: "3px solid #00ff00",
                boxShadow: "0px 0px 10px 3px rgba(0, 255, 0, 0.5)",
              }}
            />
          </div>

          <div className="product-info" style={{ flex: "2", textAlign: "left" }}>
            <h2 style={{ color: "#00ff00" }}>{album.name}</h2>
            <p><strong>Artist:</strong> {album.artist}</p>
            <p><strong>Description:</strong> No description available.</p>
            <p><strong>Price:</strong> ${album.price?.toFixed(2) || "N/A"}</p>
            <p><strong>Genres:</strong> {album.genres?.join(", ") || "Unknown"}</p>
            <p><strong>Number of Songs:</strong> {album.numOfSongs || "N/A"}</p>
            <p><strong>Listening Time:</strong> {album.listenTime ? (album.listenTime / 60).toFixed(2) : "N/A"} minutes</p>

            <div className="buttons" style={{ display: "flex", marginTop: "20px" }}>
              <Button
                onClick={() => navigate(-1)}
                style={{
                  background: "#333",
                  color: "#fff",
                  border: "1px solid #00ff00",
                  marginRight: "10px",
                }}
              >
                Go Back
              </Button>
              <Button
                onClick={handleAddToCart}
                style={{
                  background: "#00ff00",
                  color: "#111",
                  border: "1px solid #00ff00",
                }}
              >
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
