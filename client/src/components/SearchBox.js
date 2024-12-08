import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Dropdown from "react-bootstrap/Dropdown";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import "../css/App.css";

export default function SearchBox() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const fetchSuggestions = async (searchTerm) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/albums?query=${encodeURIComponent(searchTerm)}`
      );
      const data = await response.json();
      setSuggestions(data.slice(0, 5));
    } catch (err) {
      console.error("Error fetching suggestions:", err);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (value.trim() !== "") {
      fetchSuggestions(value);
    } else {
      setSuggestions([]);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    navigate(query ? `/search/?query=${query}` : "/search");
  };

  return (
    <Form
      className="d-flex me-auto header_search position-relative"
      onSubmit={submitHandler}
    >
      <InputGroup>
        <FormControl
          type="text"
          name="q"
          id="q"
          value={query}
          onChange={handleInputChange}
          placeholder="Search by album or genre..."
          aria-label="Search Products"
          aria-describedby="button-search"
        />
        <Button
          className="header_search_Icon"
          variant="outline-primary"
          type="submit"
          id="button-search"
        >
          <SearchIcon />
        </Button>
      </InputGroup>
      {suggestions.length > 0 && (
        <Dropdown.Menu show className="w-100">
          {suggestions.map((item, index) => (
            <Dropdown.Item
              key={index}
              onClick={() => navigate(`/product/${item.name}/${item.artist}`)}
            >
              {item.name} by {item.artist}{" "}
              {item.genre && (
                <span style={{ fontStyle: "italic", color: "#6c757d" }}>
                  ({item.genre.join(", ")})
                </span>
              )}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      )}
    </Form>
  );
}
