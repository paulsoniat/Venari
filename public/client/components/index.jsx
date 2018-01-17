import React from 'react';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';
import ReactDOM from 'react-dom';
import ImageUploadForm from './ImageUploadForm.jsx';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Style from '../css/index.styl';
import RaisedButton from 'material-ui/RaisedButton';
import Main from './Main.jsx';
import Challenge from './Challenge.jsx';
import MovingLogo from './MovingLogo.jsx';

const Login = () => (
  <MuiThemeProvider>
    <MovingLogo />
  </MuiThemeProvider>
  
);

const AppRouter = () => (
  <Router>
    <div>
      <h1><Link to="/main">Check out the Challenges!</Link></h1>
      <Route exact path="/" component={Login} />
      <Route path="/challenge/:id" component={Challenge} />
      <Route path="/main" component={Main} />
    </div>
  </Router>
);

ReactDOM.render(
  <AppRouter />,
  document.getElementById('appRouter'),
);
