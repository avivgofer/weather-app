import React, { Component } from "react";
import "../style/OneDayView.css";
import get from "lodash/get";
class OneDayView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  to2Digits = number => (number < 10 ? "0" + number : number);

  formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate();

    if (month.length < 2) month = "0" + month;

    if (day.length < 2) day = "0" + day;

    return [day, month].join("/");
  }

  render() {
    const forecast = this.props.data;
    let iconNumber = "";
    let date = "";
    if (forecast) {
      iconNumber = forecast.Day.Icon;
      date = this.formatDate(forecast.Date);
    }
    const iconUrl = `https://developer.accuweather.com/sites/default/files/${this.to2Digits(
      iconNumber
    )}-s.png`;

    const { Maximum, Minimum } = get(forecast, "Temperature", {});
    return (
      <div className="oneDayView">
        <div className="iconArea">
          <img alt="weatherIcon" src={iconUrl} />
        </div>
        <div className="contentArea">
          <div className="weatherContent">
            {Maximum.Value}
            {Maximum.Unit} / {Minimum.Value}
            {Minimum.Unit}
          </div>
          <div className="date">{date}</div>
        </div>
      </div>
    );
  }
}

export default OneDayView;
