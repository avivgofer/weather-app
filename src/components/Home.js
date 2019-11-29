import React, { Component } from 'react';
import Search from './Search'
import TodayView from './TodayView'
import OneDayView from './OneDayView'
import Axios from 'axios'









const tempApiKey = "GqyBoSIAIF3DOeqGW6w1wJcT9SZJ6fAF"
const myRealApiKey = "%09SJI87zSnduKJGlRMjnocFnsWtJwEJ3DR"

const resExample = [
    {
        "LocalObservationDateTime": "2019-11-29T12:35:00+02:00",
        "EpochTime": 1575023700,
        "WeatherText": "Cloudy",
        "WeatherIcon": 7,
        "HasPrecipitation": false,
        "PrecipitationType": null,
        "IsDayTime": true,
        "Temperature": {
            "Metric": {
                "Value": 23.7,
                "Unit": "C",
                "UnitType": 17
            },
            "Imperial": {
                "Value": 75.0,
                "Unit": "F",
                "UnitType": 18
            }
        },
        "MobileLink": "http://m.accuweather.com/en/il/tel-aviv/215854/current-weather/215854?lang=en-us",
        "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/current-weather/215854?lang=en-us"
    }
]



//<img src="/developers/Media/Default/WeatherIcons/02-s.png">


class Home extends Component {
    constructor(props){
        super(props)
        this.state = {
        }
     }

     getCityWeatherByLocationKey = (cityLocationKey = "215854") => {
            const url = decodeURI(`/currentconditions/v1/${cityLocationKey}?apikey=${tempApiKey}&language=he-IL`);
            Axios.get(url) // Call the fetch function passing the url of the API as a parameter
            .then((res) => {
                debugger
            })
            .catch((err)=> {
                debugger
            });
      }

      getLocationKeyByCityName = (cityName) => {
        const params = {
            apikey: tempApiKey,
            q: cityName,
            language: 'en-us'
        };
        const url = "/locations/v1/cities/autocomplete";
        Axios.get(url, { params }) // Call the fetch function passing the url of the API as a parameter
        .then((res) => {
            debugger
        })
        .catch((err)=> {
            debugger
        });

      }

      componentWillMount(){
           // this.getLocationKeyByCityName('Tel Aviv')
           //this.getCityWeather();
      }
      
    




      //tel-aviv location key: 215854

    render() {
      return (
        <div className={"home"}>
        <Search/>
        <TodayView data={resExample}/>
        <OneDayView/>
        <OneDayView/>
        <OneDayView/>
        <OneDayView/>
        <OneDayView/>
        </div>
      );
    }
  }
  
  export default Home;