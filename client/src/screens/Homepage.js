import React from "react";
import "../css/App.css";
import Product from "../components/Product";

function Homepage() {
  return (
    <>
      <Home />
    </>
  );
}

function Home() {
  return (
    <div className="home">
      <div>
        <img className="home_banner"
          src={require('.//banner.png')}
          alt=""
        />
        <Product/>
      </div>
    </div>
  );
}

export default Homepage;
