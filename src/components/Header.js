import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import '../style/Header.css'

class Header extends Component {
    constructor(props){
        super(props)
        this.state = {}
     }

    render() {
      return (
        <div className={"home"}>
            <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
                <Menu.Item key="home">
                <Icon type="home" />
                 Home
                </Menu.Item>
                <Menu.Item key="favorites" >
                <Icon type="heart" />
                Favorites
                </Menu.Item>
            </Menu>
        </div>
      );
    }
  }
  
  export default Header;