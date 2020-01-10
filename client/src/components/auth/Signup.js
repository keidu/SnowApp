import React, { Component } from "react";
import { Button, Form, Container } from "react-bootstrap";
import Service from "../../service/Auth.service";
import FilesService from "../../service/Files.service";

class SignupForm extends Component {
  constructor(props) {
    super(props);
    this._service = new Service();
    this.FilesService = new FilesService();

    this.state = {
      username: "",
      password: "",
      age: "",
      level: "",
      email: "",
      experience: "",
      role: "",
      imgPath: ""
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    this._service
      .signup(this.state)
      .then(theNewUser => {
        this.props.setUser(theNewUser.data);
        this.setState({
          username: "",
          password: "",
          age: "",
          level: "",
          email: "",
          experience: "",
          role: "",
          imgPath: ""
        });
        this.props.history.push("/profile");
      })
      .catch(err => console.log(err.response.data.message));
  };

  handleFileUpload = e => {
    const uploadData = new FormData();
    uploadData.append("imgPath", e.target.files[0]);
    console.log(e.target.files);
    this.FilesService.handleUpload(uploadData)
      .then(response => this.setState({ imgPath: response.data.secure_url }))
      .catch(err => console.log(err));
  };

  handleInputChange = e => {
    let { name, value } = e.target;
    this.setState({ [name]: value });
  };

  renderSpecificFields = () =>
    this.state.role === "Teacher"
      ? this.renderTeacherFields()
      : this.renderUserFields();

  renderTeacherFields = () => (
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

  renderUserFields = () => {
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
          <Form.Label>Level</Form.Label>
          <Form.Control
            as="select"
            onChange={this.handleInputChange}
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
      <Container className="background-signup">
        <Container className="signup-form">
          <Form onSubmit={this.handleSubmit}>
            <h1>Sign Up</h1>
            <Form.Label>Select Role</Form.Label>
            <Form.Control
              as="select"
              onChange={this.handleInputChange}
              name="role"
            >
              <option type="text"></option>
              <option type="text">Teacher</option>
              <option type="text">User</option>
            </Form.Control>
            <Form.Group>
              <Form.Label>User name</Form.Label>
              <Form.Control
                type="text"
                name="username"
                onChange={this.handleInputChange}
                value={this.state.username}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                onChange={this.handleInputChange}
                value={this.state.password}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                onChange={this.handleInputChange}
                value={this.state.email}
              />
            </Form.Group>
            {this.renderSpecificFields()}
            <Form.Group
              action="/upload"
              method="post"
              enctype="multipart/form-data"
            >
              <Form.Label for="file">Imagen de perfil:</Form.Label>
              <Form.Control
                name="imgPath"
                type="file"
                onChange={this.handleFileUpload}
              />
            </Form.Group>
            <Button className=".btn" type="submit">
              Register
            </Button>
          </Form>
        </Container>
      </Container>
    );
  }
}

export default SignupForm;
