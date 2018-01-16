import React from 'react';
import ReactDOM from 'react-dom';
import ImageUploadForm from './ImageUploadForm.jsx';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Style from '../css/index.styl';
import RaisedButton from 'material-ui/RaisedButton';

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

ReactDOM.render(
  <Login />,
  document.getElementById('login'),
);
