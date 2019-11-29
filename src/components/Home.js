import React, { Component } from 'react';
import Search from './Search'
import TodayView from './TodayView'
import OneDayView from './OneDayView'
import Axios from 'axios'


class Home extends Component {
    constructor(props){
        super(props)
        this.state = {
        }
     }

     getCityWeather = (cityLocationKey = 215854) => {
            const url = decodeURI('/v1/215854?apikey=%09SJI87zSnduKJGlRMjnocFnsWtJwEJ3DR');
            fetch(url) // Call the fetch function passing the url of the API as a parameter
            .then((res) => {
                debugger
            })
            .catch((err)=> {
                debugger
            });
      }

      componentWillMount(){
        //   this.getCityWeather();
      }




      //tel-aviv location key: 215854

    render() {
      return (
        <div className={"home"}>
        <Search/>
        <TodayView cityLocationKey={this.state.cityLocationKey}/>
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