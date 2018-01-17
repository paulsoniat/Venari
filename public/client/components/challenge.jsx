import React from 'react';
import ReactDOM from 'react-dom';
import ImageUploadForm from './ImageUploadForm.jsx';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';

const Challenge = () => (
  <MuiThemeProvider>
    <h1>challenge component </h1>
  </MuiThemeProvider>
);

// ReactDOM.render(
//   <Challenge />,
//   document.getElementById('challenge'),
// );

export default Challenge;