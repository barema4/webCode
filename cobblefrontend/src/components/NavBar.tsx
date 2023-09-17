import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {resetLoginState} from '../store/loginSlice'
import "../assets/Modal.css";

interface NavigationProps {
  isLoggedIn: boolean;
  onLogout: () => void;
}

const Navbar: React.FC<NavigationProps> = ({ isLoggedIn, onLogout }) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleLoginClick = () => {
    dispatch(resetLoginState());
  };
  const handleTabClick = () => {
    handleLoginClick()
    navigate("/login");
  };

  return (
    <div className="navbar">
      <div className="nav-title">WELCOME TO COBBLEWEB</div>
      {isLoggedIn ? (
        <div className="nav-title" onClick={onLogout}>
          Logout
        </div>
      ) : (
        <div className="nav-title" onClick={handleTabClick}>
          Login
        </div>
      )}
    </div>
  );
};

export default Navbar;
