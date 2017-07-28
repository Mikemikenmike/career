require('materialize-css/dist/css/materialize.min.css');
require('materialize-css/dist/js/materialize.min.js');

import React from 'react';
import ReactDOM from 'react-dom';
import Main from "./components/main.jsx";

$(document).ready(function() {
    ReactDOM.render(
        <Main />
    , document.getElementById("root"));
});