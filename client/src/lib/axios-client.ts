import { CustomerError } from "@/types/customer-error.type";
import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL;

const options = {
  baseURL,
  withCredentials: true,
  timeout: 10000,
};

const API = axios.create(options);

API.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const { data, status } = error.response;

    if (data === "Unauthorized" && status === 401) {
      window.location.href = "/";
    }

    const customerError: CustomerError = {
      ...error,
      errroCode: data?.errorCode || "UNKNOWN_ERROR",
    };
    return Promise.reject(customerError);
  }
);

export default API;
