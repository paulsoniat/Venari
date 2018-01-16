import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Challenge from './challenge.jsx';
import Main from './main.jsx';


const Login = () => (
  <MuiThemeProvider>
    <RaisedButton
      className="signin-button"
      label="Login/Signup With Facebook"
      href="/login/facebook"
      primary
      labelColor="blue"
    />
  </MuiThemeProvider>
  
);

const AppRouter = () => (
    <Router>
      <div>
        <Route path="/challenge" component={Challenge} />
        <Route path="/main" component={Main} />
        <Route exact path="/" component={Login} />
      </div>
    </Router>
);

ReactDOM.render(
  <AppRouter />,
  document.getElementById('login'),
);
