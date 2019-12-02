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
  getTodayCityWeatherByLocationKeyAction
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
      forecasts: []
    };
  }

  setTodayCityWeatherByLocationKey = async (city = "Tel Aviv") => {
    debugger;
    await this.props.getLocationKeyByCityNameAction(city);
    const cityLocationKey = get(this.props, "weather.locationKeyResult[0].Key");
    debugger;
    await this.props.getTodayCityWeatherByLocationKeyAction(cityLocationKey);

    const inFavotiteProps = get(this.props, "weather.favorites").some(
      favCity => favCity === city
    );
    this.setState(
      {
        todayData: get(this.props, "weather.currentWeather[0]"),
        locationKey: get(this.props, "weather.locationKeyResult[0].Key"),
        city: city ? city : "Tel Aviv",
        inFavotiteProps: inFavotiteProps
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

  componentDidMount() {
    const cityName = get(this.props, "location.cityLocation");
    this.setTodayCityWeatherByLocationKey(cityName);
  }

  render() {
    const { forecasts, city, inFavotiteProps } = this.state;
    return (
      <div className="home">
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
            inFavotiteProps={inFavotiteProps}
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
  getTodayCityWeatherByLocationKeyAction
};

export default connect(
  finalSelector,
  mapDispatchToProps
)(Home);
