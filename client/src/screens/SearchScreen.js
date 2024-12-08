import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';
import '../css/searchscreen.css';

export default function SearchScreen() {
  const { search } = useLocation();
  const query = new URLSearchParams(search).get('query') || '';
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/albums?query=${encodeURIComponent(query)}`);
        const data = await response.json();
        setResults(data);
      } catch (err) {
        console.error("Error fetching search results:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  if (loading) {
    return <Container><p>Loading...</p></Container>;
  }

  if (results.length === 0) {
    return <Container><p>No results found for "{query}"</p></Container>;
  }

  return (
    <Container className="search-results-container">
      <h3 className="search-results-title">Search Results for "{query}"</h3>
      <Row>
        {results.map((album, index) => (
          <Col key={index} md={4} className="mb-3">
            <Card
              className="album-card"
              onClick={() => window.location.href = `/product/${encodeURIComponent(album.name)}/${encodeURIComponent(album.artist)}`}
              style={{ cursor: 'pointer' }}
            >
              <Card.Img variant="top" src={album.imageLink || 'default-placeholder.png'} className="album-card-img"/>
              <Card.Body className="album-card-body">
                <Card.Title className="album-card-title">{album.name}</Card.Title>
                <Card.Text className="album-card-artist">{album.artist}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
