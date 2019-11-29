import React, { Component } from 'react';
import { AutoComplete, Icon } from 'antd';
import '../style/Search.css'
import Axios from 'axios'
var debounce = require('debounce');
const tempApiKey = "GqyBoSIAIF3DOeqGW6w1wJcT9SZJ6fAF"

class Search extends Component {
    constructor(props){
        super(props)
        this.state = {
            dataSource:[]
        }
        this.handleSearch = this.handleSearch.bind(this);
        this.getLocationKeyByCityName = this.getLocationKeyByCityName.bind(this);
     }

     //tel-aviv location key: 215854

    handleSearch = debounce(city => {
        debugger
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
            let dataSource = [];
            Object.values(res.data).forEach((city)=> {
                dataSource.push(city.LocalizedName)
            })
            this.setState({
                dataSource: dataSource
            })
        })
        .catch((err)=> {
        });

      }
    

    render() {
        const { dataSource } = this.state;
      return (
        <div className={"search"}>
            <AutoComplete
            dataSource={dataSource}
            placeholder="Enter your city"
            prefix={<Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }}
                     />}
            onChange={this.handleSearch}
            />
        </div>
      );
    }
  }
  
  export default Search;