import React from "react";
import LoginForm from "../containers/LoginForm";

const LoginPage: React.FC = () => {
  return (
    <div>
      <h2>Login</h2>
      <LoginForm onClose={() => {}} />
    </div>
  );
};

export default LoginPage;