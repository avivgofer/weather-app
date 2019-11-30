import React, { Component } from 'react';
import Search from './Search'
import TodayView from './TodayView'
import OneDayView from './OneDayView'
import Axios from 'axios'
import { message } from 'antd'
import { toStatement, throwStatement } from '@babel/types';



const tempApiKey11 = "GqyBoSIAIF3DOeqGW6w1wJcT9SZJ6fAF"
const tempApiKeyddd = "FT1laPtWRKZwbyHHKbBQ7VIjpVIL0ytm"
const tempApiKey = "IAauRqa8Bxf9yBAxchkGcvLr0aj6BDos"
const myRealApiKey = "%09SJI87zSnduKJGlRMjnocFnsWtJwEJ3DR"


// const resExample = 
//     {
//         "LocalObservationDateTime": "2019-11-29T12:35:00+02:00",
//         "EpochTime": 1575023700,
//         "WeatherText": "Cloudy",
//         "WeatherIcon": 7,
//         "HasPrecipitation": false,
//         "PrecipitationType": null,
//         "IsDayTime": true,
//         "Temperature": {
//             "Metric": {
//                 "Value": 23.7,
//                 "Unit": "C",
//                 "UnitType": 17
//             },
//             "Imperial": {
//                 "Value": 75.0,
//                 "Unit": "F",
//                 "UnitType": 18
//             }
//         },
//         "MobileLink": "http://m.accuweather.com/en/il/tel-aviv/215854/current-weather/215854?lang=en-us",
//         "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/current-weather/215854?lang=en-us"
//     }




//<img src="/developers/Media/Default/WeatherIcons/02-s.png">


class Home extends Component {
    constructor(props){
        super(props)
        this.state = {
            todayData: '',
            locationKey: 215854,
            forecasts:[],
            city: 'Tel Aviv'
        }
        this.setTodayCityWeatherByLocationKey = this.setTodayCityWeatherByLocationKey.bind(this);
     }

     setTodayCityWeatherByLocationKey = (cityLocationKey = "215854",city = 'Tel Aviv') => {
            const url = decodeURI(`/currentconditions/v1/${cityLocationKey}?apikey=${tempApiKey}&language=he-IL`);
            Axios.get(url) // Call the fetch function passing the url of the API as a parameter
            .then((res) => {
               const favoriteAllready = Object.keys(localStorage).some((x) => x == city)
               this.setState({
                   todayData: res.data[0],
                   locationKey: cityLocationKey,
                   city: (city) ? city : 'Tel Aviv',
                   favoriteAllready: favoriteAllready
               },this.set5Daysforecasts)
            })
            .catch((err)=> {
                message.error(err.toString());
            });
          
      }

      set5Daysforecasts = () => {
       
        const url = `/forecasts/v1/daily/5day/${this.state.locationKey}`;
        const params = {apikey: tempApiKey, language: 'he-IL'};
            Axios.get(url, {params}) // Call the fetch function passing the url of the API as a parameter
            .then((res) => {
               this.setState({
                   forecasts: res.data.DailyForecasts
               })
               
            })
            .catch((err)=> {
                message.error(err.toString());
            });
      }

      componentWillMount() {
          this.setTodayCityWeatherByLocationKey();
          //this.set5Daysforecasts();
      }

      //tel-aviv location key: 215854

    render() {
        const forecasts = this.state.forecasts;
        const city = this.state.city;
        const favoriteAllready = this.state.favoriteAllready
      return (
        <div className={"home"}>
            <Search setTodayCityWeatherByLocationKey={this.setTodayCityWeatherByLocationKey}/>
            {
                (this.state.todayData)
                 ?
                <TodayView data={this.state.todayData} forecasts={forecasts} city={city} favoriteAllready={favoriteAllready}/>
                :
                ''
            }
        </div>
      );
    }
  }
  
  export default Home;