import React from 'react';
import ReactDOM from 'react-dom';
import ImageUploadForm from './ImageUploadForm.jsx';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';

const Challenge = ({ match }) => (
  <div>
    <h1> {match.params.id.slice(1)} component </h1>
  </div>
);

export default Challenge;