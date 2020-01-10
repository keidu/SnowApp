import React, { Component } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { Button } from "react-bootstrap";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

let today = new Date();
let dd = String(today.getDate()).padStart(2, "0");
let mm = String(today.getMonth() + 1).padStart(2, "0");
let yyyy = today.getFullYear();

today = yyyy + "-" + mm + "-" + dd;

class NewCalendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      LessonCard: [
        {
          title: "Today",
          start: new Date(`${today} 10:22:00`),
          end: new Date(`${today} 10:42:00`)
        }
        // {
        //   title: `Tomorrow`,
        //   start: new Date(`2019-12-23 10:22:00`),
        //   end: new Date(`2019-12-23 10:42:00`)
        // }
      ],

      loggedInUser: this.props.loggedInUser,
      showLessons: false,
      showCalendar: false
    };
  }

  updateLessonList = () => {
    let lessonListCopy = [...this.state.LessonCard];
    let arrangedDate;

    this.props.lessons.map(elm => {
      if (elm.date) arrangedDate = elm.date.substr(0, 10);

      let lessonToPush = {
        title: elm.title,
        start: new Date(`${arrangedDate} 09:00:00`),
        end: new Date(`${arrangedDate} 18:00:00`)
      };

      lessonListCopy.push(lessonToPush);
    });

    this.setState({ LessonCard: lessonListCopy });
  };

  componentDidMount = () => this.updateLessonList();

  render() {
    return (
      <>
        <div
          style={{
            height: "50vh"
          }}
          className="calendar-container"
        >
          <Calendar
            localizer={localizer}
            events={this.state.LessonCard}
            startAccessor="start"
            endAccessor="end"
          />
          {this.props.lesson
            ? this.props.lesson.map(elm => `${elm.time}`)
            : null}
        </div>
      </>
    );
  }
}

export default NewCalendar;
