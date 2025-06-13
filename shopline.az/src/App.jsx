import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import OneSection from "./components/OneSection";
import OurServices from "./components/OurServices";
import Reviews from "./components/Reviews";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";


import About from "./Pages/About/About.jsx";
import Contact from "./Pages/Contact/Contact.jsx";
import Products from "./Pages/Products/Products.jsx";
import Admin from "./Pages/Admin.jsx";
import Login from "./Pages/Login.jsx";
import Register from "./Pages/Register.jsx";
import ProductDetail from "./Pages/Products/ProductDetail.jsx"; 

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
       
        <Route
          path="/"
          element={
            <>
              <Hero />
              <OneSection />
              <OurServices />
              <Reviews />
              <ContactSection />
            </>
          }
        />

        
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetail />} /> {/* Yeni detal səhifəsi */}
        <Route path="/admin" element={<Admin />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
