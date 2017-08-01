require('materialize-css/dist/css/materialize.min.css');
require('materialize-css/dist/js/materialize.min.js');

import React from 'react';
import ReactDOM from 'react-dom';
import Main from "./components/main.jsx";

import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'

$(document).ready(function () {
    ReactDOM.render(
        <Main />
        , document.getElementById("root"));
});