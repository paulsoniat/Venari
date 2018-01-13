import React from 'react';
import ReactDOM from 'react-dom';

const Hello = name => <div>Hello, {name}</div>;
const view = Hello('Abby');

const element = document.getElementById('root');
ReactDOM.render(view, element);