import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';

const MovingLogo = () => (
  <div>
    <h1>
      <embed src="https://vectr.com/ncreshon/avKl9L66R.svg?width=640&height=640&select=avKl9L66Rpage0" align="center" />
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
