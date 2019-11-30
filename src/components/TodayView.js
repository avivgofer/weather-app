import React, { Component } from "react";
import OneDayView from "./OneDayView";
import { Icon } from "antd";
import "../style/TodayView.css";

class TodayView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favoriteAllready: false
    };
    this.save = this.save.bind(this);
    this.remove = this.remove.bind(this);
  }

  save() {
    localStorage.setItem(this.props.city, JSON.stringify(this.props.data));
    this.setState({
      favoriteAllready: true
    });
  }

  remove() {
    localStorage.removeItem(this.props.city);
    this.setState({
      favoriteAllready: false
    });
  }

  to2Digits = number => (number < 10 ? "0" + number : number);

  componentDidMount() {
    this.setState({
      iconUrl: `https://developer.accuweather.com/sites/default/files/${this.to2Digits(
        this.props.data.WeatherIcon
      )}-s.png`
    });
  }

  render() {
    const data = this.props.data;
    const city = this.props.city;
    return (
      <div className={"todayView"}>
        <div className="title">
          <div className={"city"}>{city}</div>
          <img className={"mainIcon"} src={this.state.iconUrl} />
          <div className={"temp"}>
            {data.Temperature.Metric.Value}
            {data.Temperature.Metric.Unit}
          </div>
        </div>
        <div className={"WeatherText"}>{this.props.data.WeatherText}</div>
        {this.props.favoriteAllready || this.state.favoriteAllready ? (
          <Icon
            className={"saveIcon"}
            type="heart"
            theme="twoTone"
            twoToneColor="#eb2f96"
            onClick={this.remove}
          />
        ) : (
          <Icon className={"saveIcon"} type="heart" onClick={this.save} />
        )}
        <h1 className={"weekly"}>Weekly</h1>
        <div className={"weekForecast"}>
          {Object.values(this.props.forecasts).map((forecast, idx) => (
            <OneDayView key={idx} data={forecast} />
          ))}
        </div>
      </div>
    );
  }
}

export default TodayView;
