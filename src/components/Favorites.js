import React, { Component } from "react";
import CityView from "./CityView";
import "../style/Favorites.css";
import get from "lodash/get";
import { createSelector } from "reselect";
import { connect } from "react-redux";
import { weatherSelector } from "../data/modules/weather/weather.selectors";
import { removeFavoriteCityAction } from "../data/modules/weather/weather.actions";
import "../style/Reset.css";
import { Link } from "react-router-dom";
import Header from "./Header";

class Favorites extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const favoriteCities = get(this.props, "weather.favorites", []);
    return (
      <div>
        <Header />
        <div className="favoritesContainer">
          <div className="favorites">
            {favoriteCities.map((city, idx) => (
              <Link
                to={{
                  key: idx + 100,
                  pathname: "/",
                  cityLocation: city.cityName,
                  aboutProps: { a: "dd" }
                }}
              >
                <CityView key={idx + 200} city={city} />
              </Link>
            ))}
          </div>
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
