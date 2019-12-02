import React, { Component } from "react";
import { Menu, Icon } from "antd";
import "../style/Header.css";
import { NavLink } from "react-router-dom";
import "../style/Reset.css";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favStyle: "",
      homeStyle: "ant-menu-item-active"
    };
  }

  handleClick = btn => {
    if (btn.key === "home") {
      this.setState({
        favStyle: "",
        homeStyle: "ant-menu-item-active"
      });
    } else {
      this.setState({
        favStyle: "ant-menu-item-active",
        homeStyle: ""
      });
    }
  };

  render() {
    return (
      <div className="home">
        <Menu
          selectedKeys={[this.state.current]}
          mode="horizontal"
          onClick={this.handleClick}
        >
          <Menu.Item key="home">
            <Icon type="home" />
            <NavLink className="resetCss" to="/">
              Home
            </NavLink>
          </Menu.Item>
          <Menu.Item key="favorites">
            <Icon type="heart" />
            <NavLink className="resetCss" to="/favorites">
              Favorites
            </NavLink>
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}

export default Header;
