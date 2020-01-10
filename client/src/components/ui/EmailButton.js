import React, { Component } from "react";
import Service from "../../service/Lesson.service";
import { Button } from "react-bootstrap";

class EmailButton extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    if (this.props.value.teacher) {
      window.open(`mailto:${this.props.value.teacher.email}`);
    } else {
      window.open(`mailto:${this.props.value.user.email}`);
    }
  }

  render() {
    return (
      <Button
        className="border"
        variant="light"
        target="_blank"
        onClick={this.onClick}
      >
        Send Mail
      </Button>
    );
  }
}

export default EmailButton;
