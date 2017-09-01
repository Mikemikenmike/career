import React from "react";
import Clearance from "./modules/clearance.jsx";

import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';

export default class Enroute extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modules: {},
            user_modules: {}
        };
    }


    componentDidMount = () => {

    };

    render() {
        return (
            <div id={this.props.id}>
                <section className="hero is-primary" style={{marginBottom: 24}}>
                    <div className="hero-body">
                        <div className="container">
                            <h1 className="title">
                                Enroute
                            </h1>
                        </div>
                    </div>
                </section>

                <Clearance />
            </div>

        );
    }
}