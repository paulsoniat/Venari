import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import RotatingCarousel from './RotatingCarousel.jsx';
import Leaderboard from './Leaderboard.jsx';
import NavBar from './Navbar.jsx'
import ChallengeItems from './challenge.jsx'
import Gallery from './Gallery.jsx'
import GeoChallengeCarousel from './GeoChallengeCarousel.jsx'

const GeoChallenges = ({ history }) => (
    <MuiThemeProvider>
        <GeoChallengeCarousel history={history} />
    </MuiThemeProvider>
);

export default GeoChallenges;
