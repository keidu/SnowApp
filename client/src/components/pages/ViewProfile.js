import React, { Component } from "react";
import { Button, Form, Container, Row } from "react-bootstrap";
import Service from "../../service/Auth.service";
import { Link } from "react-router-dom";
import EmailButton from "../ui/EmailButton";

class ViewProfile extends Component {
  constructor(props) {
    super(props);
    this._service = new Service();
    this.state = { user: {} };
  }

  componentDidMount() {
    this._service
      .viewProfile(this.props.match.params.id)
      .then(theUser => {
        this.setState({ user: theUser.data });
      })
      .catch(err => console.log({ err }));
  }

  render() {
    if (this.state.user && !this.state.user.age) {
      return (
        <Container className="background-profile">
          <h2>User name: {this.state.user.username}</h2>
          <h3>Email :{this.state.user.email}</h3>
          <h3>Experience as teacher :{this.state.user.experience}</h3>
          <Row sm={12} className="photo-card d-inline">
            <img
              className="profile-img"
              src={this.state.user.imgPath}
              alt=""
            ></img>
          </Row>
          <Container className="buttons">
            <Button className="action-button shadow  grey" as={Link} to="/main">
              <EmailButton value={this.state} />
              Back
            </Button>
          </Container>
        </Container>
      );
    } else {
      return (
        <Container className="background-profile">
          <h2>User name: {this.state.user.username}</h2>
          <h3>User age{this.state.user.age} years old</h3>
          <h3>User skill level is :{this.state.user.level}</h3>
          <Row sm={12} className="photo-card d-inline">
            <img
              className="profile-img"
              src={this.state.user.imgPath}
              alt=""
            ></img>
          </Row>
          <Container className="buttons">
            <EmailButton value={this.state} />
            <Button className="action-button shadow  grey" as={Link} to="/main">
              Back
            </Button>
          </Container>
        </Container>
      );
    }
  }
}
export default ViewProfile;
