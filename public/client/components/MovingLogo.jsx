import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { blue, indigo500 } from 'material-ui/styles/colors';

export default class MovingLogo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  handleOpen() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
  }
  render() {
    const actions = [
      <div align="center">
        <RaisedButton
          label="Close"
          labelColor="#ffffff"
          onClick={this.handleClose}
          backgroundColor="#3F51B5"
        />
      </div>,
    ];
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
            labelColor="#ffffff"
            icon={<img src="./client/css/facebook.png" alt="" />}
            backgroundColor="#3F51B5"
          />
          <p />
          <RaisedButton
            align="center"
            label="Rules of the Hunt"
            labelColor="#ffffff"
            onClick={() => {
              this.handleOpen();
            }}
            icon={<img src="./client/css/descriptionIcon.png" alt="" />}
            backgroundColor="#311B92"
          />
          <Dialog
            title="Rules of The Hunt"
            actions={actions}
            modal
            open={this.state.open}
          >
            <ul>
              <li>Choose a Challenge</li>
              <li>Take a picture of that items on the challenge list </li>
              <li>Pictures of geo-challenge items must be taken at that location</li>
              <li>Complete the challenge when all items are collected </li>
              <li>Earn badges for completed challenges </li>


            </ul>
          </Dialog>
        </h2>
      </div>
    );
  }
}
