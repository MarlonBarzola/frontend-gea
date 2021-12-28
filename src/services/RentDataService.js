import http from "../http-common";

class RentDataService {
  create(data) {
    return http.post("/rents", data);
  }
  get(user) {
    return http.get(`/rents/${user}`);
  }
}

export default new RentDataService();