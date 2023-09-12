import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";
import "../Modal.css";

interface NavigationProps {
  onClose: () => void;
  isModalOpen: boolean;
  closeModal: () => void;
}
const Navbar: React.FC<NavigationProps> = ({
  onClose,
  isModalOpen,
  closeModal,
}) => {
  const [activeRoute, setActiveRoute] = useState("register");

  const navigate = useNavigate();

  const handleTabClick = (route: string) => {
    setActiveRoute(route);
    navigate(`/${route}`);
  };

  return (
    <div className="navbar">
      <div>WELCOME TO COBBLEWEB</div>

      <div
        className="button"
        onClick={() => {
          onClose();
          handleTabClick("register");
        }}
      >
        Sign Up
      </div>

      {isModalOpen && <Modal onClose={onClose} onCloseModal={closeModal} />}
    </div>
  );
};

export default Navbar;
