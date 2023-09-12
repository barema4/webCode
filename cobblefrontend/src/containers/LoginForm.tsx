import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { ErrorMessage } from "@hookform/error-message";
import { useNavigate } from "react-router-dom";
import "../Modal.css";

interface FormData {
  email: string;
  password: string;
}

interface responseState {
  status: {};
  loading: boolean;
  login: {
    error: string | null;
    status: number;
  };
}

const LoginForm: React.FC = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isDirty, isValid },
  } = useForm<FormData>({
    criteriaMode: "all",
  });

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { error, status } = useSelector((state: responseState) => state.login);

  if (status === 201) {
    navigate("/user-profile");
  }

  const onSubmit: SubmitHandler<FormData> = (data) => {
    dispatch({ type: "LOGIN_REQUEST", payload: data });
  };

  return (
    <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
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
      <input
        {...register("password", {
          required: "Password is required.",
          minLength: {
            value: 6,
            message: "Password length must not be less than 6 characters.",
          },
          maxLength: {
            value: 50,
            message: "Password length must not be greater than 50 characters.",
          },
          pattern: {
            value: /^(?=.*[0-9])/,
            message: "Password must contain atleast anumber",
          },
        })}
        type="password"
        placeholder="Password"
        className="Fields"
      />
      <ErrorMessage
        errors={errors}
        name="password"
        render={({ messages }) =>
          messages &&
          Object.entries(messages).map(([type, message]) => (
            <p key={type} className="error">
              {message}
            </p>
          ))
        }
      />
      <button type="submit" className="Fields">
        Login
      </button>

      {error && <p className="error">{error}</p>}
    </form>
  );
};

export default LoginForm;
