import React, { Component } from "react";
import { Button, Form, Container } from "react-bootstrap";
import Service from "../../service/Lesson.service";

class NewLesson extends Component {
  constructor(props) {
    super(props);
    this._service = new Service();
    this.state = {
      post: {
        title: "",
        description: "",
        location: "",
        participants: 0,
        date: Date
      }
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    console.log(e.target);
    const {
      title,
      description,
      location,
      participants,
      date
    } = this.state.post;
    this._service
      .newLesson(
        title,
        description,
        location,
        participants,
        date,
        this.props.loggedInUser
      )
      .then(x => {
        this.props.history.push("/main");
      })
      .catch(err => console.log(err));
  };

  handleInputChange = e => {
    let { name, value } = e.target;
    this.setState({
      post: { ...this.state.post, [name]: value }
    });
  };

  renderSpecificFields = () =>
    this.props.loggedInUser && this.props.loggedInUser.role === "Teacher"
      ? this.renderTeacherFields()
      : this.renderUserFields();

  renderTeacherFields = () => (
    <Form.Group>
      <h1>Post</h1>
    </Form.Group>
  );

  renderUserFields = () => <h1>Post</h1>;

  render() {
    console.log(this.state);

    return (
      <Container className="background-new">
        <Container className="signup-form">
          <Form onSubmit={this.handleSubmit}>
            <Form.Group>
              {this.renderSpecificFields()}
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
            <Button variant="dark" type="submit">
              Publish
            </Button>
          </Form>
        </Container>
      </Container>
    );
  }
}

export default NewLesson;
