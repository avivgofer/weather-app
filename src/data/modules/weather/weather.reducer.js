import get from "lodash/get";

import {
  GET_TODAY_WEATHER_BY_LOCATION_KEY_SUCCESS,
  GET_LOCATION_KEY_BY_CITY_NAME_SUCCESS,
  GET_5DAYS_WEATHER_BY_LOCATION_KEY_SUCCESS,
  GET_CITY_BY_GEO_LOCATION_SUCCESS,
  SAVE_FAVORITE_CITY,
  REMOVE_FAVORITE_CITY
} from "./weather.types";

const defaultState = {
  current5DaysWeather: "",
  currentWeather: "",
  locationKeyResult: "",
  cityFromGeoLocation: {},
  favorites: []
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case GET_LOCATION_KEY_BY_CITY_NAME_SUCCESS: {
      return Object.assign({}, state, {
        locationKeyResult: get(action.payload, "data")
      });
    }
    case SAVE_FAVORITE_CITY: {
      return Object.assign({}, state, {
        favorites: [...state.favorites, action.payload]
      });
    }
    case REMOVE_FAVORITE_CITY: {
      return Object.assign({}, state, {
        favorites: state.favorites.filter(
          city => city.cityName !== action.payload
        )
      });
    }
    case GET_TODAY_WEATHER_BY_LOCATION_KEY_SUCCESS: {
      return Object.assign({}, state, {
        currentWeather: get(action.payload, "data")
      });
    }
    case GET_5DAYS_WEATHER_BY_LOCATION_KEY_SUCCESS: {
      return Object.assign({}, state, {
        current5DaysWeather: get(action.payload, "data")
      });
    }
    case GET_CITY_BY_GEO_LOCATION_SUCCESS: {
      return Object.assign({}, state, {
        cityFromGeoLocation: get(action.payload, "data")
      });
    }
    default:
      return state;
  }
};
