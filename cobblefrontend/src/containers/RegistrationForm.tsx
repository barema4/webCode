import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch} from 'react-redux';
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

const RegistrationForm: React.FC<RegistrationFormProps> = ({ onClose }) => {
  const { handleSubmit, register } = useForm<FormValues>();
  const dispatch = useDispatch();
  const onSubmit: SubmitHandler<FormValues> = async (user) => {
    console.log("user ", user)
    const data: any = new FormData();
    data.append('firstName', user.firstName);
    data.append('lastName', user.lastName);
    data.append('email', user.email);
    data.append('password', user.password);
    data.append('role', user.role )
     
    for (let i = 0; i < user.photos.length; i++) {
      data.append('photos', user.photos[i]);
    }

    dispatch({ type: 'REGISTER_USER', payload: data })
  };

  return (
    <form className="registration-form" onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("firstName")}
        placeholder="First Name"
        className="Fields"
      />
      <input
        {...register("lastName")}
        placeholder="Last Name"
        className="Fields"
      />
      <input
        {...register("email")}
        type="email"
        placeholder="Email"
        className="Fields"
      />
      <input {...register("photos")} type="file" multiple className="Fields" />
      <input {...register("role")} placeholder="Role" className="Fields" />
      <input
        {...register("password")}
        type="password"
        placeholder="Password"
        className="Fields"
      />

      <button type="submit" className="Fields">
        Register
      </button>
    </form>
  );
};

export default RegistrationForm;
