import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import { blue } from 'material-ui/styles/colors';

//separate logo and login


const MovingLogo = () => (
  <div id="logo">
    <h1>
      <img src="./client/css/venariLogo.png" alt="Venari...Let the Hunt Begin" className="responsive"/>
    </h1>
    <h2>
      <RaisedButton
        align="center"
        className="signin-button"
        label="Login/Signup With Facebook"
        href="/login/facebook"
        primary
        labelColor="blue"
      />
    </h2>
  </div>
);

export default MovingLogo;
