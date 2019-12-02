import React, { Component } from "react";
import "../style/CityView.css";
import get from "lodash/get";

class CityView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  to2Digits = number => (number < 10 ? "0" + number : number);

  render() {
    const iconUrl = `https://developer.accuweather.com/sites/default/files/${this.to2Digits(
      get(this.props, "city.WeatherIcon")
    )}-s.png`;

    return (
      <div className="cityView">
        <div className="cityNameArea">{this.props.city.cityName}</div>
        <div className="cityContentArea">
          <div className="cityWeatherContent">
            {this.props.city.WeatherText}
          </div>
          <div className="cityIconArea">
            <img alt="weatherIcon" src={iconUrl} />
          </div>
        </div>
      </div>
    );
  }
}

export default CityView;
