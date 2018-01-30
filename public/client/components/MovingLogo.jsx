import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import { blue, indigo500 } from 'material-ui/styles/colors';

export default class MovingLogo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <div id="logo">
        <h1>
          <img src="./client/css/venariLogo.png" alt="Venari...Let the Hunt Begin" className="responsive" />
        </h1>
        <h2>
          <RaisedButton

            align="center"
            className="signin-button"
            label="Login With Facebook"
            href="/login/facebook"
            labelColor="white"
            icon={<img src="./client/css/facebook.png" alt="" />}
            backgroundColor="#3F51B5"
          />
          <p />
          <RaisedButton
            align="center"
            label="Rules of the Hunt"
            labelColor="white"
            onClick={() => {
              console.log('hello from play');
            }}
            icon={<img src="./client/css/descriptionIcon.png" alt="" />}
            backgroundColor="#311B92"
          />
        </h2>
      </div>
    );
  }
}
