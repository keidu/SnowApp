import axios from "axios";

export default class FilesService {
  constructor() {
    this._service = axios.create({
      baseURL: process.env.REACT_APP_URL,
      withCredentials: true
    });
  }

  handleUpload = theFile => this._service.post("/files/upload", theFile);
}
