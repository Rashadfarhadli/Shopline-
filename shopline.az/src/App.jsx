import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import OneSection from "./components/OneSection.jsx";
import OurServices from "./components/OurServices.jsx";
import Reviews from "./components/Reviews.jsx";
import ContactSection from "./components/ContactSection.jsx";
import Footer from "./components/Footer.jsx";

import About from "./Pages/About/About.jsx";
import Contact from "./Pages/Contact/Contact.jsx";
import Products from "./Pages/Products/Products.jsx";
import Login from "./Pages/Login/Login.jsx";
import Register from "./Pages/Register/Register.jsx";
import ProductDetail from "./Pages/Products/ProductDetail.jsx";
import Profile from "./Pages/Profile/Profile.jsx";
import AdminLogin from "./Admin/AdminLogin.jsx";
import AdminDashboard from "./Admin/AdminDashboard.jsx"; 

function LayoutWrapper() {
  const location = useLocation();

  const isAdminPage = location.pathname.startsWith("/admin/dashboard");

  return (
    <>
      {!isAdminPage && <Navbar />}

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
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>

      {!isAdminPage && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <Router>
      <LayoutWrapper />
    </Router>
  );
}
