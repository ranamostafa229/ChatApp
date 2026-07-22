import axios from "axios";
import { host } from "../utils/ApiRoutes";

const apiClient = axios.create({
  baseURL: host,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
