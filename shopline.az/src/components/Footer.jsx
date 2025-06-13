import React from "react";
import { FaFacebookF, FaGithub, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-indigo-900 text-white py-12 px-6 ">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
     
        <div>
          <h2 className="text-2xl font-bold mb-4">SHOPLINE</h2>
          <p>
            Your trusted online marketplace for everyday essentials. <br />
            Quality products, great prices, fast delivery.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-1">
            <li><a href="/" className="hover:text-indigo-300">Home</a></li>
            <li><a href="/about" className="hover:text-indigo-300">About</a></li>
            <li><a href="/products" className="hover:text-indigo-300">Products</a></li>
            <li><a href="/contact" className="hover:text-indigo-300">Contact</a></li>
          </ul>
        </div>

     
        <div>
          <h3 className="text-xl font-semibold mb-3">Categories</h3>
          <ul className="space-y-1">
            <li>Beverages</li>
            <li>Snacks</li>
            <li>Dairy Products</li>
            <li>Hygiene Products</li>
            <li>Candy</li>
          </ul>
        </div>
      </div>

 
      <div className="max-w-6xl mx-auto mt-10 border-t border-indigo-700 pt-8 flex flex-col md:flex-row justify-between items-center">
        <div className="text-center md:text-left mb-4 md:mb-0">
          <p>www.Shopline.com</p>
          <p>+994 (051) 726-89-34</p>
          <p>28 may/m Nizami küç , 114B</p>
        </div>

      
        <div className="flex space-x-6 text-2xl">
          <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-indigo-300">
            <FaFacebookF />
          </a>
          <a href="https://github.com/Rashadfarhadli" target="_blank" rel="noreferrer" className="hover:text-indigo-300">
            <FaGithub />
          </a>
          <a href="https://www.instagram.com/rashadveb?igsh=M3c4dnhzbjUyOWtu" target="_blank" rel="noreferrer" className="hover:text-indigo-300">
            <FaInstagram />
          </a>
        </div>
      </div>
    </footer>
  );
}
