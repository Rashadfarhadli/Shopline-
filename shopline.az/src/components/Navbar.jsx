import React, { useState } from "react";
import Logo from "./Logo";
import NavLinks from "./NavLinks";
import AuthButtons from "./AuthButtons";
import HamburgerButton from "./HamburgerButton";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
        
          <div className="flex-shrink-0 flex items-center">
            <Logo />
          </div>

         
          <div className="hidden md:flex space-x-8">
            <NavLinks />
          </div>

        
          <div className="hidden md:flex items-center space-x-4">
            <AuthButtons />
          </div>

         
          <HamburgerButton isOpen={isOpen} toggle={toggleMenu} />
        </div>
      </div>

    
      <MobileMenu isOpen={isOpen} closeMenu={closeMenu} />
    </nav>
  );
}
