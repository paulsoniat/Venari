import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom';
import ReactDOM from 'react-dom';
import ImageUploadForm from './ImageUploadForm.jsx';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import Main from './Main.jsx';
import Challenge from './Challenge.jsx';

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
      {/* <h1><Link to="/main">Main</Link></h1> */}
      <Route exact path="/" component={Login} />
      <Route path="/challenge" component={Challenge} />
      <Route path="/main" component={Main} />
    </div>
  </Router>
);

ReactDOM.render(
  <AppRouter />,
  document.getElementById('login'),
);
