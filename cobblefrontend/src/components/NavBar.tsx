import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/Modal.css";

interface NavigationProps {
  isLoggedIn: boolean;
  onLogout: () => void;
}

const Navbar: React.FC<NavigationProps> = ({ isLoggedIn, onLogout }) => {
  const navigate = useNavigate();

  const handleTabClick = () => {
    navigate("/login");
  };

  return (
    <div className="navbar">
      <div>WELCOME TO COBBLEWEB</div>
      {isLoggedIn ? (
        <div className="button" onClick={onLogout}>
          Logout
        </div>
      ) : (
        <div className="button" onClick={handleTabClick}>
          Login
        </div>
      )}
    </div>
  );
};

export default Navbar;
