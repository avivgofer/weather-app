import React, { Component } from 'react';
import '../style/CityView.css'
class CityView extends Component {
    constructor(props){
        super(props)
        this.state = {}
     }
     componentWillMount(){
         const cityData = localStorage.getItem(this.props.city)
         this.setState({
            cityData: JSON.parse(cityData)
         })
     }

     to2Digits = (number) =>  number < 10 ? ("0" + number) : number

     

    render() {
      const data = this.state.cityData;
      let iconNumber = '';
      if(data){
        iconNumber = data.WeatherIcon;
      }
      const iconUrl = `https://developer.accuweather.com/sites/default/files/${this.to2Digits(iconNumber)}-s.png`
      
      return (
        <div className={"cityView"}>
            <div className={"cityNameArea"}>
             {this.props.city}
            </div>
            <div className={"cityContentArea"}>
              <div className={"cityWeatherContent"}>
                {data.WeatherText}
              </div>
              <div className={"cityIconArea"}>
                 <img src={iconUrl}/>
              </div>
            </div>
        </div>
      );
    }
  }
  
  export default CityView;