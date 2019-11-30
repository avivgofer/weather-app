import { createSelector } from "reselect";

const baseWeatherSelector = state => state.weather;

const weatherSelector = createSelector(
  baseWeatherSelector,
  weather => {
    return weather;
  }
);

export { weatherSelector };
