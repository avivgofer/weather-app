import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import '../style/Header.css'

class Header extends Component {
    constructor(props){
        super(props)
        this.state = {
          favStyle: '',
          homeStyle: 'ant-menu-item-active'
        }
        this.handleClick = this.handleClick.bind(this);
     }

     handleClick (btn) {
      if(btn.key == 'home'){
        this.setState({
          favStyle: '',
          homeStyle: 'ant-menu-item-active'
        },this.props.pageChange)
      }else { 
        this.setState({
          favStyle: 'ant-menu-item-active',
          homeStyle: ''
        },this.props.pageChange)
      }
     }

    render() {
      return (
        <div className={"home"}>
            <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
                <Menu.Item key="home" className={this.state.homeStyle}>
                <Icon type="home" />
                 Home
                </Menu.Item>
                <Menu.Item key="favorites" className={this.state.favStyle} >
                <Icon type="heart" />
                Favorites
                </Menu.Item>
            </Menu>
        </div>
      );
    }
  }
  
  export default Header;