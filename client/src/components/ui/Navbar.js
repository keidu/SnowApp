import React, { Component } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import Service from "../../service/Auth.service";

class Navigation extends Component {
  constructor(props) {
    super(props);
    this._service = new Service();
  }

  logoutUser = () => {
    this._service
      .logout()
      .then(x => this.props.setUser(false))
      .catch(err => console.log(err));
  };

  render() {
    const saludo = this.props.loggedInUser
      ? this.props.loggedInUser.username
      : "Guest";

    return this.props.loggedInUser ? (
      <Navbar className="navbar" expand="sm">
        <Navbar.Brand>SnowApp</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse>
          <Nav className="mr-auto">
            <Nav.Link as="li">
              <Link to="/">Index</Link>
            </Nav.Link>
            <Nav.Link as="li">
              <Link to="/profile">Profile</Link>
            </Nav.Link>
            <Nav.Link as="li" onClick={this.logoutUser}>
              Logout
            </Nav.Link>
          </Nav>
          <Nav className="ml-auto">
            <Navbar.Text>Welcome {saludo}</Navbar.Text>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    ) : (
      <Navbar className="navbar" expand="md">
        <Navbar.Brand>Snow App!</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse>
          <Nav className="mr-auto">
            <Nav.Link as="li">
              <Link to="/">Index</Link>
            </Nav.Link>
            <Nav.Link as="li">
              <Link to="/signup">Register</Link>
            </Nav.Link>
            <Nav.Link as="li">
              <Link to="/login">Login</Link>
            </Nav.Link>
          </Nav>
          <Nav className="ml-auto">
            <Navbar.Text>Welcome {saludo}</Navbar.Text>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Navigation;
