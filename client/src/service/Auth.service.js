import axios from "axios";

export default class Services {
  constructor() {
    this._service = axios.create({
      baseURL: process.env.REACT_APP_URL,
      withCredentials: true
    });
  }

  signup = user => this._service.post("/auth/signup", { user });

  editUser = user => this._service.post("/auth/editUser", { user });

  login = (username, password) =>
    this._service.post("/auth/login", { username, password });

  loggedin = () => this._service.get("/auth/loggedin");

  logout = () => this._service.post("/auth/logout");

  viewProfile = id => this._service.get(`/auth/view/${id}`);
}
