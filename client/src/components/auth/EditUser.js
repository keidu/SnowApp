import React, { Component } from "react";
import { Button, Form, Container } from "react-bootstrap";
import Service from "../../service/Auth.service";

class EditUser extends Component {
  constructor(props) {
    super(props);
    this._service = new Service();
    this.state = {
      username: props.loggedInUser.username,
      email: props.loggedInUser.email,
      age: props.loggedInUser.age,
      level: props.loggedInUser.level,
      experience: props.loggedInUser.experience,
      role: props.loggedInUser.role
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    this._service
      .editUser(this.state)
      .then(theEditedUser => {
        this.setState(
          { username: "", email: "", age: "", level: "", experience: "" },
          () => this.props.setUser(theEditedUser.data)
        );
        this.props.history.push("/profile");
      })
      .catch(err => console.log({ err }));
  };

  handleInputChange = e => {
    let { name, value } = e.target;
    this.setState({ [name]: value });
  };

  renderSpecificFields = () =>
    this.props.loggedInUser.age > 0
      ? this.renderTeacherFields()
      : this.renderUserFields();

  renderUserFields = () => (
    <Form.Group>
      <Form.Label>Experience as teacher</Form.Label>
      <Form.Control
        type="text"
        name="experience"
        onChange={this.handleInputChange}
        value={this.state.experience}
      />
    </Form.Group>
  );

  renderTeacherFields = () => {
    return (
      <>
        <Form.Group>
          <Form.Label>Age</Form.Label>
          <Form.Control
            type="number"
            name="age"
            onChange={this.handleInputChange}
            value={this.state.age}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Skill level</Form.Label>
          <Form.Control
            as="select"
            onChange={this.handleInputChange}
            value={this.state.level}
            name="level"
          >
            <option type="text"></option>
            <option type="text">Amateur</option>
            <option type="text">Medium</option>
            <option type="text">Pro</option>
          </Form.Control>
        </Form.Group>
      </>
    );
  };
  render() {
    return (
      <Container className="background-edit-profile">
        <Container className="signup-form">
          <Form onSubmit={this.handleSubmit}>
            <h1>Edit User</h1>
            <Form.Group>
              <Form.Label>User</Form.Label>
              <Form.Control
                type="text"
                name="username"
                onChange={this.handleInputChange}
                value={this.state.username}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                name="email"
                onChange={this.handleInputChange}
                value={this.state.email}
              />
            </Form.Group>
            {this.renderSpecificFields()}
            <Button variant="dark" type="submit">
              Save
            </Button>
          </Form>
        </Container>
      </Container>
    );
  }
}

export default EditUser;
