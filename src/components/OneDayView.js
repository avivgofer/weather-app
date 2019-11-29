import React, { Component } from 'react';

class OneDayView extends Component {
    constructor(props){
        super(props)
        this.state = {}
     }

    render() {
      return (
        <div className={"oneDayView"}>
            <h1>One day view {this.props.data.Date}</h1>
        </div>
      );
    }
  }
  
  export default OneDayView;