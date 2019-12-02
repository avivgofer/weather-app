import React, { Component } from "react";
import "./App.css";
import "antd/dist/antd.css";
import Home from "./components/Home";
import Favorites from "./components/Favorites";
import { Provider } from "react-redux";
import configureStore from "./config/configureStore";
import { BrowserRouter, Route, Switch } from "react-router-dom";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Provider store={configureStore()}>
              <Route path="/" component={Home} exact />
              <Route path="/favorites" component={Favorites} exact />
            </Provider>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
