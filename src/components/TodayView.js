
import React, { Component } from 'react';


class TodayView extends Component {
    constructor(props){
        super(props)
        this.state = {}
     }

     componentDidMount(){
         this.setState({
             iconUrl:`https://developer.accuweather.com/sites/default/files/0${this.props.data.WeatherIcon}-s.png`
         })
     }


    render() {
        const data = this.props.data;
      return (
        <div className={"todayView"}>
            <div className="title">
                     <img src={this.state.iconUrl}/>
                     <span>
                         {data.Temperature.Metric.Value}
                         {data.Temperature.Metric.Unit}
                     </span>
                <span>
                    Tel-Aviv
                    
                </span>
            </div>
            <div className={"WeatherText"}>
                {this.props.data.WeatherText}
            </div>
        </div>
      );
    }
  }
  
  export default TodayView;