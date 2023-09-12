import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { ErrorMessage } from "@hookform/error-message";
import "../Modal.css";

interface LoginFormProps {
  onClose: () => void;
}

interface FormData {
  email: string;
  password: string;
}

interface responseState {
  token: {};
  loading: boolean;
  login: {
    error: string | null;
  };
}

const LoginForm: React.FC<LoginFormProps> = ({ onClose }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    criteriaMode: "all",
  });

  const dispatch = useDispatch();

  const { error: loginError } = useSelector(
    (state: responseState) => state.login
  );

  const onSubmit: SubmitHandler<FormData> = (data) => {
    dispatch({ type: "LOGIN_REQUEST", payload: data });

    onClose();
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

      {loginError && <p className="error">{loginError}</p>}
    </form>
  );
};

export default LoginForm;
