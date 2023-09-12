import React from "react";
import { useForm, SubmitHandler, } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { ErrorMessage } from "@hookform/error-message";
interface RegistrationFormProps {
  onClose: () => void;
}

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
  loading: boolean;
  register: {
    error: string | null;
  };
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({onClose}) => {
  const {
    handleSubmit,
    register,
    formState: { errors,isDirty, isValid },
  } = useForm<FormValues>({
    criteriaMode: "all",
  });
  const { error: registerError } = useSelector(
    (state: RegistrationState) => state.register
  );

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
  };

  return (
    <form className="registration-form" onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("firstName", {
          required: "FirstName is required.",
          pattern: {
            value: /^[a-zA-Z\s]*$/,
            message: "firstName must contain only characters",
          },
          minLength: {
            value: 2,
            message: "FirstName length must not be less than 2 characters.",
          },
          maxLength: {
            value: 25,
            message: "FirstName length must not be greater than 25 characters.",
          },
        })}
        placeholder="First Name"
        className="Fields"
      />
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
      <input
        {...register("lastName", {
          required: "LastName is required.",
          pattern: {
            value: /^[a-zA-Z\s]*$/,
            message: "LastName must contain only characters",
          },
          minLength: {
            value: 2,
            message: "LastName length must not be less than 2 characters.",
          },
          maxLength: {
            value: 25,
            message: "LastName length must not be greater than 25 characters.",
          },
        })}
        placeholder="Last Name"
        className="Fields"
      />
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
        {...register("photos", {
          required: "Photos are required",
          validate: {
            validFileType: (value) => {
              if (value && value.length > 0 && value[0].type) {
                const validTypes = ["image/jpeg", "image/png"];
                return (
                  validTypes.includes(value[0].type) || "Invalid file type"
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
            message: "Role length must not be greater than 25 characters.",
          },
        })}
        placeholder="Role"
        className="Fields"
      />
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
      <button type="submit" className="Fields" disabled={!isDirty || !isValid}>
        Register
      </button>

      {registerError && <p className="error">{registerError}</p>}
    </form>
  );
};

export default RegistrationForm;
