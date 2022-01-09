import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

import "./styles/index.scss";

window.addEventListener('DOMContentLoaded', () => {
    const appContainer = document.createElement('DIV');
    appContainer.id = 'custom-checkout-app';
    document.body.appendChild(appContainer);
    ReactDOM.render(<App />, document.getElementById('custom-checkout-app'));
});