import React from "react";
import Homepage from "./screens/Homepage";
import ProductScreen from "./screens/ProductScreen";
import Header from "./screens/Header";
import CartScreen from "./screens/CartScreen";
import SearchScreen from "./screens/SearchScreen";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profile from "./screens/Profile";
import ResetPassword from "./screens/ResetPasswrd";
import SignUpOut from "./screens/Signup";
import Payment from "./screens/Payment";
import OrderScreen from "./screens/OrderScreen";
import CheckoutScreen from "./screens/CheckoutScreen";
import PlacedOrder from "./screens/placedOrder";


function App() {
  return (
    <>
      <BrowserRouter>
      <header>
        <Header/>
      </header>
      
        <div className="d-flex flex-column site-container">
        
        <main>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/product/:albumName/:artistName" element={<ProductScreen />} />
          <Route path="/cart" element={<CartScreen />} />
          <Route path="/search" element={<SearchScreen />} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/reset-password" element={<ResetPassword/>}/>
          <Route path="/Sign-up" element={<SignUpOut/>}/>
          <Route path="/cart" element={<Payment />} />
          <Route path="/Order" element={<OrderScreen/>} />
          <Route path="/checkout" element={<CheckoutScreen/>} />
          <Route path="/order/:id" element={<PlacedOrder/>} />
          <Route path="/search" element={<SearchScreen />} />

        </Routes>
        </main>
        <footer>
          
          <div className="text-center">All rights reserved</div>
        </footer>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
