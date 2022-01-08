import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

import "./styles/index.scss";

window.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(<App />, document.getElementById('app'));
});