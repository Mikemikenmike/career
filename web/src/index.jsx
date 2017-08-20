// require('materialize-css/dist/css/materialize.min.css');
// require('materialize-css/dist/js/materialize.min.js');
//

import "bulma/css/bulma.css";
// import "bulma/css/bulma.css.map";

import React from 'react';
import ReactDOM from 'react-dom';
import Main from "./components/main.jsx";

import createHistory from 'history/createBrowserHistory'
const history = createHistory();
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';

$(document).ready(function () {
    $("body").addClass("light-fill");
    ReactDOM.render(
        // <Main />
        <Router history={history}>
            <Route component={Main} />
        </Router>
        , document.getElementById("root"));
});