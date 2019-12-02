import React, { Component } from "react";
import Search from "./Search";
import TodayView from "./TodayView";
import { connect } from "react-redux";
import {
  getLocationKeyByCityNameAction,
  get5daysWeatherByLocationKeyAction,
  getTodayCityWeatherByLocationKeyAction,
  getCityByGeoLocationAction
} from "../data/modules/weather/weather.actions";
import { weatherSelector } from "../data/modules/weather/weather.selectors";
import { createSelector } from "reselect";
import get from "lodash/get";
import Temp from "./Temp";
import Header from "./Header";
import "../style/Home.css";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todayData: "",
      locationKey: 215854,
      forecasts: []
    };
  }

  saveCoords = async (latitude, longitude) => {
    await this.props.getCityByGeoLocationAction(latitude, longitude);
  };

  setTodayCityWeatherByLocationKey = async (city = "Tel Aviv") => {
    await this.props.getLocationKeyByCityNameAction(city);
    const cityLocationKey = get(this.props, "weather.locationKeyResult[0].Key");

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
    //if is not undefined it's mean came from NavLink (from Favorite)
    const cityName = this.props.location.cityLocation;
    if (cityName) {
      this.setTodayCityWeatherByLocationKey(cityName);
    } else {
      const cityName = get(
        this.props.weather,
        "cityFromGeoLocation.LocalizedName"
      );
      if (cityName) {
        this.setTodayCityWeatherByLocationKey(cityName);
      }
    }
  }

  componentDidUpdate(prevProps) {
    const currentCityName = get(
      this.props.weather,
      "cityFromGeoLocation.LocalizedName"
    );
    const prevCityName = get(
      prevProps.weather,
      "cityFromGeoLocation.LocalizedName"
    );
    if (currentCityName !== prevCityName) {
      this.setTodayCityWeatherByLocationKey(currentCityName);
    }
  }

  render() {
    const { forecasts, city, inFavotiteProps } = this.state;
    return (
      <div>
        <Header />
        <div className="home">
          <h1>Home</h1>
          <Temp saveCoords={this.saveCoords} />
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
  getTodayCityWeatherByLocationKeyAction,
  getCityByGeoLocationAction
};

export default connect(
  finalSelector,
  mapDispatchToProps
)(Home);
