import React from "react";
import { Link } from "react-router-dom";

export const SuccessPage = () => {
  return (
    <div className="success-page">
      <h1>Successfully Registered</h1>
      <p>Please click on the link below to sign</p>

      <div>
        <div>
          <Link to="/login" className="success">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};
