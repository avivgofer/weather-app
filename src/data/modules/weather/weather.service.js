import Axios from "axios";
const TEMP_API_KEY = "FT1laPtWRKZwbyHHKbBQ7VIjpVIL0ytm";

async function getLocationKeyByCityName(cityName) {
  const params = {
    apikey: TEMP_API_KEY,
    q: cityName
  };
  const url = "/locations/v1/cities/autocomplete";
  return Axios.get(url, { params });
}

async function getTodayWeatherByLocationKey(locationKey) {
  const url = decodeURI(
    `/currentconditions/v1/${locationKey}?apikey=${TEMP_API_KEY}&language=he-IL`
  );
  return Axios.get(url);
}

async function get5DaysWeatherByLocationKey(locationKey) {
  const url = `/forecasts/v1/daily/5day/${locationKey}`;
  const params = { apikey: TEMP_API_KEY, language: "he-IL", metric: true };
  return Axios.get(url, { params }); // Call the fetch function passing the url of the API as a parameter
}

async function getCityByGeoLocation(latitude, longitude) {
  const url = "/locations/v1/cities/geoposition/search";
  const params = { apikey: TEMP_API_KEY, q: latitude + "," + longitude };
  return Axios.get(url, { params }); // Call the fetch function passing the url of the API as a parameter
}

export {
  getLocationKeyByCityName,
  getTodayWeatherByLocationKey,
  get5DaysWeatherByLocationKey,
  getCityByGeoLocation
};
