import React from 'react';
import ReactDOM from 'react-dom';
/** Fix Babel 7 error: https://stackoverflow.com/questions/53558916/babel-7-referenceerror-regeneratorruntime-is-not-defined */
import "core-js/stable";
import "regenerator-runtime/runtime";
import App from './components/App';

import "./styles/index.scss";

window.addEventListener('DOMContentLoaded', () => {
    const appContainer = document.createElement('DIV');
    appContainer.id = 'custom-checkout-app';
    document.body.appendChild(appContainer);
    ReactDOM.render(<App />, document.getElementById('custom-checkout-app'));
});