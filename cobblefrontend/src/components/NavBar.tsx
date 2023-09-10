import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";
import "../Modal.css";

const Navbar: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeRoute, setActiveRoute] = useState("register");

  const navigate = useNavigate();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

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
          openModal();
          handleTabClick("register");
        }}
      >
        Sign Up
      </div>

      {isModalOpen && <Modal onClose={closeModal} />}
    </div>
  );
};

export default Navbar;
