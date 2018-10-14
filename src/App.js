import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


class App extends Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-6"><p>Hi hi hi</p></div>
          <div className="col-6" style={{"width": "50%", "height": "100px", "background": "green"}}></div>
        </div>
        <div className="row">
          <div className="col-lg-6 col-sm-12" style={{"width": "50%", "height": "100px", "background": "blue"}}></div>
          <div className="col-lg-6 col-sm-12" style={{"width": "50%", "height": "100px", "background": "red"}}></div>
        </div>

      </div>
    );
  }
}

export default App;
