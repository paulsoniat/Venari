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
            <ul style={{ marginLeft: -30 }}>
              <li style={{ marginBottom: 8 }}>Choose a challenge</li>
              <li style={{ marginBottom: 8 }}>If it's a geo-challenge, go to the challenge location</li>
              <li style={{ marginBottom: 8 }}>Take a picture of the items for that challenge</li>
              <li style={{ marginBottom: 8 }}>Complete the challenge by taking a photo of all items</li>
            </ul>
          </Dialog>
        </h2>
      </div>
    );
  }
}
