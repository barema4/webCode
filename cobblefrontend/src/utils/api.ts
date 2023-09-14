import axios from "axios";
interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  photos: FileList;
  password: string;
  role: string;
}

interface LoginValues {
  email: string;
  password: string;
}


const API_BASE_URL = "http://localhost:3000/";

const api = axios.create({
  baseURL: API_BASE_URL,
});

const getAuthToken = () => {
    const token = localStorage.getItem('token');
    return `Bearer ${token}`;
  };


export const register = (formData: FormValues) => {
  return api.post("/api/register", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const login = (loginData: LoginValues) => {
  return api.post("/api/login", loginData);
};

export const getUser = () => {
    return api.get("/api/user/me", {
        headers: {
          Authorization: getAuthToken(),
        },
      });
  };

export default api;
