import React, { Component } from "react";
import { Menu, Icon } from "antd";
import CityView from "./CityView";
import "../style/Favorites.css";
import get from "lodash/get";
import { createSelector } from "reselect";
import { connect } from "react-redux";
import { weatherSelector } from "../data/modules/weather/weather.selectors";
import { removeFavoriteCityAction } from "../data/modules/weather/weather.actions";
import "../style/Reset.css";
import { NavLink } from "react-router-dom";

class Favorites extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const favoriteCities = get(this.props, "weather.favorites", []);
    return (
      <div className="favoritesContainer">
        <h1>Favorites</h1>
        <div className="favorites">
          {favoriteCities.map((city, idx) => (
            <NavLink
              className="resetCss"
              to={{
                pathname: "/",
                cityLocation: city.cityName
              }}
            >
              <CityView city={city} key={idx} />
            </NavLink>
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
  removeFavoriteCityAction
};

export default connect(
  finalSelector,
  mapDispatchToProps
)(Favorites);
