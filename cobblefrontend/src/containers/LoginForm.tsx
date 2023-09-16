import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { ErrorMessage } from "@hookform/error-message";
import { Link, useNavigate } from "react-router-dom";
import { resetRegistrationState } from "../store/registrationSlice";
import "../assets/Modal.css";

interface FormData {
  email: string;
  password: string;
}

interface responseState {
  status: {};
  loading: boolean;
  login: {
    error: string;
    status: number;
  };
}

const LoginForm: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState("");

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    criteriaMode: "all",
  });

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { error, status } = useSelector((state: responseState) => state.login);

  const displayErrorMessage = (message: string) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage("");
    }, 3000);
  };

  const handleLoginClick = () => {
    dispatch(resetRegistrationState());
  };

  useEffect(() => {
    displayErrorMessage(error);
  }, [error]);

  useEffect(() => {
    if (status === 201) {
      navigate("/user-profile");
    }
  }, [navigate, status]);

  const onSubmit: SubmitHandler<FormData> = (data) => {
    dispatch({ type: "LOGIN_REQUEST", payload: data });
  };

  return (
    <div className="login">
      <div className="login-bound">
        <div className="heading">
          <h1>Welcome back</h1>
          <p>Please Enter Your details</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="login-form">
            <div className="login-fields">
              <label className="label">Email</label>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
                    message: "Please enter a valid email",
                  },
                })}
                type="email"
                placeholder="Email"
                className="Fields"
              />
              <div className="error-message">
              <ErrorMessage
              errors={errors}
              name="email"
              render={({ messages }) =>
                messages &&
                Object.entries(messages).map(([type, message]) => (
                  <p key={type} className="error">
                    {message}
                  </p>
                ))
              }
            />

              </div>
             
            </div>

            

            <div className="login-fields">
              <label className="label">Password</label>
              <input
                {...register("password", {
                  required: "Password is required.",
                })}
                type="password"
                placeholder="Password"
                className="Fields"
              />
              <div className="error-message">
              <ErrorMessage
                  errors={errors}
                  name="password"
                  render={({ messages }) =>
                    messages &&
                    Object.entries(messages).map(([type, message]) => (
                      <p key={type} className="field-error">
                        {message}
                      </p>
                    ))
                  }
                />

              </div>
                
            </div>

            <button type="submit" className="btn">
              Login
            </button>
            {error && <p className="error">{errorMessage}</p>}
          </div>
          <div className="account">
            <div>Don't have account:</div>
            <div>
              <Link
                to="/register"
                onClick={handleLoginClick}
                className="register-link"
              >
                Register
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
