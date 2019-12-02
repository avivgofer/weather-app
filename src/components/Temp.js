import React, { Component } from "react";
import { geolocated } from "react-geolocated";
import get from "lodash/get";

class Temp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flag: true
    };
  }
  componentDidUpdate() {
    //because we need it after update but only one time otherwise it's calling 251 times
    if (get(this.props, "coords.latitude", false) && this.state.flag) {
      this.setState({
        flag: false
      });
      this.props.saveCoords(
        get(this.props, "coords.latitude"),
        get(this.props, "coords.longitude")
      );
    }
  }
  render() {
    return <React.Fragment />;
  }
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false
  },
  userDecisionTimeout: 5000
})(Temp);
