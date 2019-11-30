import React, { Component } from 'react';
import './App.css';
import 'antd/dist/antd.css';
import Home from './components/Home';
import Header from './components/Header';
import Favorites from './components/Favorites'


class App extends Component {
  constructor(props){
      super(props)
      this.state = {
        atHome: true
      }
      this.pageChange = this.pageChange.bind(this);
   }

   pageChange() {
      this.setState({
        atHome: !this.state.atHome
      })
   }

  render() {
  return (
    <div className="App">
      <Header pageChange={this.pageChange}/>
      {
        (this.state.atHome) 
        ?
        <Home/> 
        :
        <Favorites/>
      }
      
    </div>
  );
}
}

export default App;
