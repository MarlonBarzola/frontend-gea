import http from "../http-common";

class LibraryDataService {
  getAll() {
    return http.get("/libraries");
  }

  get(id) {
    return http.get(`/libraries/${id}`);
  }

  create(data) {
    return http.post("/libraries", data);
  }

  update(id, data) {
    return http.put(`/libraries/${id}`, data);
  }

  delete(id) {
    return http.delete(`/libraries/${id}`);
  }

  /* deleteAll() {
    return http.delete(`/companies`);
  } */

  findByTitle(title) {
    return http.get(`/libraries/search/${title}`);
  }
}

export default new LibraryDataService();
