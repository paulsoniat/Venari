import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import RotatingCarousel from './RotatingCarousel.jsx';
import Leaderboard from './Leaderboard.jsx';

const Main = () => (
  <MuiThemeProvider>
    <RotatingCarousel />
  </MuiThemeProvider>
);

ReactDOM.render(
  <Main />,
  document.getElementById('main'),
);
