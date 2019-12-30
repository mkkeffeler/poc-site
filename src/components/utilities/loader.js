import React from "react";
import { Row } from "reactstrap";

export class Loader extends React.Component {
  render() {
    return (
      <Row className={this.props.isLoading ? "" : "d-none"}>
        <h4>loading...</h4>
      </Row>
    );
  }
}
