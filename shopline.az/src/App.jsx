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
import Admin from "./Admin/Admin.jsx";
import Login from "./Pages/Login/Login.jsx";
import Register from "./Pages/Register/Register.jsx";
import ProductDetail from "./Pages/Products/ProductDetail.jsx";
import Profile from "./Pages/Profile/Profile.jsx";
import AdminLogin from "./Admin/AdminLogin.jsx";
import AdminDashboard from "./Admin/AdminDashboard.jsx";

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
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
