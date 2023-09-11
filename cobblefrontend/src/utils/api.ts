import axios from "axios";

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  photos: any;
  password: string;
  role: string;
}

const API_BASE_URL = "http://localhost:3000/";

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const register = (formData: FormValues) => {
  return api.post("/api/register", formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export default api;
