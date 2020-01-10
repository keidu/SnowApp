import React from "react";
import Service from "../../service/Lesson.service";
import { Container, Row, Modal, Button } from "react-bootstrap";
import LessonCard from "./LessonCard";
import NewCalendar from "../lessons/Calendar";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this._service = new Service();
    this.state = {
      lessons: [],
      ownLessons: null,
      allLessons: [],
      showModal: false
    };
  }

  componentDidMount = () => this.updatePostList();

  updatePostList = () => {
    this._service
      .getAllLessons()
      .then(allLessonsDB => {
        let teacherLessons = allLessonsDB.data.filter(e => e.creatorIdTeacher);
        let userLessons = allLessonsDB.data.filter(e => e.creatorIdUser);

        let userId = this.props.loggedInUser._id;

        let ownTeacherLessons = allLessonsDB.data.filter(e => {
          if (e.creatorIdTeacher) return e.creatorIdTeacher._id === userId;
        });
        let ownUserLessons = allLessonsDB.data.filter(e => {
          if (e.creatorIdUser) return e.creatorIdUser._id === userId;
        });

        this.props.loggedInUser && this.props.loggedInUser.role === "Teacher"
          ? this.setState({
              lessons: userLessons,
              ownLessons: ownTeacherLessons,
              allLessons: allLessonsDB.data
            })
          : this.setState({
              lessons: teacherLessons,
              ownLessons: ownUserLessons,
              allLessons: allLessonsDB.data
            });
      })
      .catch(err => console.log("Error", err));
  };

  renderOwnPosts = () => (
    <>
      <h1 className="text-center">Your own posts</h1>
      <Container>
        <div className="flex">
          {this.state.ownLessons.map(post => (
            <LessonCard
              key={post._id}
              {...post}
              DeleteLesson={this.DeleteLessonHandler}
              loggedInUser={this.props.loggedInUser}
            />
          ))}
        </div>
      </Container>
    </>
  );

  renderCondition = () =>
    this.state.ownLessons ? this.renderOwnPosts() : null;

  handleShow = () => this.setState({ showModal: true });

  handleClose = () => this.setState({ showModal: false });

  render() {
    return (
      <>
        <Container>
          <Container>
            <h1 className="text-center">Dashboard</h1>
          </Container>
          <div className="flex">
            {this.state.lessons.map(post => (
              <LessonCard
                key={post._id}
                {...post}
                DeleteLesson={this.DeleteLessonHandler}
                loggedInUser={this.props.loggedInUser}
              />
            ))}
          </div>
          {this.renderCondition()}
          <Button
            onClick={this.handleShow}
            className="action-button shadow align grey"
            type="button"
          >
            View Calendar
          </Button>
        </Container>
        <Modal show={this.state.showModal} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Lesson calendar</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <NewCalendar
              lessons={this.state.allLessons}
              loggedInUser={this.state.loggedInUser}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default Dashboard;
