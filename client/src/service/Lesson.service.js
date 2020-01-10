import axios from "axios";

export default class Services {
  constructor() {
    this._service = axios.create({
      baseURL: process.env.REACT_APP_URL,
      withCredentials: true
    });
  }

  getOne = id => this._service.get(`/lesson/${id}`);

  DeleteLesson = id => {
    return this._service.post("/lesson/delete", { id });
  };

  newLesson = (title, description, location, participants, date, user) => {
    return this._service.post("/lesson/createLesson", {
      title,
      description,
      location,
      participants,
      user,
      date
    });
  };

  editLesson = (id, title, description, location, participants, date) => {
    return this._service.post("/lesson/edit", {
      id,
      title,
      description,
      location,
      participants,
      date
    });
  };
  editLesson = (id, title, description, location, participants, date) => {
    return this._service.post("/lesson/edit", {
      id,
      title,
      description,
      location,
      participants,
      date
    });
  };
  updateParticipants = (id, participants) => {
    return this._service.post("/lesson/signup", {
      id,
      participants
    });
  };

  getAllLessons = () => this._service.get("/lesson/getAllLessons");
}
