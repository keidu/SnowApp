import React, { Component } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
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
          <Row>
            <Col sm={2} className="top-margins">
              <h2>User name: {this.state.user.username}</h2>
              <hr></hr>
              <h3>Email: {this.state.user.email}</h3>
              <hr></hr>
              <h3>Experience as teacher: {this.state.user.experience}</h3>
            </Col>
            <Col sm={4}>
              <img className="profile-img-view"
                src={this.state.user.imgPath} alt="profile Pic"></img>
            </Col>
            <Col sm={4} className="d-flex align-items-center">
              <EmailButton value={this.state} />
              <Button className="action-button shadow  grey" as={Link} to="/main"> Back </Button>
            </Col>
          </Row>
        </Container>
      );
    } else {
      return (
        <Container className="background-profile">
          <Row>
            <Col sm={2} className="top-margins">
              <h2>User name: {this.state.user.username}</h2>
              <hr></hr>
              <h3>User age: {this.state.user.age} years old</h3>
              <hr></hr>
              <h3>User skill level: {this.state.user.level}</h3>
            </Col>
            <Col sm={4} >
              <img className="profile-img-view" src={this.state.user.imgPath} alt="Profile pic"></img>
            </Col>
            <Col sm={4} className="d-flex align-items-center">
              <EmailButton value={this.state} />
              <Button className="action-button shadow  grey" as={Link} to="/main"> Back </Button>
            </Col>
          </Row>
        </Container>
      );
    }
  }
}
export default ViewProfile;
