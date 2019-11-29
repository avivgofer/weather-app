import React, { Component } from 'react';
import { Input, Icon } from 'antd';
import '../style/Search.css'

class Search extends Component {
    constructor(props){
        super(props)
        this.state = {}
     }

     //tel-aviv location key: 215854

    render() {
      return (
        <div className={"search"}>
            <Input
            placeholder="Enter your city"
            prefix={<Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }} />}
            />
        </div>
      );
    }
  }
  
  export default Search;