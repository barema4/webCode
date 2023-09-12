import React, {useState} from "react";
import Navbar from "./components/NavBar";
import FooterBar from "./components/FooterBar";
import { Routes, Route } from "react-router-dom";
import UserProfile from "./containers/UserProfile";


const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="App">
      <Navbar onClose={openModal} isModalOpen={isModalOpen} closeModal={closeModal}/>
      <Routes>
        <Route path="/user-profile" element={<UserProfile closeModal={closeModal}/>} />
      </Routes>
      <div className="middle-part"></div>
      <FooterBar />
    </div>
  );
};

export default App;
