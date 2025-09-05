import axios from "axios";

const UserAPI = axios.create({
  baseURL: "http://localhost:8080/api/user", // adjust to your backend routes
});

export default UserAPI;