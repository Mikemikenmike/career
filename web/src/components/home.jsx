import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'


export default class Home extends React.Component {
    constructor(props) {
        super(props);
        console.log("Home Constructor");
    }

    render() {
        return (
            <div id={this.props.id} className="row">
                HOME :D
                <Link to="/enroute">Hi</Link>
            </div>
        );
    }
}