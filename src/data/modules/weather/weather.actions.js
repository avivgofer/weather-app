import {
    getLocationKeyByCityName,
    getTodayWeatherByLocationKey,
    get5DaysWeatherByLocationKey
}
    from './weather.service'
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
    SAVE_FAVORITE_CITY
}
    from './weather.types'
import Axios from 'axios';

export const getLocationKeyByCityNameAction = (cityName) => dispatch => {
    const promise = getLocationKeyByCityName(cityName)
    dispatch({
        type: [GET_LOCATION_KEY_BY_CITY_NAME_START,
            GET_LOCATION_KEY_BY_CITY_NAME_SUCCESS,
            GET_LOCATION_KEY_BY_CITY_NAME_FAILED
        ],
        payload: promise
    })
    return promise
}

export const getTodayCityWeatherByLocationKeyAction = (locationKey) => dispatch => {
    const promise = getTodayWeatherByLocationKey(locationKey)
    dispatch({
        type: [GET_TODAY_WEATHER_BY_LOCATION_KEY_START,
            GET_TODAY_WEATHER_BY_LOCATION_KEY_SUCCESS,
            GET_TODAY_WEATHER_BY_LOCATION_KEY_FAILED],
        payload: promise
    })
    return promise
}

export const get5daysWeatherByLocationKeyAction = (cityKey) => dispatch => {
    const promise = get5DaysWeatherByLocationKey(cityKey)
    dispatch({
        type: [GET_5DAYS_WEATHER_BY_LOCATION_KEY_START,
            GET_5DAYS_WEATHER_BY_LOCATION_KEY_SUCCESS,
            GET_5DAYS_WEATHER_BY_LOCATION_KEY_FAILED],
        payload: promise
    })
    return promise
}

export const saveFavoriteCityAction = (city) => dispatch => {
    dispatch({
        type: SAVE_FAVORITE_CITY,
        payload: city
    })
}