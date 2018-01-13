import React from 'react';
import ReactDOM from 'react-dom';
import ImageUploadForm from './components/ImageUploadForm.jsx';

const Hello = name => (
  <div>
    Hello, {name}
    <ImageUploadForm challenge="Cute Animals Challenge" username="Jeff Bezos" item="cat" />
  </div>
);
const view = Hello('Abby');

const element = document.getElementById('root');
ReactDOM.render(view, element);
