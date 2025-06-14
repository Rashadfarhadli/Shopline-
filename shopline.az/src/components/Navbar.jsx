import React, { useState, useEffect } from "react";
import Logo from "./Logo";
import NavLinks from "./NavLinks";
import AuthButtons from "./AuthButtons";
import HamburgerButton from "./HamburgerButton";
import MobileMenu from "./MobileMenu";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    const userFromStorage = localStorage.getItem("user");
    if (userFromStorage) {
      try {
        const parsedUser = JSON.parse(userFromStorage);
        setCurrentUser(parsedUser);
      } catch (e) {
        console.error("User JSON formatı yanlışdır:", e);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setCurrentUser(null);
    navigate("/login"); 
  };

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
            {currentUser ? (
              <>
                <Link to="/profile">
                  <img
                    src={currentUser.profileImage || "/default-avatar.png"}
                    alt="Profil"
                    className="w-10 h-10 rounded-full object-cover border"
                  />
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-1 border border-gray-400 rounded hover:bg-gray-100 text-sm"
                >
                 Log out
                </button>
              </>
            ) : (
              <AuthButtons />
            )}
          </div>

        
          <HamburgerButton isOpen={isOpen} toggle={toggleMenu} />
        </div>
      </div>

    
      <MobileMenu isOpen={isOpen} closeMenu={closeMenu} />
    </nav>
  );
}
