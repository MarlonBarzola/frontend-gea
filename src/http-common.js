import axios from "axios";

export default axios.create({
  baseURL: "http://gea-api.test/api",
  headers: {
    "Content-type": "application/json"
  }
});
