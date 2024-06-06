import axios from "axios";
import { BACKEND_URL } from "../../config";

export const CustomAxiosFormData = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});
export const CustomAxiosJson = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    "Content-type": "application/json",
  },
});
