import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { ErrorMessage } from "@hookform/error-message";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  photos: FileList;
  password: string;
  role: string;
}

interface RegistrationState {
  formValues: FormValues;
  register: {
    error: string;
    registrationStatus: number;
    loading: boolean;
  };
}

const RegistrationForm: React.FC = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    criteriaMode: "all",
  });

  const [registerError, setRegisterError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const { error, registrationStatus, loading } = useSelector(
    (state: RegistrationState) => state.register
  );

  const displayErrorMessage = (message: string) => {
    setRegisterError(message);
    setTimeout(() => {
      setRegisterError("");
    }, 3000);
  };

  useEffect(() => {
    setIsLoading(loading);
  }, [loading]);

  useEffect(() => {
    displayErrorMessage(error);
  }, [error]);

  useEffect(() => {
    if (registrationStatus === 201) {
      enqueueSnackbar("Registration  successful!", { variant: "success" });
      navigate("/login");
    }
  }, [registrationStatus, navigate, enqueueSnackbar]);

  const dispatch = useDispatch();

  const onSubmit: SubmitHandler<FormValues> = async (user) => {
    const data: any = new FormData();
    data.append("firstName", user.firstName);
    data.append("lastName", user.lastName);
    data.append("email", user.email);
    data.append("password", user.password);
    data.append("role", user.role);

    await Promise.all(
      Array.from(user.photos).map(async (photo) => {
        data.append("photos", photo);
      })
    );

    dispatch({ type: "REGISTER_USER", payload: data });
    reset();
  };

  return (
    <div className="register">
      <div className="login-bound">
        <div>
          <h1>Create Your account</h1>
        </div>
        <form className="registration-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="login-fields">
            <label className="label">FirstName</label>
            <input
              {...register("firstName", {
                required: "FirstName is required.",
                pattern: {
                  value: /^[a-zA-Z\s]*$/,
                  message: "firstName must contain only characters",
                },
                minLength: {
                  value: 2,
                  message:
                    "FirstName length must not be less than 2 characters.",
                },
                maxLength: {
                  value: 25,
                  message:
                    "FirstName length must not be greater than 25 characters.",
                },
              })}
              placeholder="First Name"
              className="Fields"
            />
            <div className="error-message">
              <ErrorMessage
                errors={errors}
                name="firstName"
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
            <label className="label"> LastName</label>
            <input
              {...register("lastName", {
                required: "LastName is required.",
                pattern: {
                  value: /^[a-zA-Z\s]*$/,
                  message: "LastName must contain only characters",
                },
                minLength: {
                  value: 2,
                  message:
                    "LastName length must not be less than 2 characters.",
                },
                maxLength: {
                  value: 25,
                  message:
                    "LastName length must not be greater than 25 characters.",
                },
              })}
              placeholder="Last Name"
              className="Fields"
            />
            <div className="error-message">
              <ErrorMessage
                errors={errors}
                name="lastName"
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
            <label className="label">Photos</label>
            <input
              {...register("photos", {
                required: "Photos are required",
                validate: {
                  validFileType: (value) => {
                    if (value && value.length > 0 && value[0].type) {
                      const validTypes = ["image/jpeg", "image/png"];
                      return (
                        validTypes.includes(value[0].type) ||
                        "Invalid file type"
                      );
                    }
                    return;
                  },
                },
              })}
              type="file"
              accept=".jpg, .jpeg, .png"
              multiple
              className="Fields"
            />
            <div className="error-message">
              <ErrorMessage
                errors={errors}
                name="photos"
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
            <label className="label">Role</label>
            <input
              {...register("role", {
                required: "Role is required.",
                pattern: {
                  value: /^[a-zA-Z\s]*$/,
                  message: "Role must contain only characters",
                },
                minLength: {
                  value: 2,
                  message: "Role length must not be less than 2 characters.",
                },
                maxLength: {
                  value: 25,
                  message:
                    "Role length must not be greater than 25 characters.",
                },
              })}
              placeholder="Role"
              className="Fields"
            />
            <div className="error-message">
              <ErrorMessage
                errors={errors}
                name="role"
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
                minLength: {
                  value: 6,
                  message:
                    "Password length must not be less than 6 characters.",
                },
                maxLength: {
                  value: 50,
                  message:
                    "Password length must not be greater than 50 characters.",
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
            <div className="error-message">
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
            </div>
          </div>
          <button type="submit" className="btn" disabled={isLoading}>
            {isLoading ? <div className="spinner"></div> : " Register"}
          </button>

          <div className="account">
            <div>Already Have Account:</div>
            <div>
              <Link to="/login" className="register-link">
                Login
              </Link>
            </div>
          </div>
          {error && <p className="error">{registerError}</p>}
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
