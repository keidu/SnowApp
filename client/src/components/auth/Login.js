import React, { Component } from "react";
import { Button, Form, Container } from "react-bootstrap";
import Service from "../../service/Auth.service";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this._service = new Service();
    this.state = {
      user: { username: "", password: "" }
    };
  }

  handleInputChange = e => {
    let { name, value } = e.target;
    this.setState({
      user: { ...this.state.user, [name]: value }
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { username, password } = this.state.user;
    this._service.login(username, password).then(theLoggedUser => {
      this.props.setUser(theLoggedUser.data);
      this.setState({ username: "", password: "" });
      this.props.history.push("/profile");
    });
  };

  render() {
    return (
      <Container className="background2">
        <Container className="signup-form center-me">
          <Form onSubmit={this.handleSubmit}>
            <h1>Log in</h1>
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
                type="text"
                name="password"
                onChange={this.handleInputChange}
                value={this.state.password}
              />
            </Form.Group>
            <Button variant="dark" type="submit">
              Log in
            </Button>
          </Form>
        </Container>
      </Container>
    );
  }
}

export default LoginForm;
