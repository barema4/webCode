import React from "react";
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import "../Modal.css";
import LoginPage from "./LoginPage";
import RegistrationPage from "./RegistrationPage";

interface ModalProps {
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ onClose }) => {
  const navigate = useNavigate();

  const handleClose = () => {
    onClose();
    navigate("/");
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <button className="modal-close" onClick={handleClose}>
          X
        </button>
        <nav className="nav-headers">
          <Link to="/register" style={{ textDecoration: "none" }}>
            Register
          </Link>
          <Link to="/login" style={{ textDecoration: "none" }}>
            Login
          </Link>
        </nav>
        <Routes>
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default Modal;
