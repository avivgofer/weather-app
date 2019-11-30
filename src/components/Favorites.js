import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import CityView from './CityView'
import '../style/Favorites.css'

class Favorites extends Component {
    constructor(props){
        super(props)
        this.state = {
        }
     }

    render() {
      return (
          <div className={"favoritesContainer"}>
            <h1>Favorites</h1>
            <div className={"favorites"}>
                {
                    Object.keys(localStorage).map((city,idx) => (
                        <CityView city={city} idx={idx}/>
                    ))
                }
            </div>
        </div>
      );
    }
  }
  
  export default Favorites;