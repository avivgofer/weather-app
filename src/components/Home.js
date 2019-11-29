import React, { Component } from 'react';
import Search from './Search'
import TodayView from './TodayView'
import OneDayView from './OneDayView'
import Axios from 'axios'









const tempApiKey = "GqyBoSIAIF3DOeqGW6w1wJcT9SZJ6fAF"
const myRealApiKey = "%09SJI87zSnduKJGlRMjnocFnsWtJwEJ3DR"

const resExample = 
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




//<img src="/developers/Media/Default/WeatherIcons/02-s.png">


class Home extends Component {
    constructor(props){
        super(props)
        this.state = {
            todayData: resExample,
            locationKey: 215854,
            forecasts:[]
        }
        this.setTodayCityWeatherByLocationKey = this.setTodayCityWeatherByLocationKey.bind(this);
        this.click = this.click.bind(this);
     }

     click() {
         debugger
     }

     setTodayCityWeatherByLocationKey = (cityLocationKey = "215854") => {
            const url = decodeURI(`/currentconditions/v1/${cityLocationKey}?apikey=${tempApiKey}&language=he-IL`);
            Axios.get(url) // Call the fetch function passing the url of the API as a parameter
            .then((res) => {
               this.setState({
                   todayData: res.data[0],
                   locationKey: cityLocationKey
               })
            })
            .catch((err)=> {
                debugger
            });
      }

      set5DaysForecast = () => {
       
        const url = `/forecasts/v1/daily/5day/${this.state.locationKey}`;
        const params = {apikey: tempApiKey};
            Axios.get(url, {params}) // Call the fetch function passing the url of the API as a parameter
            .then((res) => {
               this.setState({
                   forecasts: res.data.DailyForecasts
               })
               
            })
            .catch((err)=> {
                debugger
            });
      }

      componentDidMount() {
          this.set5DaysForecast();
      }

      //tel-aviv location key: 215854

    render() {
        const forecasts = this.state.forecasts;
      return (
        <div className={"home"}>
        <Search setTodayCityWeatherByLocationKey={this.setTodayCityWeatherByLocationKey}/>
        <TodayView data={this.state.todayData} />
        
       
        <button onClick={this.click}>click me</button>
        {
            Object.values(forecasts).map((forecast) =>
                <OneDayView data={forecast} />
            )
        }
        </div>
      );
    }
  }
  
  export default Home;