import React, { Component } from "react";
import OneDayView from "./OneDayView";
import { Icon } from "antd";
import { createSelector } from "reselect";
import { connect } from "react-redux";
import { weatherSelector } from "../data/modules/weather/weather.selectors";
import {
  saveFavoriteCityAction,
  removeFavoriteCityAction
} from "../data/modules/weather/weather.actions";
import "../style/TodayView.css";
import get from "lodash/get";
import SplitText from "react-pose-text";

class TodayView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  save = () => {
    const cities = get(this.props, "weather.favorites");
    const cityName = get(this.props, "city");
    if (!cities.some(city => city.cityName === this.props.city)) {
      this.props.saveFavoriteCityAction({ ...this.props.data, cityName });
    }
  };

  remove = () => {
    this.props.removeFavoriteCityAction(this.props.city);
  };

  to2Digits = number => (number < 10 ? "0" + number : number);

  componentDidMount() {
    this.setState({
      iconUrl: `https://developer.accuweather.com/sites/default/files/${this.to2Digits(
        this.props.data.WeatherIcon
      )}-s.png`
    });
  }

  render() {
    const charPoses = {
      exit: { y: 20, opacity: 0 },
      enter: {
        y: 0,
        opacity: 1,
        transition: ({ charInWordIndex }) => ({
          type: "spring",
          delay: charInWordIndex * 30,
          stiffness: 500 + charInWordIndex * 150,
          damping: 10 - charInWordIndex * 1
        })
      }
    };

    const inFavorite = get(this.props, "weather.favorites").some(
      city => city.cityName === this.props.city
    );
    const data = this.props.data;
    const cityName = this.props.city;
    return (
      <div className="todayView">
        <div className="title">
          <div className="city">
            <SplitText initialPose="exit" pose="enter" charPoses={charPoses}>
              {cityName}
            </SplitText>
          </div>
          <div className="WeatherText">{this.props.data.WeatherText}</div>
          <div className="temp">
            {data.Temperature.Metric.Value}
            {data.Temperature.Metric.Unit}
          </div>
          <img
            alt="todayWeaterIcon"
            className="mainIcon"
            src={this.state.iconUrl}
          />
        </div>
        {inFavorite ? (
          <Icon
            className="saveIcon"
            type="heart"
            theme="twoTone"
            twoToneColor="#eb2f96"
            onClick={this.remove}
          />
        ) : (
          <Icon className="saveIcon" type="heart" onClick={this.save} />
        )}
        <h1 className="weekly">Weekly</h1>
        <div className="weekForecast">
          {Object.values(this.props.forecasts).map((forecast, idx) => (
            <React.Fragment key={idx}>
              <OneDayView data={forecast} />
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  }
}

const finalSelector = createSelector(
  weatherSelector,
  weatherSelector => {
    return {
      weather: weatherSelector
    };
  }
);

const mapDispatchToProps = {
  saveFavoriteCityAction,
  removeFavoriteCityAction
};

export default connect(
  finalSelector,
  mapDispatchToProps
)(TodayView);
