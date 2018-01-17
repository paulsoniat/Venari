import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import RotatingCarousel from './RotatingCarousel.jsx';
import Leaderboard from './Leaderboard.jsx';
import NavBar from './Navbar.jsx'
import ChallengeItems from './Challenge.jsx'
import Gallery from './Gallery.jsx'

const Main = ({ history }) => (
  <MuiThemeProvider>
    <RotatingCarousel history={history} />
  </MuiThemeProvider>
);

export default Main;
