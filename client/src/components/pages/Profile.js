import React from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const Profile = props => {
  console.log(props);
  if (props.loggedInUser.age > 0) {
    return (
      <Container className="background-profile">
        <h1 className="text-center margins">Welcome {props.loggedInUser.username}</h1>
        <Row>
          <Col sm={6}>
            <img className="profile-img"
              src={props.loggedInUser.imgPath} alt="Profile pic"></img>
          </Col>
          <Col sm={6} className="d-flex align-items-center">
            <Button
              className="action-button shadow  grey"
              as={Link}
              to="/editUser">Edit profile</Button>
            <Button
              className="action-button shadow grey"
              as={Link}
              to="/createLesson">Create demand</Button>
            <Button className="action-button shadow grey" as={Link} to="/main">View offers</Button>
          </Col>
        </Row>
      </Container>
    );
  } else {
    return (
      <Container className="background-profile">
        <h1 className="text-center">Welcome {props.loggedInUser.username}</h1>
        <Row>
          <Col sm={6}>
            <img
              className="profile-img"
              src={props.loggedInUser.imgPath}
              alt=""></img>
          </Col>
          <Col sm={6} className="d-flex align-items-center">
            <Button
              className="action-button shadow  grey"
              as={Link} to="/editUser">Edit profile
                </Button>
            <Button
              className="action-button shadow  grey"
              as={Link} to="/createLesson">Create offer
          </Button>
            <Button className="action-button shadow  grey" as={Link} to="/main">View demands
          </Button>
          </Col>
        </Row>
      </Container>
    );
  }
};
export default Profile;
