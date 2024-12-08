import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import "../css/App.css";

function Product() {
  return (
    <Container className="Container_product">
      {/* Second Hand Albums */}
      <Row>
        <Col
          style={{
            maskImage: "linear-gradient(to bottom, rgba(0, 0, 0, 1) 90%, rgba(0, 0, 0, 1) 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, rgba(0, 0, 0, 1) 90%, rgba(0, 0, 0, 1)",
            backgroundColor: "#1db954",
            border: "2px solid #1db954",
            padding: "10px 20px",
            marginBottom: "20px",
            borderRadius: "8px",
            textAlign: "center",
            fontSize: "18px",
            color: "white",
          }}
        >
          <p style={{ margin: "0", fontWeight: "bold" }}>Check out our Second Hand albums below!</p>
        </Col>
        <UsedAlbum />
      </Row>

      {/* Country Classics Section */}
      <Row>
        <div
          style={{
            backgroundColor: "#1db954",
            border: "2px solid #ddd",
            padding: "10px 20px",
            marginBottom: "20px",
            borderRadius: "8px",
            textAlign: "center",
            fontSize: "18px",
            color: "white",
          }}
        >
          <p style={{ margin: "0", fontWeight: "bold" }}>Check Out Our Country Classics</p>
        </div>
        <CountryClassics />
      </Row>

      {/* Film Soundtracks Section */}
      <Row>
        <div
          style={{
            backgroundColor: "#1db954",
            border: "2px solid #ddd",
            padding: "10px 20px",
            marginBottom: "20px",
            borderRadius: "8px",
            textAlign: "center",
            fontSize: "18px",
            color: "white",
          }}
        >
          <p style={{ margin: "0", fontWeight: "bold" }}>Our Favourite Film Soundtracks</p>
        </div>
        <FilmSoundtracks />
      </Row>
    </Container>
  );
}

function UsedAlbum() {
  const [albums, setAlbums] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://mwt-project-main-server.vercel.app/api/albums");
        const data = await response.json();
        if (data?.length) {
          setAlbums(data.slice(0, 8));
        }
      } catch (error) {
        console.error("Error fetching album data from MongoDB: ", error);
      }
    };

    fetchData();
  }, []);

  const handleAddToCart = (album) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(album);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${album.name} has been added to your cart!`);
  };

  const handleCardClick = (album) => {
    const albumName = encodeURIComponent(album.name);
    const artistName = encodeURIComponent(album.artist);
    navigate(`/product/${albumName}/${artistName}`);
  };

  return (
    <Row>
      {albums.length > 0 ? (
        albums.map((album, index) => (
          <Col key={index} xs={12} sm={6} md={4} lg={3} className="mb-4">
            <Card
              className="h-100 product"
              style={{ cursor: "pointer" }}
              onClick={() => handleCardClick(album)} 
            >
              <Card.Img
                variant="top"
                src={album?.imageLink || "default-placeholder.png"}
                alt={album.name}
                className="product_img"
              />
              <Card.Body>
                <Card.Title>{album.name}</Card.Title>
                <Card.Text>{album.artist}</Card.Text>
                <Card.Text>
                  <small>$</small>
                  <strong>{album.price || "9.99"}</strong>
                </Card.Text>
                <Card.Text>
                  <strong>Condition: </strong>
                  {album.conditionDescription || "Good"}
                </Card.Text>
                <Button
                  className="button"
                  onClick={(e) => {
                    e.stopPropagation(); 
                    handleAddToCart(album);
                  }}
                >
                  Add to cart
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </Row>
  );
}

function CountryClassics() {
  const [albums, setAlbums] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://mwt-project-main-server.vercel.app/api/albums");
        const data = await response.json();
        const countryAlbums = data.filter((album) =>
          ["I Walk the Line", "The Pressure Is On", "Willy and the Poor Boys", "Gunfighter Ballads and Trail Songs"].includes(album.name)
        );
        setAlbums(countryAlbums);
      } catch (error) {
        console.error("Error fetching country album data: ", error);
      }
    };

    fetchData();
  }, []);

  const handleCardClick = (album) => {
    const albumName = encodeURIComponent(album.name);
    const artistName = encodeURIComponent(album.artist);
    navigate(`/product/${albumName}/${artistName}`);
  };
  const handleAddToCart = (album) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(album);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${album.name} has been added to your cart!`);
  };

  return (
    <Row>
      {albums.length > 0 ? (
        albums.map((album, index) => (
          <Col key={index} xs={12} sm={6} md={4} lg={3} className="mb-4">
            <Card
              className="h-100 product"
              style={{ cursor: "pointer" }}
              onClick={() => handleCardClick(album)}
            >
              <Card.Img
                variant="top"
                src={album?.imageLink || "default-placeholder.png"}
                alt={album.name}
                className="product_img"
              />
              <Card.Body>
                <Card.Title>{album.name}</Card.Title>
                <Card.Text>{album.artist}</Card.Text>
                <Card.Text>
                  <small>$</small>
                  <strong>{album.price || "9.99"}</strong>
                </Card.Text>
                <Card.Text>
                  <strong>Condition: </strong>
                  {album.conditionDescription || "Good"}
                </Card.Text>
                <Button
                  className="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCart(album);
                  }}
                >
                  Add to cart
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </Row>
  );
}

function FilmSoundtracks() {
  const [albums, setAlbums] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://mwt-project-main-server.vercel.app/api/albums");
        const data = await response.json();
        const soundtrackAlbums = data.filter((album) =>
          ["The Boy and the Heron", "The Big Lebowski", "Fantastic Mr. Fox", "Taxi Driver"].includes(album.name)
        );
        setAlbums(soundtrackAlbums);
      } catch (error) {
        console.error("Error fetching film soundtrack data: ", error);
      }
    };

    fetchData();
  }, []);

  const handleCardClick = (album) => {
    const albumName = encodeURIComponent(album.name);
    const artistName = encodeURIComponent(album.artist);
    navigate(`/product/${albumName}/${artistName}`);
  };
  const handleAddToCart = (album) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(album);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${album.name} has been added to your cart!`);
  };
  return (
    <Row>
      {albums.length > 0 ? (
        albums.map((album, index) => (
          <Col key={index} xs={12} sm={6} md={4} lg={3} className="mb-4">
            <Card
              className="h-100 product"
              style={{ cursor: "pointer" }}
              onClick={() => handleCardClick(album)}
            >
              <Card.Img
                variant="top"
                src={album?.imageLink || "default-placeholder.png"}
                alt={album.name}
                className="product_img"
              />
              <Card.Body>
                <Card.Title>{album.name}</Card.Title>
                <Card.Text>{album.artist}</Card.Text>
                <Card.Text>
                  <small>$</small>
                  <strong>{album.price || "9.99"}</strong>
                </Card.Text>
                <Card.Text>
                  <strong>Condition: </strong>
                  {album.conditionDescription || "Good"}
                </Card.Text>
                <Button
                  className="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCart(album);
                  }}
                >
                  Add to cart
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </Row>
  );
}

export default Product;