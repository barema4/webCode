import React from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import "../Modal.css";

interface LoginFormProps {
  onClose: () => void;
}

interface FormData {
  email: string;
  password: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ onClose }) => {
  const { control, handleSubmit } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);

    onClose();
  };

  return (
    <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <input
            {...field}
            type="email"
            placeholder="Email"
            className="Fields"
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <input
            {...field}
            type="password"
            placeholder="Password"
            className="Fields"
          />
        )}
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
