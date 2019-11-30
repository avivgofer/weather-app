import React, { Component } from "react";
import "./App.css";
import "antd/dist/antd.css";
import Home from "./components/Home";
import Header from "./components/Header";
import Favorites from "./components/Favorites";
import { Provider } from "react-redux";
import configureStore from "./config/configureStore";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      atHome: true
    };
    this.pageChange = this.pageChange.bind(this);
  }

  pageChange() {
    this.setState({
      atHome: !this.state.atHome
    });
  }

  render() {
    return (
      <Provider store={configureStore()}>
        <div className="App">
          <Header pageChange={this.pageChange} />
          {this.state.atHome ? <Home /> : <Favorites />}
        </div>
      </Provider>
    );
  }
}

export default App;
