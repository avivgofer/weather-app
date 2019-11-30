import React, { Component } from 'react';
import '../style/OneDayView.css'
class OneDayView extends Component {
    constructor(props){
        super(props)
        this.state = {}
     }

     to2Digits = (number) =>  number < 10 ? ("0" + number) : number

     formatDate(date) {
      var d = new Date(date),
          month = '' + (d.getMonth() + 1),
          day = '' + d.getDate(),
          year = d.getFullYear();

      if (month.length < 2) 
          month = '0' + month;

      if (day.length < 2) 
          day = '0' + day;

      return [day, month].join('/');
    }

    render() {
      const forecast = this.props.data;
      let iconNumber = '';
      let date = '';
      if(forecast){
        iconNumber = forecast.Day.Icon;
        date = this.formatDate(forecast.Date);
      }
      const iconUrl = `https://developer.accuweather.com/sites/default/files/${this.to2Digits(iconNumber)}-s.png`
      
      return (
        <div className={"oneDayView"}>
            {/* One day view {this.props.data.Date} */}
            <div className={"iconArea"}>
             <img src={iconUrl}/>
            </div>
            <div className={"contentArea"}>
              <div className={"weatherContent"}>
              {forecast.Temperature.Maximum.Value}
              {forecast.Temperature.Maximum.Unit}
              /
              {forecast.Temperature.Minimum.Value}
              {forecast.Temperature.Minimum.Unit}
              </div>
              <div className={"date"}>
               {date}
              </div>
            </div>
        </div>
      );
    }
  }
  
  export default OneDayView;