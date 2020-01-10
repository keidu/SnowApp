import React from "react";
import { Button, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const Profile = props => {
  console.log(props);
  if (props.loggedInUser.age > 0) {
    return (
      <Container className="background-profile">
        <h1 className="text-center">Welcome {props.loggedInUser.username}</h1>
        <Row sm={12} className="photo-card d-inline">
          <img
            className="profile-img"
            src={props.loggedInUser.imgPath}
            alt=""
          ></img>
        </Row>
        <Container className="buttons">
          <Button
            className="action-button shadow  grey"
            as={Link}
            to="/editUser"
          >
            Edit profile
          </Button>
          <Button
            className="action-button shadow grey"
            as={Link}
            to="/createLesson"
          >
            Create lesson demand
          </Button>
          <Button className="action-button shadow grey" as={Link} to="/main">
            View lesson offers
          </Button>
        </Container>
      </Container>
    );
  } else {
    return (
      <Container className="background-profile">
        <h1 className="text-center">Welcome {props.loggedInUser.username}</h1>
        <Row sm={12} className="photo-card d-inline">
          <img
            className="profile-img"
            src={props.loggedInUser.imgPath}
            alt=""
          ></img>
        </Row>
        <Container className="buttons">
          <Button
            className="action-button shadow  grey"
            as={Link}
            to="/editUser"
          >
            Edit profile
          </Button>
          <br></br>
          <hr></hr>
          <Button
            className="action-button shadow  grey"
            as={Link}
            to="/createLesson"
          >
            Create lesson offer
          </Button>
          <br></br>
          <hr></hr>
          <Button className="action-button shadow  grey" as={Link} to="/main">
            View lesson demands
          </Button>
        </Container>
      </Container>
    );
  }
};
export default Profile;
