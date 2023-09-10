import React from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";

interface RegistrationFormProps {
  onClose: () => void;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role:string;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ onClose }) => {
  const { control, handleSubmit } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
    onClose();
  };

  return (
    <form className="registration-form" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="firstName"
        control={control}
        render={({ field }) => <input {...field} placeholder="First Name" className="Fields" />}
      />
      <Controller
        name="lastName"
        control={control}
        render={({ field }) => <input {...field} placeholder="Last Name"  className="Fields"/>}
      />
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <input {...field} type="email" placeholder="Email" className="Fields" />
        )}
      />
       <Controller
        name="role"
        control={control}
        render={({ field }) => (
          <input {...field}  placeholder="Role" className="Fields" />
        )}
      />
      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <input {...field} type="password" placeholder="Password" className="Fields"/>
        )}
      />
      <button type="submit" className="Fields">Register</button>
    </form>
  );
};

export default RegistrationForm;
