import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import WhyChoose from "./components/OneSection"; 
import OurServices from "./components/OurServices";
import Reviews from "./components/Reviews";
import ContactSection from "./components/ContactSection";


import About from "./Pages/About/About.jsx";
import Contact from "./Pages/./Contact/Contact.jsx";
import Products from "./Pages/Products/Products.jsx";
import Admin from "./Pages/Admin.jsx";
import Login from "./Pages/Login.jsx";
import Register from "./Pages/Register.jsx";
import OneSection from "./components/OneSection";
import Footer from "./components/Footer.jsx";

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
              < OneSection />
              <OurServices />
              <Reviews />
              <ContactSection />
              < Footer />
            </>
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/products" element={<Products />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
