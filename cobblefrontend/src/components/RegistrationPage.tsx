import React from "react";
import RegistrationForm from "../containers/RegistrationForm";

const RegisterPage: React.FC = () => {
  return (
    <div>
      <h2>Register</h2>
      <RegistrationForm onClose={() => {}} />
    </div>
  );
};

export default RegisterPage;
