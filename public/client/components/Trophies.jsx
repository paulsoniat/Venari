import React from 'react';
import axios from 'axios';
import { AutoRotatingCarousel, Slide } from 'material-auto-rotating-carousel';
import { green400, green600, blue400, blue600, red400, red600 } from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Navbar from './Navbar.jsx';
import Scene from './trophy.jsx';

// const getTrophy = require('./trophy.js').getTrophy;

export default class Trophies extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trophies: [{ id: 0, challenge: 'abc1', image: '../client/css/download.png' }, { id: 0, challenge: 'abc2', image: '../client/css/venariLogo.png' }],
      open: false,
    };
    this.showDetails = this.showDetails.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  showDetails() {
    this.setState({ open: true });
  }
  closeModal() {
    this.setState({
      open: false,
    });
  }
  render() {
    return (
      <MuiThemeProvider>
        <div >
          <Navbar />
          <div style={{ display: 'flex', flexFlow: 'row wrap' }}>
            {
          this.state.trophies.map(trophy =>
            (<div onClick={() => this.showDetails()}>
              <ChallengeModal
                message={trophy.challenge}
                open={this.state.open}
                close={this.closeModal}
              />
              <Scene image={trophy.image} />
                </div>
            ))
        }
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}


const ChallengeModal = ({ message, open, close }) => {
  const actions = [
    <FlatButton
      label="Close"
      primary
      keyboardFocused
      onClick={close}
    />,
  ];
  return (
    <Dialog
      // title={title}
      actions={actions}
      modal={false}
      open={open}
      onRequestClose={close}
    >
      <p>{message}</p>
    </Dialog>
  );
};
