import React, { Component } from "react";
import { Button, Form, Container } from "react-bootstrap";
import Service from "../../service/Lesson.service";

class EditLesson extends Component {
  constructor(props) {
    super(props);
    this._service = new Service();
    this.state = {
      _id: "",
      title: "",
      description: "",
      location: "",
      creatorIdUser: "",
      creatorIdTeacher: "",
      date: ""
    };
  }

  handleInputChange = e => {
    let { name, value } = e.target;
    this.setState({ [name]: value });
  };

  componentDidMount() {
    this.updatePostList();
    this._service
      .getOne(this.props.match.params.id)
      .then(theEditedPost => this.setState(theEditedPost.data))
      .catch(err => console.log({ err }));
  }

  updatePostList = () => {
    this._service
      .getAllLessons()
      .then(allLessonsFromDB => {
        const post = allLessonsFromDB.data.find(
          post => post._id === this.props.match.params.id
        );
        this.setState(post);
      })
      .catch(err => console.log("Error", err));
  };

  editLessonHandler = () => {
    let id = this.props.match.params.id;
    const { title, description, location, participants, date } = this.state;
    this._service
      .editLesson(id, title, description, location, participants, date)
      .then(theUpdatedPost => console.log(theUpdatedPost))
      .catch(err => console.log({ err }));
    this.updatePostList();
    this.props.history.push("/main");
  };

  DeleteLessonHandler = () => {
    this._service.DeleteLesson(this.props.match.params.id);
    this.updatePostList();
    this.props.history.push("/main");
  };

  render() {
    return (
      <Container className="background-new">
        <Container className="signup-form">
          <Form onSubmit={this.handleSubmit}>
            <h1>Edit</h1>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                onChange={this.handleInputChange}
                value={this.state.title}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                onChange={this.handleInputChange}
                value={this.state.description}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                name="location"
                onChange={this.handleInputChange}
                value={this.state.location}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                name="date"
                onChange={this.handleInputChange}
                value={this.state.date}
              />
            </Form.Group>
            <Button variant="warning" onClick={this.DeleteLessonHandler}>
              Delete
            </Button>
            <Button variant="dark" onClick={this.editLessonHandler}>
              Save
            </Button>
          </Form>
        </Container>
      </Container>
    );
  }
}

export default EditLesson;
