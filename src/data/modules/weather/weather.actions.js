import {
  getLocationKeyByCityName,
  getTodayWeatherByLocationKey,
  get5DaysWeatherByLocationKey,
  getCityByGeoLocation
} from "./weather.service";
import {
  GET_LOCATION_KEY_BY_CITY_NAME_START,
  GET_LOCATION_KEY_BY_CITY_NAME_SUCCESS,
  GET_LOCATION_KEY_BY_CITY_NAME_FAILED,
  GET_5DAYS_WEATHER_BY_LOCATION_KEY_START,
  GET_5DAYS_WEATHER_BY_LOCATION_KEY_SUCCESS,
  GET_5DAYS_WEATHER_BY_LOCATION_KEY_FAILED,
  GET_TODAY_WEATHER_BY_LOCATION_KEY_START,
  GET_TODAY_WEATHER_BY_LOCATION_KEY_SUCCESS,
  GET_TODAY_WEATHER_BY_LOCATION_KEY_FAILED,
  GET_CITY_BY_GEO_LOCATION_START,
  GET_CITY_BY_GEO_LOCATION_SUCCESS,
  GET_CITY_BY_GEO_LOCATION_FAILED,
  SAVE_FAVORITE_CITY,
  REMOVE_FAVORITE_CITY
} from "./weather.types";

export const getLocationKeyByCityNameAction = cityName => dispatch => {
  const promise = getLocationKeyByCityName(cityName);
  dispatch({
    type: [
      GET_LOCATION_KEY_BY_CITY_NAME_START,
      GET_LOCATION_KEY_BY_CITY_NAME_SUCCESS,
      GET_LOCATION_KEY_BY_CITY_NAME_FAILED
    ],
    payload: promise
  });
  return promise;
};

export const getTodayCityWeatherByLocationKeyAction = locationKey => dispatch => {
  const promise = getTodayWeatherByLocationKey(locationKey);
  dispatch({
    type: [
      GET_TODAY_WEATHER_BY_LOCATION_KEY_START,
      GET_TODAY_WEATHER_BY_LOCATION_KEY_SUCCESS,
      GET_TODAY_WEATHER_BY_LOCATION_KEY_FAILED
    ],
    payload: promise
  });
  return promise;
};

export const get5daysWeatherByLocationKeyAction = cityKey => dispatch => {
  const promise = get5DaysWeatherByLocationKey(cityKey);
  dispatch({
    type: [
      GET_5DAYS_WEATHER_BY_LOCATION_KEY_START,
      GET_5DAYS_WEATHER_BY_LOCATION_KEY_SUCCESS,
      GET_5DAYS_WEATHER_BY_LOCATION_KEY_FAILED
    ],
    payload: promise
  });
  return promise;
};

export const getCityByGeoLocationAction = (latitude, longitude) => dispatch => {
  const promise = getCityByGeoLocation(latitude, longitude);
  dispatch({
    type: [
      GET_CITY_BY_GEO_LOCATION_START,
      GET_CITY_BY_GEO_LOCATION_SUCCESS,
      GET_CITY_BY_GEO_LOCATION_FAILED
    ],
    payload: promise
  });
  return promise;
};

export const saveFavoriteCityAction = city => dispatch => {
  dispatch({
    type: SAVE_FAVORITE_CITY,
    payload: city
  });
};

export const removeFavoriteCityAction = city => dispatch => {
  dispatch({
    type: REMOVE_FAVORITE_CITY,
    payload: city
  });
};
