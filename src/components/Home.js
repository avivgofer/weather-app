import React, { Component } from "react";
import Search from "./Search";
import TodayView from "./TodayView";
import OneDayView from "./OneDayView";
import Axios from "axios";
import { message } from "antd";
import { toStatement, throwStatement } from "@babel/types";
import { connect } from "react-redux";
import {
  getLocationKeyByCityNameAction,
  get5daysWeatherByLocationKeyAction,
  getTodayCityWeatherByLocationKeyAction,
  saveFavoriteCityAction
} from "../data/modules/weather/weather.actions";
import { weatherSelector } from "../data/modules/weather/weather.selectors";
import { createSelector } from "reselect";
import get from "lodash/get";

const tempApiKey11 = "GqyBoSIAIF3DOeqGW6w1wJcT9SZJ6fAF";
const tempApiKeyddd = "FT1laPtWRKZwbyHHKbBQ7VIjpVIL0ytm";
const tempApiKey = "IAauRqa8Bxf9yBAxchkGcvLr0aj6BDos";
const myRealApiKey = "%09SJI87zSnduKJGlRMjnocFnsWtJwEJ3DR";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todayData: "",
      locationKey: 215854,
      forecasts: [],
      city: "Tel Aviv"
    };
    this.setTodayCityWeatherByLocationKey = this.setTodayCityWeatherByLocationKey.bind(
      this
    );
  }

  setTodayCityWeatherByLocationKey = async (
    cityLocationKey = "215854",
    city = "Tel Aviv"
  ) => {
    await this.props.getLocationKeyByCityNameAction(city);
    await this.props.getTodayCityWeatherByLocationKeyAction(
      get(this.props, "weather.locationKeyResult[0].Key")
    );

    const favoriteAllready = Object.keys(localStorage).some(x => x === city);
    this.setState(
      {
        todayData: get(this.props, "weather.currentWeather[0]"),
        locationKey: cityLocationKey,
        city: city ? city : "Tel Aviv",
        favoriteAllready: favoriteAllready
      },
      this.set5Daysforecasts
    );
  };

  set5Daysforecasts = async () => {
    await this.props.get5daysWeatherByLocationKeyAction(this.state.locationKey);
    this.setState({
      forecasts: get(this.props, "weather.current5DaysWeather.DailyForecasts")
    });
  };

  componentWillMount() {
    this.setTodayCityWeatherByLocationKey();
  }

  render() {
    const { forecasts, city, favoriteAllready } = this.state;
    return (
      <div className={"home"}>
        <Search
          setTodayCityWeatherByLocationKey={
            this.setTodayCityWeatherByLocationKey
          }
        />
        {this.state.todayData ? (
          <TodayView
            data={this.state.todayData}
            forecasts={forecasts}
            city={city}
            favoriteAllready={favoriteAllready}
          />
        ) : (
          <React.Fragment />
        )}
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
  getLocationKeyByCityNameAction,
  get5daysWeatherByLocationKeyAction,
  saveFavoriteCityAction,
  getTodayCityWeatherByLocationKeyAction
};

export default connect(
  finalSelector,
  mapDispatchToProps
)(Home);
