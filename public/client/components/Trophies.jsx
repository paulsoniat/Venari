import React from 'react';
import axios from 'axios';
import { AutoRotatingCarousel, Slide } from 'material-auto-rotating-carousel';
import { green400, green600, blue400, blue600, red400, red600 } from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Navbar from './Navbar.jsx';
import Scene from './trophy.jsx'

// const getTrophy = require('./trophy.js').getTrophy;

export default class Trophies extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trophies: [{ id: 0, challenge: 'abc', image: '../client/css/download.png' }, { id: 0, challenge: 'abc', image: '../client/css/venariLogo.png' }, { id: 0, challenge: 'abc', image: '../client/css/venariLogo.png' }, { id: 0, challenge: 'abc', image: '../client/css/venariLogo.png' }, { id: 0, challenge: 'abc', image: '../client/css/venariLogo.png' }, { id: 0, challenge: 'abc', image: '../client/css/venariLogo.png' }],

    }
  }
  render() {
    return (
      <MuiThemeProvider>
        <div >
        <Navbar />
          <div style={{ display: 'flex', flexFlow: 'row wrap'}}>
        {
          this.state.trophies.map(trophy =>
            (<Scene image={trophy.image} />
            ))
        }
        </div>
      </div>
        </MuiThemeProvider>
    );
  }
}
