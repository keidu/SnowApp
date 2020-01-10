import React, { Component } from "react";
import sample from "../../images/index.mp4";

class Index extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <video className="videoTag" autoPlay loop muted>
          <source src={sample} type="video/mp4" />
        </video>
      </>
    );
  }
}

export default Index;
