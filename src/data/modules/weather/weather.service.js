import Axios from "axios";
const TEMP_API_KEY = "SJI87zSnduKJGlRMjnocFnsWtJwEJ3DR";
const accuWeatherUrl = "https://dataservice.accuweather.com";

async function getLocationKeyByCityName(cityName) {
  const params = {
    apikey: TEMP_API_KEY,
    q: cityName
  };
  const url = `${accuWeatherUrl}/locations/v1/cities/autocomplete`;
  return Axios.get(url, { params });
}

async function getTodayWeatherByLocationKey(locationKey) {
  const url = decodeURI(
    `${accuWeatherUrl}/currentconditions/v1/${locationKey}?apikey=${TEMP_API_KEY}&language=en-us`
  );
  return Axios.get(url);
}

async function get5DaysWeatherByLocationKey(locationKey) {
  const url = `${accuWeatherUrl}/forecasts/v1/daily/5day/${locationKey}`;
  const params = { apikey: TEMP_API_KEY, language: "en-us", metric: true };
  return Axios.get(url, { params }); // Call the fetch function passing the url of the API as a parameter
}

async function getCityByGeoLocation(latitude, longitude) {
  const url = `${accuWeatherUrl}/locations/v1/cities/geoposition/search`;
  const params = { apikey: TEMP_API_KEY, q: latitude + "," + longitude };
  return Axios.get(url, { params }); // Call the fetch function passing the url of the API as a parameter
}

export {
  getLocationKeyByCityName,
  getTodayWeatherByLocationKey,
  get5DaysWeatherByLocationKey,
  getCityByGeoLocation
};
