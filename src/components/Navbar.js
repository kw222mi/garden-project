import { useNavigate, useLocation } from "react-router-dom";
import React, { useState } from 'react'
import './navbar.css'

export default function Navbar () {

    const routes = [
        {
          id: 1,
          name: "Home",
          path: "/",
        },
        {
          id: 2,
          name: "Todo",
          path: "/todo",
        },
        
      
      ];
      
      const nav = useNavigate();
    
      const location = useLocation();
    
      const [isMenuOpen, setIsMenuOpen] = useState(false);
    
      const handleClick = (path) => {
        nav(path);
        setIsMenuOpen(false); //Close menu when a link is clicked
      };
      const isActive = (path) => {
        if (path === "/") {
          return location.pathname === path;
        } else {
          return location.pathname.startsWith(path);
        }
      };

      return (
        <div className="navbar-container">
        
          <div className={`navbar-links ${isMenuOpen ? "active" : ""}`}>
            <ul>
              {routes.map((route) => (
                <li key={route.id} className={isActive(route.path) ? "active" : ""} id="nav-li" onClick={() => handleClick(route.path)}>
                  {route.name}
                </li>
              ))}
            </ul>
            <button
              className="hamburger-menu"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
    )
}



