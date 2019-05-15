import axios from "axios";

export default class Service {
  getRequest(method, url) {
    switch (method) {
      case "GET":
        return axios.get(url);
      case "POST":
        return axios.post(url);
    }
    return axios.get(url);
  }
}
