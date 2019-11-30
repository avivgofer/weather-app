import React, { Component } from 'react';
import { AutoComplete, Icon, message } from 'antd';
import '../style/Search.css'
import Axios from 'axios'
var debounce = require('debounce');
const tempApiKey = "IAauRqa8Bxf9yBAxchkGcvLr0aj6BDos"
const d = "GqyBoSIAIF3DOeqGW6w1wJcT9SZJ6fAF"

class Search extends Component {
    constructor(props){
        super(props)
        this.state = {
            dataSource:[],
            citiesName:[]
        }
        this.handleSearch = this.handleSearch.bind(this);
        this.getLocationKeyByCityName = this.getLocationKeyByCityName.bind(this);
        this.handelSelect = this.handelSelect.bind(this);
     }

     //tel-aviv location key: 215854

     handelSelect = (selectedCity) => {

        const city = Object.values(this.state.dataSource)
          .filter(city => city.locationName == selectedCity)[0];


       // const locationKey = this.state.dataSource.filter((city) => city.citiesName === selectedCity )
      

        
        this.props.setTodayCityWeatherByLocationKey(city.locationKey,city.locationName);
     }

    handleSearch = debounce(city => {
        this.getLocationKeyByCityName(city)
    }, 1000)

    getLocationKeyByCityName = (cityName) => {
        const params = {
            apikey: tempApiKey,
            q: cityName,
            language: 'en-us'
        };
        const url = "/locations/v1/cities/autocomplete";
        Axios.get(url, { params }) // Call the fetch function passing the url of the API as a parameter
        .then((res) => {
            const citiesName = [];
            const dataSource = []
            Object.values(res.data).forEach((location,idx)=> {
                dataSource.push({
                    locationName:location.LocalizedName, locationKey:location.Key
                })
                citiesName.push(location.LocalizedName)
            })
   
            this.setState({
                dataSource: dataSource,
                citiesName: citiesName
            })
        })
        .catch((err)=> {
            message.error(err.toString());
        });

      }
    

    render() {
        const { citiesName } = this.state;
      return (
        <div className={"search"}>
            <AutoComplete
            dataSource={citiesName}
            placeholder="Enter your city"
            prefix={<Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }}/>}
            onChange={this.handleSearch}
            onSelect={this.handelSelect}
            />
        </div>
      );
    }
  }
  
  export default Search;