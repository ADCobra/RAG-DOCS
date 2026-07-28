import Axios from "axios";

const axios = Axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/v1`,
  withCredentials: true,
});

export default axios;