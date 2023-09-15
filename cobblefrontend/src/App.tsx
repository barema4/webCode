import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import{resetProfileState} from '../src/store/userSlice'
import Navbar from "./components/NavBar";
import FooterBar from "./components/FooterBar";
import { Routes, Route } from "react-router-dom";
import UserProfile from "./containers/UserProfile";
import RegistrationForm from "./containers/RegistrationForm";
import LoginForm from "./containers/LoginForm";
import Home from "./components/Home";

const App: React.FC = () => {
  const { isLoggedIn } = useSelector((state: any) => state.login);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleProfileClick = () => {
    dispatch(resetProfileState());
  };

  const onLogout = () => {
    handleProfileClick()
    dispatch({ type: "LOGOUT_REQUEST" });
    navigate("/");
  };

  return (
    <div className="App">

      <Navbar isLoggedIn={isLoggedIn} onLogout={onLogout} />
      <div className="middle-part">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/user-profile" element={<UserProfile />} />
        </Routes>
      </div>
      <FooterBar />
    </div>
  );
};

export default App;
