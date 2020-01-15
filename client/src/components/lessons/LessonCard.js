import React, { Component } from "react";
import EmailButton from "../ui/EmailButton";
import { Link } from "react-router-dom";
import { Button, Form, Col, Row, Modal, Container } from "react-bootstrap";
import Service from "../../service/Lesson.service";

class LessonCard extends Component {
  constructor(props) {
    super(props);
    this._service = new Service();
    this.state = {
      _id: props._id,
      loggedInUser: props.loggedInUser,
      title: props.title,
      description: props.description,
      location: props.location,
      participants: props.participants,
      participantsRef: props.participantsRef,
      user: props.creatorIdUser,
      teacher: props.creatorIdTeacher,
      date: props.date,
      showModal: false
    };
  }

  renderEditButtonCondition = () => {
    if (
      this.state.user &&
      this.state.user._id === this.state.loggedInUser._id
    ) {
      return this.renderEditButton();
    } else if (
      this.state.teacher &&
      this.state.teacher._id === this.state.loggedInUser._id
    ) {
      return this.renderEditButton();
    }
  };

  renderSendEmailCondition = () => {
    if (
      this.state.user &&
      this.state.user._id !== this.state.loggedInUser._id
    ) {
      return this.renderEmailButton();
    } else if (
      this.state.teacher &&
      this.state.teacher._id !== this.state.loggedInUser._id
    ) {
      return this.renderEmailButton();
    }
  };

  renderEmailButton = () => <EmailButton value={this.state} />;

  renderEditButton = () => (
    <Link to={`/delete/${this.state._id}`}>
      <Button className="action-button shadow  grey">
        Edit
      </Button>
    </Link>
  );

  renderSignUpCondition = () => {
    if (
      this.state.loggedInUser.role === "User" &&
      this.state.user &&
      this.state.user._id !== this.state.loggedInUser._id
    ) {
      return this.renderSignUpButton();
    } else if (
      this.state.loggedInUser.role === "User" &&
      this.state.teacher &&
      this.state.teacher._id !== this.state.loggedInUser._id
    ) {
      return this.renderSignUpButton();
    }
  };

  renderSignUpButton = () => (
    <Button className="action-button shadow  grey" onClick={this.SignUpHandler}>
      Sign up
    </Button>
  );

  SignUpHandler = () => {
    let id = this.props._id;

    const participantsList = [...this.state.participantsRef].join(
      this.state.loggedInUser._id
    );
    this._service
      .updateParticipants(id, participantsList)
      .then(theUpdatedPost => {
        this.setState({ participantsRef: theUpdatedPost.data.participantsRef });
      });
  };

  handleShow = () => {
    this.setState({ showModal: true });
  };

  handleClose = () => this.setState({ showModal: false });

  render() {
    let showDate;
    showDate = this.state.date ? this.state.date.substr(0, 10) : null;
    const email = this.state.user
      ? this.state.user.email
      : this.state.teacher.email;
    return (
      <Container>
        <Row>
          <Col className="post-card" md={{ span: 10 }}>
            <h3>{this.state.title}</h3>
            <p>Descripcion: {this.state.description}</p>
            <p>Localizacion: {this.state.location}</p>
            <p>Date: {showDate}</p>
            <Form.Group>
              <p>participants: {this.state.participantsRef.length}</p>
            </Form.Group>
            <p>mail: {email}</p>
            {this.renderSendEmailCondition()}
            {this.renderEditButtonCondition()}
            {this.renderSignUpCondition()}
            <Button
              onClick={this.handleShow}
              className="action-button shadow  grey">
              Participants
          </Button>
            <Button
              className="action-button shadow  grey"
              as={Link}
              to={`/view/${
                this.props.creatorIdUser
                  ? this.props.creatorIdUser._id
                  : this.props.creatorIdTeacher._id
                }`}>Poster
          </Button>
          </Col>
        </Row>
        <Modal show={this.state.showModal} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Participants</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.state.participantsRef.map(elm => (
              <Row>
                <Col>Name: {elm.username}</Col>
                <Button
                  className="border"
                  variant="light"
                  as={Link}
                  to={`/view/${elm._id}`}
                >View profile
                </Button>
                <br></br>
                <br></br>
              </Row>
            ))}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      </Container>
    );
  }
}

export default LessonCard;
