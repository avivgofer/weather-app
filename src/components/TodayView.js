
import React, { Component } from 'react';
import OneDayView from './OneDayView'
import '../style/TodayView.css'


class TodayView extends Component {
    constructor(props){
        super(props)
        this.state = {}
     }

     to2Digits = (number) =>  number < 10 ? ("0" + number) : number
     

     componentDidMount(){
         this.setState({
             iconUrl:`https://developer.accuweather.com/sites/default/files/${this.to2Digits(this.props.data.WeatherIcon)}-s.png`
         })
     }


    render() {
        const data = this.props.data;
      return (
        <div className={"todayView"}>
            <div className="title">
            <div className={"city"}>
                    Tel-Aviv
                    
            </div>
            <img src={this.state.iconUrl}/>
            <span className={"temp"}>
                {data.Temperature.Metric.Value}
                {data.Temperature.Metric.Unit}
            </span>
                
            </div>
            <div className={"WeatherText"}>
                {this.props.data.WeatherText}
            </div>
            <h1 className={"weekly"}>Weekly</h1>
            <div className={"weekForecast"}>
                {
                Object.values(this.props.forecasts).map((forecast,idx) =>
                    <OneDayView key={idx} data={forecast} />
                )
                }
            </div>
        </div>
      );
    }
  }
  
  export default TodayView;