import axios from "axios";

export const axiosInstanse = axios.create({
  baseURL: "http://localhost:3001/api/",
});
